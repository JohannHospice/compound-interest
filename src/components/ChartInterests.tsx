'use client';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { LinearScale } from 'chart.js';

import { InterestByYear } from '../services/getComposedInterest';
import { Card, CardContent } from './ui/card';
import { CompoundInterestConfig } from '../validators/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
Chart.register(LinearScale);

export function ChartInterests({
  interests,
  config,
}: {
  interests: InterestByYear[];
  config: CompoundInterestConfig;
}) {
  return (
    <Card>
      <CardContent className='pt-6'>
        <Tabs defaultValue='interest' className='gap-4 flex flex-col'>
          <TabsContent value='interest'>
            <Line
              data={{
                labels: interests.map((interest) => interest.year),
                datasets: [
                  {
                    label: "Objectif d'intérets",
                    data: interests.map(() => config.targetInterest),
                    fill: false,
                    tension: 0.1,
                  },
                  {
                    label: 'Intérêts',
                    data: interests.map((interest) => interest.interest),
                    tension: 0.1,
                    fill: true,
                  },
                ],
              }}
              options={{
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
              }}
            />
          </TabsContent>
          <TabsContent value='capital'>
            <Line
              data={{
                labels: interests.map((interest) => interest.year),
                datasets: [
                  {
                    label: "Objectif d'intérets",
                    data: interests.map(() => config.targetInterest),
                    fill: false,
                    tension: 0.1,
                  },
                  {
                    label: 'Intérêts',
                    data: interests.map((interest) => interest.interest),
                    tension: 0.1,
                    fill: true,
                  },
                ],
              }}
              options={{
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
              }}
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
      </CardContent>
    </Card>
  );
}
