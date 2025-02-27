export type LlmConversation = {
	role: 'system' | 'user' | 'assistant';
	message: string;
}

export type LlmQuery = {
	conversation: LlmConversation[];
}

export type LlmCallable = (query: LlmQuery) => Promise<string>;
