
const conversations:any = new Map<string, string|undefined>();

export const conversationRepository={
getLastResponseId(conversationId:string){
    return conversations.get(conversationId);
},
setLastResponseId(conversationId:string,response:string){
    return conversations.set(conversationId,response)
}


}








