import { api } from "@/shared/api"

export const docApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addFileDoc: builder.mutation<{ message: string }, FormData>({
            query: (body) => ({
                url: '/chat/upload_doc',
                method: "POST",
                body
            }),
            
            invalidatesTags: ['Doc']
        }),
        addWebDoc: builder.mutation<{ message: string }, {url: string}>({
            query: (body) => ({
                url: '/chat/addWebDoc',
                method: "POST",
                body
            })
        })
    })
})

export const { 
    useAddFileDocMutation, 
    useAddWebDocMutation
} = docApi

