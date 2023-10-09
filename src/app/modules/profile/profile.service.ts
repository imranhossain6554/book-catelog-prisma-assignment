// import { User } from '@prisma/client';
// import ApiError from '../../../errors/ApiError';
// import prisma from '../../../shared/prisma';
// import httpStatus from 'http-status';
// import { exclude } from '../../../shared/utils';

// const getByIdFromDB = async (
//   userId: string
// ): Promise<Omit<User, 'password'> | null> => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });

//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }

//   return exclude(user, ['password']);
// };

// const getProfileData = async (userId: string) => {
//   const result = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       name: true,
//       email: true,
//       role: true,
//       contactNo: true,
//       address: true,
//       profileImg: true,
//     },
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.OK, 'User not found');
//   }

//   return result;
// };

// export const UserProfileService = {
//   getByIdFromDB,
//   getProfileData,
// };
import { User } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import { exclude } from '../../../shared/utils';

const getByIdFromDB = async (
  userId: string
): Promise<Omit<User, 'password'> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return exclude(user, ['password']);
};

export const UserProfileService = {
  getByIdFromDB,
};
