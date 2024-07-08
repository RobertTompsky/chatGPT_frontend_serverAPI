import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChatRequest, IQaRequest } from "../../model";
import { baseUrl } from "@/shared/api";

export const sendMessageThunk = createAsyncThunk(
  'chats/sendChatMessage',
  async (req: IChatRequest) => {
      try {
          const { messages, model, prompt } = req

          const response = await fetch(
              `${baseUrl}/chat/send_message`,
              {
                  method: 'POST',
                  body: JSON.stringify({
                      messages,
                      model,
                      prompt
                  }),
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
          );

          return response
      } catch (error) {
          console.log(error)
      }
  }
);

export const sendQaMessageThunk = createAsyncThunk(
    'chats/sendQaMessage',
    async (req: IQaRequest) => {
        try {
            const { messages, model, prompt, sessionId } = req
  
            const response = await fetch(
                `${baseUrl}/chat/send_question`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        messages,
                        model,
                        prompt,
                        sessionId
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
  
            return response
        } catch (error) {
            console.log(error)
        }
    }
  );