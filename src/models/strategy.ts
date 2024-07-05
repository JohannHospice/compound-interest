import * as yup from 'yup';
import { strategySchema } from '../components/forms/validators';

export type StrategyModel = yup.InferType<typeof strategySchema>;
