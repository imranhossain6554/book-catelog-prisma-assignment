import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './books.controller';
import { BookValidations } from './books.validations';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidations.create),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB
);

router.get('/', BookController.getAllFromDB);
router
  .route('/:id')
  .get(BookController.getByIdFromDB)
  .patch(
    validateRequest(BookValidations.update),
    auth(ENUM_USER_ROLE.ADMIN),
    BookController.updateIntoDB
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), BookController.deleteFromDB);

router.get('/:categoryId/category', BookController.getBooksByCategoryId);

export const BookRoutes = router;
