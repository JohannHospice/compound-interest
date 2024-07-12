import { StrategyModel } from '../models/strategy';
import { InterestByYear } from '../models/interest';

export function getComposedInterest(config: StrategyModel): InterestByYear[] {
  const interests = [];
  let principal = config.principal;
  const toYear = config.from + config.until_age - config.age;

  for (let year = config.from; year <= toYear; year++) {
    const interest = principal * (config.interestRate / 100);
    principal = principal + interest + config.compound * 12;

    interests.push({
      age: year - config.from + config.age,
      year,
      principal,
      interest,
      taxedInterest: interest * (1 - config.taxRate / 100),
      compound: config.compound * (year - config.from) * 12 + config.principal,
    });
  }

  return interests;
}
