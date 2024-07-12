import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn, formatDevice, formatPercent } from '@/lib/utils';
import { StrategyModel } from '@/models/strategy';
import { InterestByYear } from '@/models/interest';

export function CardSummary({
  interests,
  config,
  isMonthly,
}: {
  interests: InterestByYear[];
  config: StrategyModel;
  isMonthly?: boolean;
}) {
  const factor = isMonthly ? 12 : 1;
  return (
    <Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
      <CardHeader className='flex flex-row items-start bg-muted/50'>
        <div className='grid gap-0.5'>
          <CardTitle className='group flex items-center gap-2 text-lg'>
            Détail de la stratégie
          </CardTitle>
          <CardDescription>
            Durée: {config.until_age - config.age} années
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='p-6 text-sm'>
        {(config.targetPrincipal || config.targetInterest) && (
          <CardGroup title='Détail des objectifs'>
            <ul className='grid gap-3'>
              {config.targetPrincipal && (
                <CardItem
                  name='Capital attendu'
                  value={formatDevice(config.targetPrincipal)}
                />
              )}
              {config.targetInterest && (
                <CardItem
                  name='Intérêts attendu'
                  value={formatDevice(config.targetInterest)}
                />
              )}
            </ul>
          </CardGroup>
        )}
        <Separator className='my-4' />
        <CardGroup title='Détail du portefeuille'>
          <ul className='grid gap-3'>
            <CardItem
              name='Apport initial'
              value={formatDevice(config.principal)}
            />
            <CardItem
              name={`Apport ${isMonthly ? 'mensuel' : 'annuel'}`}
              value={formatDevice((config.compound * 12) / factor)}
            />
          </ul>
          <Separator className='my-2' />
          <ul className='grid gap-3'>
            <CardItem
              name="Taux d'intérêt"
              value={formatPercent(config.interestRate / 100)}
            />
            <CardItem
              name={`Intérêts brut ${isMonthly ? 'mensuel' : 'annuel'}`}
              value={formatDevice(
                interests[interests.length - 1].interest / factor
              )}
            />
          </ul>
          <Separator className='my-2' />
          <ul className='grid gap-3'>
            <CardItem
              name="Taux d'imposition sur plus-value"
              value={formatPercent(-config.taxRate / 100)}
            />
            <CardItem
              name={`Intérêts net ${isMonthly ? 'mensuel' : 'annuel'}`}
              value={formatDevice(
                interests[interests.length - 1].taxedInterest / factor
              )}
            />
          </ul>
          <Separator className='my-2' />
          <ul className='grid gap-3'>
            <CardItem
              name='Capital final'
              value={formatDevice(interests[interests.length - 1].principal)}
              bold
            />
          </ul>
        </CardGroup>
        {/* <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-3'>
            <div className='font-semibold'>Shipping Information</div>
            <address className='grid gap-0.5 not-italic text-muted-foreground'>
              <span>Liam Johnson</span>
              <span>1234 Main St.</span>
              <span>Anytown, CA 12345</span>
            </address>
          </div>
          <div className='grid auto-rows-max gap-3'>
            <div className='font-semibold'>Billing Information</div>
            <div className='text-muted-foreground'>
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className='my-4' /> */}
      </CardContent>
    </Card>
  );
}

function CardItem({
  name,
  value,
  bold,
}: {
  name: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <li
      className={cn(
        'flex items-center justify-between',
        bold ? 'font-semibold' : 'font-normal'
      )}
    >
      <span className='text-muted-foreground'>{name}</span>
      <span>{value}</span>
    </li>
  );
}

function CardGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='grid gap-3'>
      <div className='font-semibold'>{title}</div>
      <ul className='grid gap-3'>{children}</ul>
    </div>
  );
}
