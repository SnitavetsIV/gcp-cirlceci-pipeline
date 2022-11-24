import { Router } from 'express';
import { rootHandler, urlNotFoundHandler } from './common.controller';
import { createProfileHandler, getProfileHandler } from './profile.controller';
import {
  createProfileValidationSchema,
  getProfileValidationSchema,
} from './utils/validations';
import { validator } from './utils/validations/validator';

const router = Router();

router.get('/', rootHandler);

router.get(
  '/profile',
  [validator(getProfileValidationSchema)],
  getProfileHandler
);

router.post(
  '/profile',
  [validator(createProfileValidationSchema)],
  createProfileHandler
);

router.get('*', urlNotFoundHandler);

export default router;
