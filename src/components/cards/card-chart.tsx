'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterestByYear } from '@/services/getComposedInterest';
import { CompoundInterestConfig } from '@/validators/schema';
import { ChartOptions, LinearScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

Chart.register(LinearScale);

export function CardChart({
  interests,
  config,
  isMonthly,
}: {
  interests: InterestByYear[];
  config: CompoundInterestConfig;
  isMonthly?: boolean;
}) {
  const factor = isMonthly ? 12 : 1;
  const options: ChartOptions<'line'> = {
    aspectRatio: 1,
    maintainAspectRatio: true,
    responsive: true,
    elements: {
      point: {
        radius: 0,
        hitRadius: 5,
        hoverRadius: 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        type: 'logarithmic',
      },
    },
  };
  const extension = isMonthly ? ' mensuels' : ' annuels';
  return (
    <Tabs defaultValue='capital' className='gap-4 flex flex-col'>
      <TabsContent value='interest'>
        <Line
          data={{
            labels: interests.map((interest) => interest.year),
            datasets: [
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
                data: interests.map(
                  (interest) => config.compound * (isMonthly ? 1 : 12)
                ),
                tension: 0.1,
                fill: false,
              },
            ],
          }}
          options={options}
        />
      </TabsContent>
      <TabsContent value='capital'>
        <Line
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
                label: 'Capital total',
                data: interests.map((interest) => interest.principal),
                tension: 0.1,
                fill: true,
              },
            ],
          }}
          options={options}
        />
      </TabsContent>
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
