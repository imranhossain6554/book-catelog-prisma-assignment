import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { convertToIsoDate } from '../../../shared/utils';
import { booksSearchableFields } from './books.constants';
import { IBooksCategoryFilterRequest } from './books.interface';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const { publicationDate } = data;

  return await prisma.book.create({
    data: {
      ...data,
      publicationDate: convertToIsoDate(publicationDate),
    },
    include: {
      category: true,
    },
  });
};

const getAllFromDB = async (
  filters: IBooksCategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, minPrice, maxPrice, ...filterData } = filters;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: booksSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  const filterConditions = Object.entries(filterData).map(([key, value]) => {
    if (key === 'category') {
      return {
        category: {
          id: value as string,
        },
      };
    }
    return {
      [key]: {
        equals: value,
      },
    };
  });

  andConditions.push(...filterConditions);

  if (minPrice !== undefined && maxPrice !== undefined) {
    andConditions.push({
      AND: [
        {
          price: {
            gte: Number(minPrice),
          },
        },
        {
          price: {
            lte: Number(maxPrice),
          },
        },
      ],
    });
  } else if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
      },
    });
  } else if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    where: {
      category: {
        id: categoryId,
      },
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: 'desc',
          },
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: { category: { id: categoryId } },
  });

  const subtotal = await prisma.book.count();

  const totalPage = Math.ceil(subtotal / size);

  return {
    meta: {
      size,
      page,
      total,
      totalPage,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  return await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  return await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
};
const deleteFromDB = async (id: string): Promise<Book> => {
  return await prisma.book.delete({
    where: {
      id,
    },
  });
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getBooksByCategoryId,
};
