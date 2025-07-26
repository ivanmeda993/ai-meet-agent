import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

import { DEFAULT_PAGE } from '@/lib/constants';

export const filtersSearchParams = {
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
};

export const loadAgentsSearchParams = createLoader(filtersSearchParams);
export type AgentsParamsFilters = typeof filtersSearchParams;
