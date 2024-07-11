export interface InterestByYear {
  age: number;
  year: number;
  principal: number;
  interest: number;
  compound: number;
  taxedInterest: number;
  status: Status[];
}

export type Status = 'Capital atteint' | 'Intérets atteint';
