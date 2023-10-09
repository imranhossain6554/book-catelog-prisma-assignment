import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { comparePassword, hashPassword } from './auth.utils';
import { exclude } from '../../../shared/utils';

const createUser = async (
  data: User
): Promise<Omit<User, 'password'> | null> => {
  const { password, ...userData } = data;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });
  if (isUserExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User already exists with this email'
    );
  }
  const hashedPassword = await hashPassword(password);
  const result = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });
  return exclude(result, ['password']);
};

const loginUser = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = data;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordMatch = await comparePassword(password, isUserExist.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  //create access token & refresh token
  const { id, role } = isUserExist;
  const token = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    token,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    token: newAccessToken,
  };
};

const logoutUser = async (
  id: string
): Promise<IRefreshTokenResponse | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return {
    token: '',
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
  logoutUser,
};
