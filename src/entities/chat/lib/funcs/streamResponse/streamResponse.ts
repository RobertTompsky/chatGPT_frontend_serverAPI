import { 
    IChatType, 
    addChatMessage, 
    setChatAIProcessing, 
    streamChatAIMessage 
} from "@/entities/chat/model";
import { getReader } from "@/shared/lib/utils"
import { 
    ThunkDispatch, 
    UnknownAction 
} from "@reduxjs/toolkit";

export const streamResponse = async (
    response: Response,
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    chatType: IChatType
) => {
    const { reader, decoder } = getReader(response)

    dispatch(setChatAIProcessing({
        type: chatType,
        isProcessing: false
    }))
    dispatch(addChatMessage({
        chatType,
        message: {
            role: 'ai' as 'ai',
            content: ''
        }
    }));

    while (true) {
        const { value, done } = await reader.read();
        const chunk = decoder.decode(value, { stream: true });
        //console.log(chunk);
        dispatch(streamChatAIMessage({
            chatType,
            content: chunk
        }));
        if (done) break;
    }
}