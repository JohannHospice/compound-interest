import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { getComposedInterest } from '../../services/getComposedInterest';
import { CompoundInterestConfig, schemaConfig } from '../../validators/schema';
import { ClipboardButton } from './components/ClipboardButton';
import { StrategyGrid } from './components/StrategyGrid';

export default function Strategy({
  searchParams,
}: {
  searchParams: CompoundInterestConfig;
}) {
  try {
    const config = schemaConfig.validateSync(searchParams);
    const interests = getComposedInterest(config);

    return (
      <Tabs defaultValue='monthly'>
        <div className='p-14 gap-4 flex flex-col '>
          <div className='flex gap-4 self-end'>
            <ClipboardButton />
            <TabsList>
              <TabsTrigger value='monthly'>Mensuel</TabsTrigger>
              <TabsTrigger value='yearly'>Annuel</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='monthly'>
            <StrategyGrid interests={interests} config={config} isMonthly />
          </TabsContent>
          <TabsContent value='yearly'>
            <StrategyGrid interests={interests} config={config} />
          </TabsContent>
        </div>
      </Tabs>
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
