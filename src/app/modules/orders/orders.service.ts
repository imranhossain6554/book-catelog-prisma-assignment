import { Order, OrderedBook } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (userId: string, orderedBooks: OrderedBook[]) => {
  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: {
        create: orderedBooks.map(({ bookId, quantity }) => ({
          bookId,
          quantity,
        })),
      },
    },
    include: {
      orderedBooks: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order not create');
  }
  return result;
};

const getAllFromDB = async (): Promise<Order[]> => {
  return await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
};

const getByIdFromDBCustomer = async (userId: string): Promise<Order | null> => {
  return await prisma.order.findFirst({
    where: {
      userId: userId,
    },
  });
};

const getByIdFromDB = async (
  orderId: string,
  role: string,
  userId: string
): Promise<Order | null> => {
  if (role === 'admin') {
    return await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        orderedBooks: true,
      },
    });
  } else {
    return await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: userId,
      },
      include: {
        orderedBooks: true,
      },
    });
  }
};

const getAllFromDBCustomer = async (userId: string): Promise<Order | null> => {
  return await prisma.order.findFirst({
    where: {
      userId: userId,
    },
    include: {
      orderedBooks: true,
    },
  });
};

const getOrderForCustomer = async (customerId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: customerId,
    },
  });
  return orders;
};

export const OrderService = {
  createOrder,
  getAllFromDB,
  getByIdFromDB,
  getByIdFromDBCustomer,
  getAllFromDBCustomer,
  getOrderForCustomer,
};
