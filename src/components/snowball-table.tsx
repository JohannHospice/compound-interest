import { cn, formatDevice } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { InterestByYear } from '../models/interest';

export function SnowballTable({
  interestByYears,
  isMonthly,
  targetPrincipal = 0,
  targetInterest = 0,
}: {
  interestByYears: InterestByYear[];
  isMonthly?: boolean;
  targetPrincipal?: number;
  targetInterest?: number;
}) {
  const factor = isMonthly ? 12 : 1;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Année</TableCell>
          <TableCell className='hidden sm:table-cell'>
            Intéret brut{isMonthly ? ' mensuel' : ' annuel'}
          </TableCell>
          <TableCell className='hidden sm:table-cell'>Apport total</TableCell>
          <TableCell className='text-right'>Capital</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interestByYears.map((value, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className='font-medium'>{value.year}</div>
              <div className='text-muted-foreground'>{value.age} ans</div>
            </TableCell>
            <TableCell className='hidden sm:table-cell'>
              {value.interest < targetInterest ? (
                <Badge
                  className='text-sm font-normal bg-transparent'
                  variant='secondary'
                >
                  {formatDevice(value.interest / factor)}
                </Badge>
              ) : (
                <Badge
                  className='text-sm font-normal bg-emerald-100'
                  variant='secondary'
                >
                  {formatDevice(value.interest / factor)}
                </Badge>
              )}
            </TableCell>
            <TableCell className='hidden sm:table-cell'>
              {formatDevice(value.compound)}
            </TableCell>
            <TableCell className='text-right'>
              {value.principal < targetPrincipal ? (
                <Badge
                  className='text-sm font-normal bg-transparent'
                  variant='secondary'
                >
                  {formatDevice(value.principal)}
                </Badge>
              ) : (
                <Badge
                  className='text-sm font-normal bg-emerald-100'
                  variant='secondary'
                >
                  {formatDevice(value.principal)}
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
