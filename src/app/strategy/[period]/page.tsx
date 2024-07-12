import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getComposedInterest } from '@/services/getComposedInterest';
import { ClipboardButton } from './components/clipboard-button';
import { StrategyGrid } from './components/strategy-grid';
import { ArrowLeft } from 'lucide-react';
import { toQueryString } from '@/lib/utils';
import { strategySchema } from '@/validators';
import { StrategyModel } from '@/models/strategy';
import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs';

export default function Strategy({
  searchParams,
  params: { period },
}: {
  searchParams: StrategyModel;
  params: {
    period: string;
  };
}) {
  try {
    const config = strategySchema.validateSync(searchParams);
    const interests = getComposedInterest(config);

    const configQuery = toQueryString(searchParams);

    return (
      <div className='p-4 sm:p-10 lg:p-24 gap-4 flex flex-col '>
        <div className='flex justify-between gap-4 flex-wrap'>
          <Button variant='ghost' asChild className='gap-2'>
            <Link href={'/?' + configQuery}>
              <ArrowLeft size={16} />
              Modifier
            </Link>
          </Button>
          <div className='flex gap-4 self-end flex-1 justify-end'>
            <ClipboardButton />
            <Tabs value={period as string}>
              <TabsList>
                <TabsTrigger value='monthly' asChild>
                  <Link href={`/strategy/monthly?${configQuery}`}>Mensuel</Link>
                </TabsTrigger>
                <TabsTrigger value='yearly'>
                  <Link href={`/strategy/yearly?${configQuery}`}>Annuel</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <StrategyGrid interests={interests} config={config} />
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
