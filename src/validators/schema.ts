import * as yup from 'yup';

export const schemaConfig = yup.object().shape({
  from: yup
    .number()
    .nonNullable()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  age: yup.number().nonNullable().min(7).max(120).required(),
  until_age: yup
    .number()
    .when('age', (age, schema) => schema.min(age as unknown as number))
    .max(120)
    .required(),
  principal: yup.number().min(0).required(),
  compound: yup.number().nonNullable().min(0).required(),
  interestRate: yup.number().nonNullable().min(0).max(100).required(),
  taxRate: yup.number().nonNullable().min(0).max(100).required(),
  targetPrincipal: yup.number().min(0),
  targetInterest: yup.number().min(0),
});
export type CompoundInterestConfig = yup.InferType<typeof schemaConfig>;
