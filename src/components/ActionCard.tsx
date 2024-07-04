import Link from 'next/link';
import { Button } from '../components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

export function ActionCard({
  title,
  description,
  button,
}: {
  title: string;
  description: string;
  button?: {
    title: string;
    to: string;
  };
}) {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='max-w-lg text-balance leading-relaxed'>
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {button && (
          <Button asChild>
            <Link href={button.to}>{button.title}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
