import * as yup from 'yup';
import { strategySchema } from '@/validators';

export type StrategyModel = yup.InferType<typeof strategySchema>;
