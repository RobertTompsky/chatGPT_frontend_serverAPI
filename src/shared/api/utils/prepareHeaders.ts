export const prepareHeaders = (
    headers: Headers
) => {
    headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_KEY}`);
    headers.set('Content-Type', 'application/json');
    return headers;
};
