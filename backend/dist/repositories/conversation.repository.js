"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationRepository = void 0;
const conversations = new Map();
exports.conversationRepository = {
    getLastResponseId(conversationId) {
        return conversations.get(conversationId);
    },
    setLastResponseId(conversationId, response) {
        return conversations.set(conversationId, response);
    }
};
