require('express-async-errors');

import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import express, { Express } from 'express';
import router from './profile.routes';
import { globalErrorHandler } from './utils/global-error-handler';

const app: Express = express();

app.use('/', router);
app.use(globalErrorHandler);

export const profile: HttpFunction = app;
