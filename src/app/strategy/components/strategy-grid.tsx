'use client';
import { CardAction } from '@/components/cards/card-action';
import { CardChart } from '@/components/cards/card-chart';
import { CardProgress } from '@/components/cards/card-progress';
import { CardSummary } from '@/components/cards/card-summary';
import { SnowballTable } from '@/components/snowball-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDevice } from '@/lib/utils';
import { StrategyModel } from '@/models/strategy';
import { InterestByYear } from '@/services/getComposedInterest';
import { useMemo } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/ui/collapsible';
import { Button } from '../../../components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

export function StrategyGrid({
  interests,
  config,
  isMonthly,
}: {
  interests: InterestByYear[];
  config: StrategyModel;
  isMonthly?: boolean;
}) {
  const lastYear = interests[interests.length - 1];
  const factor = isMonthly ? 12 : 1;

  const isSmallDevice = !!window ? window.innerWidth < 1024 : false;
  return (
    <div className='grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-7'>
          <div className='lg:col-span-3 sm:col-span-3 col-span-7 md:col-span-4'>
            <CardAction
              title='Tes intérêts composés'
              description="Découvrez notre puissante stratégie d'intérêts composés pour maximiser vos investissements."
              button={{
                title: 'Créer un nouveau calcul',
                to: '/',
              }}
            />
          </div>
          <div className='lg:col-span-2 sm:col-span-3 md:col-span-2 col-span-7'>
            <CardProgress
              description='Le capital'
              value={lastYear.principal}
              ratio={config.targetPrincipal}
            />
          </div>
          <div className='lg:col-span-2 sm:col-span-3 md:col-span-2 col-span-7'>
            <CardProgress
              description={
                isMonthly ? 'Les intérets mensuels' : 'Les intérets annuels'
              }
              value={lastYear.interest / factor}
              ratio={config.targetInterest && config.targetInterest / factor}
            />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Intérets</CardTitle>
            <CardDescription>
              L&apos;évolution de votre capital pour chaque année.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible
              defaultOpen={!isSmallDevice}
              open={!isSmallDevice ? true : undefined}
            >
              <p className='text-sm text-muted-foreground flex justify-between items-center sm:hidden'>
                {interests.length} années d&apos;investissement.
                <CollapsibleTrigger asChild>
                  <Button variant='ghost' size='sm' className='w-9 p-0'>
                    <ChevronsUpDown className='h-4 w-4' />
                    <span className='sr-only'>Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </p>
              <CollapsibleContent>
                <SnowballTable
                  interestByYears={interests}
                  isMonthly={isMonthly}
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
      <div className='grid items-start h-full'>
        <div className='sticky bottom-8 self-end'>
          <div className='flex flex-col gap-8'>
            <CardSummary
              interests={interests}
              config={config}
              isMonthly={isMonthly}
            />
            <EmphasisResultCard interests={interests} config={config} />
            <Card>
              <CardContent className='pt-6'>
                <CardChart
                  interests={interests}
                  config={config}
                  isMonthly={isMonthly}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmphasisResultCard({
  interests,
  config,
}: {
  interests: InterestByYear[];
  config: StrategyModel;
}) {
  const notifications = useMemo(() => {
    const array: {
      title: string;
      description: string;
      theme: string;
    }[] = [];

    const whenInterestOverpassCompound = interests.findIndex(
      (interest) => interest.interest >= config.compound * 12
    );
    if (whenInterestOverpassCompound !== -1) {
      array.push({
        title: 'Intérêts dépassant les apports annuels',
        description: `Vos intérêts dépassent vos apports annuels en ${
          whenInterestOverpassCompound + 1
        } ans. Votre épargne fructifie d'elle-même!`,
        theme: 'info',
      });
    }
    const principX = interests.findIndex(
      (interest) =>
        config.targetPrincipal && config.targetPrincipal <= interest.principal
    );
    if (principX !== -1) {
      array.push({
        title: 'Capital cible atteint',
        description: `Vous avez atteint votre objectif de ${formatDevice(
          config.targetPrincipal || 0
        )} de capital en ${principX + 1} ans.`,
        theme: 'green',
      });
    }

    const interestX = interests.findIndex(
      (interest) =>
        config.targetInterest && config.targetInterest <= interest.interest
    );
    if (interestX !== -1) {
      array.push({
        title: 'Intérêts annuel cible atteint',
        description: `Vous avez atteint votre objectif de ${formatDevice(
          config.targetInterest || 0
        )} d'intérêts annuel en ${interestX + 1} ans.`,
        theme: 'green',
      });
    }

    return array;
  }, [interests, config]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Points clés</CardTitle>
        <CardDescription>
          Vous avez {notifications.length} points clés à prendre en compte.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
            >
              <span
                className={`flex h-2 w-2 translate-y-1 rounded-full 
                  ${
                    notification.theme === 'info'
                      ? 'bg-sky-500'
                      : 'bg-green-500'
                  }`}
              />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {notification.title}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
