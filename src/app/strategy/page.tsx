import Link from 'next/link';
import { Button } from '../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { getComposedInterest } from '../../services/getComposedInterest';
import { ClipboardButton } from './components/clipboard-button';
import { StrategyGrid } from './components/strategy-grid';
import { ArrowLeft } from 'lucide-react';
import { toQueryString } from '../../lib/utils';
import { strategySchema } from '../../components/forms/validators';
import { StrategyModel } from '../../models/strategy';

export default function Strategy({
  searchParams,
}: {
  searchParams: StrategyModel;
}) {
  try {
    const config = strategySchema.validateSync(searchParams);
    const interests = getComposedInterest(config);

    return (
      <Tabs defaultValue='yearly'>
        <div className='p-4 sm:p-10 lg:p-24 gap-4 flex flex-col '>
          <div className='flex justify-between gap-4 flex-wrap'>
            <Button variant='ghost' asChild className='gap-2'>
              <Link href={'/?' + toQueryString(searchParams)}>
                <ArrowLeft size={16} />
                Modifier
              </Link>
            </Button>
            <div className='flex gap-4 self-end flex-1 justify-end'>
              <ClipboardButton />
              <TabsList>
                <TabsTrigger value='monthly'>Mensuel</TabsTrigger>
                <TabsTrigger value='yearly'>Annuel</TabsTrigger>
              </TabsList>
            </div>
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
