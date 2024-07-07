import { Router } from 'express';

import { SuccessResponse } from '../utils/response';

export const routerConfig = {
  path: '/',
  router: Router()
} as const;

const { router } = routerConfig;

router.get('/', (req, res) => {
  const successResponse = new SuccessResponse({
    message: 'Welcome to the API',
    data: null
  });

  res.json(successResponse);
});
