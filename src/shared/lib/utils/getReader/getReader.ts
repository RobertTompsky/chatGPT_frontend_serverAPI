export const getReader = (response: Response) => {
    const rs = response.body as ReadableStream<Uint8Array>;
    const reader = rs.getReader();
    const decoder = new TextDecoder("utf-8");
    
    return { reader, decoder }
}