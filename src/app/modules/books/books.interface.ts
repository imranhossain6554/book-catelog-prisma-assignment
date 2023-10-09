export type IBooksCategoryFilterRequest = {
  search?: string | null;
  category?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
};
