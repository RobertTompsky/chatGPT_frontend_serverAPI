import { api } from "@/shared/api"

export const docApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadDocFile: builder.mutation<{ message: string }, FormData>({
            query: (body) => ({
                url: '/upload_doc',
                method: "POST",
                body
            }),
            
            invalidatesTags: ['Doc']
        }),
        addWebDocToDB: builder.mutation<{ message: string }, {url: string}>({
            query: (body) => ({
                url: '/addWebDoc',
                method: "POST",
                body
            })
        })
    })
})

export const { 
    useUploadDocFileMutation, 
    useAddWebDocToDBMutation
} = docApi

