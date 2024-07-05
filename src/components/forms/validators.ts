import * as yup from 'yup';

const profileSchema = yup.object().shape({
  from: yup
    .number()
    .nonNullable()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  age: yup.number().nonNullable().min(7).max(120).required(),
  until_age: yup.number().max(120).required(),
});
const investmentSchema = yup.object().shape({
  principal: yup.number().min(0).required(),
  compound: yup.number().nonNullable().min(0).required(),
});
const targetSchema = yup.object().shape({
  targetPrincipal: yup.number().min(0),
  targetInterest: yup.number().min(0),
});
const performanceSchema = yup.object().shape({
  interestRate: yup.number().nonNullable().min(0).max(100).required(),
  taxRate: yup.number().nonNullable().min(0).max(100).required(),
});

const strategySchema = profileSchema
  .concat(investmentSchema)
  .concat(targetSchema)
  .concat(performanceSchema);

export {
  investmentSchema,
  targetSchema,
  performanceSchema,
  profileSchema,
  strategySchema,
};
