'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { formatDevice, formatPercent } from '../lib/utils';

export function ProgressCard({
  description,
  value,
  subtitle,
  ratio,
}: {
  description: string;
  value: number;
  subtitle?: string;
  ratio?: number;
}) {
  return (
    <Card className='h-full'>
      <CardHeader className='pb-2'>
        <CardDescription>{description}</CardDescription>
        <CardTitle className='text-3xl'>{formatDevice(value, 0)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xs text-muted-foreground'>
          {ratio
            ? `${formatPercent(value / ratio - 1)} sur objectif`
            : undefined}
        </div>
      </CardContent>
      {value && (
        <CardFooter>
          <Progress
            value={ratio ? (value / ratio) * 100 : undefined}
            aria-label={subtitle}
          />
        </CardFooter>
      )}
    </Card>
  );
}
