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
