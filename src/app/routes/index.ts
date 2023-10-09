import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoriesRoutes } from '../modules/category/category.routes';
import { UserRoutes } from '../modules/users/users.routes';
import { BookRoutes } from '../modules/books/books.routes';
import { OrderRoutes } from '../modules/orders/orders.routes';
import { UserProfileRoute } from '../modules/profile/profile.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/categories',
    routes: CategoriesRoutes,
  },
  {
    path: '/books',
    routes: BookRoutes,
  },
  {
    path: '/orders',
    routes: OrderRoutes,
  },
  {
    path: '/profile',
    routes: UserProfileRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
