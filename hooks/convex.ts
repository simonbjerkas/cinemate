import { makeUseQueryWithStatus } from 'convex-helpers/react';
import { useQueries } from 'convex/react';

export const useConvexQuery = makeUseQueryWithStatus(useQueries);
