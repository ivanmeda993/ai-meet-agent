import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import { DEFAULT_PAGE } from '@/lib/constants';

export const useAgentsFilters = () => {
  // URL state - updates immediately for sharing/bookmarking
  const [urlFilters, setUrlFilters] = useQueryStates({
    search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });

  // Debounced search value for API calls - reduces server load
  const [debouncedSearch] = useDebounceValue(urlFilters.search, 300);

  // Create filters object for API calls with debounced search
  const apiFilters = useMemo(
    () => ({
      ...urlFilters,
      search: debouncedSearch,
    }),
    [urlFilters, debouncedSearch],
  );

  // Return URL filters for immediate UI feedback and API filters for queries
  return {
    // Immediate filters for UI (input values, URL state)
    filters: urlFilters,
    // Debounced filters for API calls
    apiFilters,
    // Setter function for immediate URL updates
    setFilters: setUrlFilters,
  } as const;
};
