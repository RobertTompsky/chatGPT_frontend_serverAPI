import { 
    createApi, 
    fetchBaseQuery, 
    retry 
} from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "..";

export const baseUrl = `${import.meta.env.VITE_SERVER_URL}`

const baseQuery = fetchBaseQuery({baseUrl});

const baseQueryWithRetry = retry(
    baseQuery,
    { maxRetries: 1 }
);

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Chat', 'Doc'],
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
});