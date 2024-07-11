'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterestByYear } from '@/models/interest';
import { ChartOptions, LinearScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { StrategyModel } from '../../models/strategy';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useMemo, useState } from 'react';

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
  const factor = isMonthly ? 12 : 1;
  const options = useMemo<ChartOptions<'line'>>(
    () => ({
      maintainAspectRatio: false,
      responsive: true,
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

  const extension = isMonthly ? ' mensuels' : ' annuels';

  return (
    <Tabs defaultValue='capital' className='gap-4 flex flex-col'>
      <TabsContent value='interest'>
        <div className='relative aspect-[9/10]'>
          <Line
            options={options}
            data={{
              labels: interests.map((interest) => interest.year),
              datasets: [
                {
                  label: "Objectif d'intérets" + extension,
                  data: config.targetInterest
                    ? interests.map(
                        () =>
                          config.targetInterest &&
                          config.targetInterest / factor
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
                  data: interests.map(
                    () => config.compound * (isMonthly ? 1 : 12)
                  ),
                  tension: 0.1,
                  fill: false,
                },
              ],
            }}
          />
        </div>
      </TabsContent>
      <TabsContent value='capital'>
        <div className='relative aspect-[9/10]'>
          <Line
            options={options}
            data={{
              labels: interests.map((interest) => interest.year),
              datasets: [
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
              ],
            }}
          />
        </div>
      </TabsContent>
      <LabelSwitch
        label='Vue logarithmique'
        value={logarithmic}
        onClick={setLogarithmic}
      />
      <TabsList className='w-full'>
        <TabsTrigger className='w-full' value='interest'>
          Intérets
        </TabsTrigger>
        <TabsTrigger className='w-full' value='capital'>
          Capital
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function LabelSwitch({
  label,
  onClick,
  value,
}: {
  label?: string;
  onClick: (value: boolean) => void;
  value: boolean;
}) {
  return (
    <div className='flex gap-2 items-center'>
      <Label>{label}</Label>
      <Switch
        checked={value}
        onClick={() => {
          onClick(!value);
        }}
      />
    </div>
  );
}
