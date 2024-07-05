import { useMemo } from 'react';
import { ActionCard } from '../../../components/ActionCard';
import { ChartInterests } from '../../../components/ChartInterests';
import { ProgressCard } from '../../../components/ProgressCard';
import { SnowballTable } from '../../../components/SnowballTable';
import { SummaryCard } from '../../../components/SummaryCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { InterestByYear } from '../../../services/getComposedInterest';
import { CompoundInterestConfig } from '../../../validators/schema';

export function StrategyGrid({
  interests,
  config,
  isMonthly,
}: {
  interests: InterestByYear[];
  config: CompoundInterestConfig;
  isMonthly?: boolean;
}) {
  const lastYear = interests[interests.length - 1];
  const factor = isMonthly ? 12 : 1;
  return (
    <div className='grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-7'>
          <div className='lg:col-span-3 sm:col-span-3 col-span-7 md:col-span-4'>
            <ActionCard
              title='Tes intérêts composés'
              description="Découvrez notre puissante stratégie d'intérêts composés pour maximiser vos investissements."
              button={{
                title: 'Créer un nouveau calcul',
                to: '/',
              }}
            />
          </div>
          <div className='lg:col-span-2 sm:col-span-3 md:col-span-2 col-span-7'>
            <ProgressCard
              description='Le capital'
              value={lastYear.principal}
              ratio={config.targetPrincipal}
            />
          </div>
          <div className='lg:col-span-2 sm:col-span-3 md:col-span-2 col-span-7'>
            <ProgressCard
              description={
                isMonthly ? 'Les intérets mensuels' : 'Les intérets annuels'
              }
              value={lastYear.interest / factor}
              ratio={config.targetInterest && config.targetInterest / factor}
            />
          </div>
        </div>
        <Card>
          <CardHeader className='px-7'>
            <CardTitle>Intérets</CardTitle>
            <CardDescription>
              L&apos;évolution de votre capital pour chaque année.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SnowballTable interestByYears={interests} isMonthly={isMonthly} />
          </CardContent>
        </Card>
      </div>
      <div className='grid items-start h-full'>
        <div className='sticky bottom-8 self-end'>
          <div className='flex flex-col gap-8'>
            <SummaryCard
              interests={interests}
              config={config}
              isMonthly={isMonthly}
            />
            <EmphasisResultCard interests={interests} config={config} />
            <Card>
              <CardContent className='pt-6'>
                <ChartInterests
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
  config: CompoundInterestConfig;
}) {
  const notifications = useMemo(() => {
    const array: {
      title: string;
      description: string;
      color: string;
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
        color: 'sky',
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
                className={`flex h-2 w-2 translate-y-1 rounded-full bg-${notification.color}-500`}
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
