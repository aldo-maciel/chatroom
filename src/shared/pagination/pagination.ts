import logger from '@/shared/logger.service';

export interface IPagination {
  start: number;
  step: number;
  sort: Record<string, number>;
}

const defaultValues = {
  step: 20,
  start: 0,
  sort: { createdAt: -1 },
} as IPagination;

export const Pagination = (
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (pagination: IPagination, ...args: unknown[]) {
    if (!pagination) {
      logger.error(
        'Pagination parameter needs to be the first and cannot be null'
      );
      throw new Error('Invalid parameter');
    }
    const paginateParam = Object.keys(pagination);

    const result = { ...defaultValues };
    if (paginateParam.length) {
      const { start, step, sort } = pagination;
      if (start) {
        result.start = +start;
      }
      if (step) {
        result.step = +step;
      }
      if (sort) {
        result.sort = JSON.parse(sort.toString());
      }
    }
    return originalMethod.apply(this, [result, ...args]);
  };
};
