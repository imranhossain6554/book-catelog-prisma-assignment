# Book Catalog Backend Using Postgresql and Prisma

<hr>

### Live Link: https://book-catallog-backend-prisma-flame.vercel.app/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/auth/logout (POST)
- api/v1/auth/refresh-token (POST)
- api/v1/users (GET)
- api/v1/users/ffd3dceb-d9a1-47f6-b48f-be1af3d7fd4b (Single GET) Include an id that is saved in my database
- api/v1/users/ffd3dceb-d9a1-47f6-b48f-be1af3d7fd4b (PATCH)
- api/v1/users/ffd3dceb-d9a1-47f6-b48f-be1af3d7fd4b (DELETE) Include an id that is saved in my database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/c7f6b0a1-6970-4fa7-9cba-d66be3d3071d (Single GET) Include an id that is saved in my database
- api/v1/categories/c7f6b0a1-6970-4fa7-9cba-d66be3d3071d (PATCH)
- api/v1/categories/c7f6b0a1-6970-4fa7-9cba-d66be3d3071d (DELETE) Include an id that is saved in my database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/5f7a5a8e-0e64-40e1-b3de-9d130926fd82/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)
