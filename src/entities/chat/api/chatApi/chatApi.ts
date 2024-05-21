import { api } from "@/shared/api";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
  IMessage,
  addMessage,
  setGPTTyping
} from "../../model";

interface ChatRequestBody {
  messages: IMessage[];
}

interface ChatResponseBody {
  response: string
}

const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAnswer: builder.mutation<ReadableStream<Uint8Array>, ChatRequestBody>({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const { messages } = arg;
        try {
          const response = await fetchWithBQ({
            url: '/chat/send_message',
            method: 'POST',
            body: JSON.stringify(messages),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.error) {
            return { error: response.error }; // Возвращаем ошибку, если она есть
          }

          const data = response.data as ReadableStream<Uint8Array>;

          return { data }; // Возвращаем данные
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              data: 'Something went wrong',
            } as FetchBaseQueryError, // Возвращаем кастомную ошибку в случае исключения
          };
        }
      },
    }),
  }),
});

export const { useGetAnswerMutation } = chatApi