import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions: {
    secure: boolean;
    httpOnly: boolean;
    sameSite?: 'none' | undefined;
  } = {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    token: others.token,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions: {
    secure: boolean;
    httpOnly: boolean;
    sameSite?: 'none' | undefined;
  } = {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    token: result.token,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.user as { id: string };
  const result = await AuthService.logoutUser(userId);

  const cookieOptions: {
    secure: boolean;
    httpOnly: boolean;
    sameSite?: 'none' | undefined;
  } = {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  };

  // Remove the refreshToken cookie from the response
  res.clearCookie('refreshToken', cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully!',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  logoutUser,
};
