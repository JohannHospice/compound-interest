import Link from 'next/link';
import { Button } from '../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { getComposedInterest } from '../../services/getComposedInterest';
import { ClipboardButton } from './components/ClipboardButton';
import { StrategyGrid } from './components/StrategyGrid';
import { ArrowLeft } from 'lucide-react';
import { toQueryString } from '../../lib/utils';
import { allSchema } from '../../components/forms/validators';
import * as yup from 'yup';

export default function Strategy({
  searchParams,
}: {
  searchParams: yup.InferType<typeof allSchema>;
}) {
  try {
    const config = allSchema.validateSync(searchParams);
    const interests = getComposedInterest(config);

    return (
      <Tabs defaultValue='yearly'>
        <div className='p-14 gap-4 flex flex-col '>
          <div className='flex justify-between'>
            <Button variant='ghost' asChild className='gap-2'>
              <Link href={'/?' + toQueryString(searchParams)}>
                <ArrowLeft size={16} />
                Modifier
              </Link>
            </Button>
            <div className='flex gap-4 self-end'>
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
