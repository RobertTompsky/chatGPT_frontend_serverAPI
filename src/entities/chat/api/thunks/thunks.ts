import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChatRequest } from "../../model";
import { baseUrl } from "@/shared/api";

export const sendMessageThunk = createAsyncThunk(
  'chats/sendMessage',
  async (req: IChatRequest) => {
      try {
          const { messages, model, systemPrompt } = req

          const response = await fetch(
              `${baseUrl}/chat/send_message`,
              {
                  method: 'POST',
                  body: JSON.stringify({
                      messages,
                      model,
                      systemPrompt
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