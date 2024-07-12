'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterestByYear } from '@/models/interest';
import { ChartOptions, LinearScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { StrategyModel } from '@/models/strategy';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useMemo, useState } from 'react';
import { FormSwitch } from '../ui/form';

Chart.register(LinearScale);

export function CardChart({
  interests,
  config,
  isMonthly,
}: {
  interests: InterestByYear[];
  config: StrategyModel;
  isMonthly?: boolean;
}) {
  const [logarithmic, setLogarithmic] = useState(false);
  const options = useMemo<ChartOptions<'line'>>(
    () => ({
      maintainAspectRatio: false,
      resizeDelay: 200,
      elements: {
        point: {
          radius: 0,
          hitRadius: 5,
          hoverRadius: 5,
        },
      },
      plugins: {
        legend: {
          align: 'start',
        },
      },
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
          type: logarithmic ? 'logarithmic' : 'linear',
        },
      },
    }),
    [logarithmic]
  );

  const [tab, setTab] = useState('interest');

  const data = useMemo(() => {
    const factor = isMonthly ? 12 : 1;
    const extension = isMonthly ? ' mensuels' : ' annuels';
    const datasets =
      tab === 'interest'
        ? [
            {
              label: "Objectif d'intérets" + extension,
              data: config.targetInterest
                ? interests.map(
                    () =>
                      config.targetInterest && config.targetInterest / factor
                  )
                : [],
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Intérêts' + extension,
              data: interests.map((interest) => interest.interest / factor),
              tension: 0.1,
              fill: true,
            },
            {
              label: 'Apports' + extension,
              data: interests.map(() => config.compound * (isMonthly ? 1 : 12)),
              tension: 0.1,
              fill: false,
            },
          ]
        : [
            {
              label: 'Objectif de capital',
              data: config.targetPrincipal
                ? interests.map(
                    () => config.targetPrincipal && config.targetPrincipal
                  )
                : [],
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Apport total',
              data: interests.map((interest) => interest.compound),
              tension: 0.1,
              fill: true,
            },
            {
              label: 'Intérêts total',
              data: interests.map(
                (interest) => interest.principal - interest.compound
              ),
              tension: 0.1,
              fill: true,
            },
            {
              label: 'Capital total',
              data: interests.map((interest) => interest.principal),
              tension: 0.1,
              fill: true,
            },
          ];

    return {
      labels: interests.map((interest) => interest.year),
      datasets,
    };
  }, [tab, interests, config, isMonthly]);

  return (
    <Tabs defaultValue={tab} className='gap-4 flex flex-col'>
      <TabsList className='w-full'>
        <TabsTrigger
          className='w-full'
          value='interest'
          onClick={() => setTab('interest')}
        >
          Intérets
        </TabsTrigger>
        <TabsTrigger
          className='w-full'
          value='capital'
          onClick={() => setTab('capital')}
        >
          Capital
        </TabsTrigger>
      </TabsList>
      <div className='relative aspect-[9/10]'>
        <Line
          options={options}
          data={data}
          width={'100%'}
          style={{
            position: 'absolute',
          }}
        />
      </div>
      <FormSwitch
        id='logarithmic'
        label='Vue logarithmique'
        checked={logarithmic}
        onClick={() => setLogarithmic(!logarithmic)}
      />
    </Tabs>
  );
}
