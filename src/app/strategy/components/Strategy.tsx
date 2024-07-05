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
import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { getComposedInterest } from '../../../services/getComposedInterest';
import {
  CompoundInterestConfig,
  schemaConfig,
} from '../../../validators/schema';
import { ClipboardButton } from './ClipboardButton';

export default function Strategy({
  searchParams,
}: {
  searchParams: CompoundInterestConfig;
}) {
  try {
    const config = schemaConfig.validateSync(searchParams);
    const interests = getComposedInterest(config);
    const lastYear = interests[interests.length - 1];

    return (
      <div className='p-14 gap-4 flex flex-col items-end'>
        <ClipboardButton />
        <Tabs defaultValue='account'>
          <TabsList>
            <TabsTrigger value='account'>Mensuel</TabsTrigger>
            <TabsTrigger value='password'>Annuel</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className='grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-7'>
              <div className='sm:col-span-3'>
                <ActionCard
                  title='Tes intérêts composés'
                  description="Découvrez notre puissante stratégie d'intérêts composés pour maximiser vos investissements."
                  button={{
                    title: 'Créer un nouveau calcul',
                    to: '/',
                  }}
                />
              </div>
              <div className='sm:col-span-2'>
                <ProgressCard
                  description='Le capital final'
                  value={lastYear.principal}
                  ratio={config.targetPrincipal}
                />
              </div>
              <div className='sm:col-span-2'>
                <ProgressCard
                  description='Les intérets annuels'
                  value={lastYear.interest}
                  ratio={config.targetInterest}
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
                <SnowballTable interestByYears={interests} />
              </CardContent>
            </Card>
          </div>
          <div className='flex flex-col gap-8'>
            <SummaryCard interests={interests} config={config} />
            <ChartInterests interests={interests} config={config} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <main className='flex min-h-screen flex-col p-24'>
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      </main>
    );
  }
}
