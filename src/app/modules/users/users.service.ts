import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { exclude } from '../../../shared/utils';

const getAllFromDB = async (): Promise<Omit<User, 'password'>[]> => {
  const users = await prisma.user.findMany();
  return users.map(user => exclude(user, ['password']));
};

const getByIdFromDB = async (
  id: string
): Promise<Omit<User, 'password'> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return exclude(user, ['password']);
};

const updateIntoDB = async (
  id: string,
  payload: Partial<User>
): Promise<Omit<User, 'password'> | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return exclude(result, ['password']);
};
const deleteFromDB = async (id: string): Promise<User> => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
