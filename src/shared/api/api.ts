import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./prepareHeaders";

const baseQuery = fetchBaseQuery({
    baseUrl: `http://127.0.0.1:3000`,
    prepareHeaders: (
        headers
    ) => prepareHeaders(headers),
});

const baseQueryWithRetry = retry(
    baseQuery,
    { maxRetries: 1 }
);

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Chat'],
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
});