export const getPagination = (query: any) => {
  const page = Math.max(parseInt(query.page ?? '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit ?? '20', 10), 1), 100);
  const offset = (page - 1) * limit;
  const search = (query.search ?? '').toString().trim();
  return { page, limit, offset, search };
};
