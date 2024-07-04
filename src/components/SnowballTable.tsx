import { formatDevice } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { InterestByYear } from '../services/getComposedInterest';
import { Badge } from './ui/badge';

export function SnowballTable({ data }: { data: InterestByYear[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Année</TableCell>
          <TableCell className='hidden sm:table-cell'>Capital</TableCell>
          <TableCell className='hidden sm:table-cell'>Apport total</TableCell>
          <TableCell className='hidden md:table-cell'>Statut</TableCell>
          <TableCell className='hidden md:table-cell'>
            Intéret brut annuel
          </TableCell>
          <TableCell className='text-right'>Intéret net annuel</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((value, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className='font-medium'>{value.year}</div>
              <div className='text-muted-foreground'>{value.age} ans</div>
            </TableCell>

            <TableCell className='hidden sm:table-cell'>
              {formatDevice(value.principal)}
            </TableCell>
            <TableCell className='hidden sm:table-cell'>
              {formatDevice(value.compound)}
            </TableCell>
            {/* <TableCell className='hidden sm:table-cell'>Sale</TableCell> */}
            <TableCell className='hidden sm:table-cell'>
              <div className='flex flex-col gap-2 flex-wrap items-start'>
                {value.status.length === 0 ? (
                  <Badge className='text-xs' variant='outline'>
                    Actif
                  </Badge>
                ) : (
                  value.status.map((status, index) => (
                    <Badge key={index} className='text-xs' variant='secondary'>
                      {status}
                    </Badge>
                  ))
                )}
              </div>
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              {formatDevice(value.interest)}
            </TableCell>
            <TableCell className='text-right'>
              {formatDevice(value.taxedInterest)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
