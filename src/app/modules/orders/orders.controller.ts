import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './orders.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderedBooks } = req.body;
  const { id: userId } = req.user as { id: string };
  const result = await OrderService.createOrder(userId, orderedBooks);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully!',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const { role, id: userId } = req.user as { role: string; id: string };
  const result = await OrderService.getByIdFromDB(orderId, role, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specific Orders fetched successfully!',
    data: result,
  });
});

const getByIdFromDBCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user as { id: string };
    const result = await OrderService.getByIdFromDBCustomer(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer Orders fetched successfully!',
      data: result,
    });
  }
);

const getAllFromDBCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.user as { id: string };
  const result = await OrderService.getAllFromDBCustomer(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Orders fetched successfully!',
    data: result,
  });
});

const getOrderForCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const result = await OrderService.getOrderForCustomer(customerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Orders fetched successfully!',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getByIdFromDBCustomer,
  getAllFromDB,
  getByIdFromDB,
  getAllFromDBCustomer,
  getOrderForCustomer,
};
