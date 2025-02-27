import { LlmCallable, LlmQuery } from '../types'

const URL = 'https://api.openai.com/v1/chat/completions'

export interface OpenAiConfigs {
	/**
	 * The API key needed to access the OpenAI service.
	 */
	apiKey: string;
	/**
	 * The OpenAI model, e.g. `gpt-4`.
	 */
	model?: string;
	/**
	 * The creativity ratio.
	 */
	temperature?: number;
}

/**
 * Create an interface with OpenAI, e.g. ChatGPT. You'll need
 * to provide credentials and so on, but
 */
export const openAi = ({ apiKey, model, temperature }: OpenAiConfigs): LlmCallable => {
	return async (query: LlmQuery): Promise<string> => {
		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: model || 'gpt-4o-mini',
				temperature: temperature || 0.7,
				messages: query.conversation.map(({ role, message }) => ({
					role, content: message,
				})),
			}),
		})
		let data: unknown
		try {
			data = await response.json()
		} catch (error) {
			console.error('Failure processing response:', error)
		}
		if (!response.ok) {
			console.error('Error loading response:', data)
		}
		// @ts-ignore
		return data?.choices?.[0]?.message?.content
	}
}
