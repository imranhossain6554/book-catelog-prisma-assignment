// import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import { OrderController } from './orders.controller';
// import { OrderValidations } from './orders.validations';

import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './orders.controller';
import { OrderValidations } from './orders.validations';

const router = express.Router();

// router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllFromDB);
// router.get(
//   '/',
//   auth(ENUM_USER_ROLE.CUSTOMER),
//   OrderController.getByIdFromDBCustomer
// );
// router.get(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
//   OrderController.getByIdFromDB
// );

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(OrderValidations.create),
  OrderController.createOrder
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  (req: Request, res: Response, next: NextFunction) => {
    const userRole: ENUM_USER_ROLE | undefined = req.user?.role;
    const routeHandler =
      userRole === ENUM_USER_ROLE.ADMIN
        ? OrderController.getAllFromDB
        : userRole === ENUM_USER_ROLE.CUSTOMER
        ? OrderController.getAllFromDBCustomer
        : null;

    if (routeHandler) {
      routeHandler(req, res, next);
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Access denied!');
    }
  }
);

// router.get('/:customerId', OrderController.getOrderForCustomer);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getByIdFromDB
);

export const OrderRoutes = router;
