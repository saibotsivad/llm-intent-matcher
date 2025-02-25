const URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Create an interface with OpenAI, e.g. ChatGPT. You'll need
 * to provide credentials and so on, but
 * @param {string} apiKey - The API key needed to access the OpenAI service.
 * @param {string} [model] - The OpenAI model, e.g. "gpt-4".
 * @param {number} [temperature] - The creativity function.
 * @return LlmCallable - The callable function.
 */
export const openAi = ({ apiKey, model, temperature }) => {
	return async ({ conversation }) => {
		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: model || 'gpt-4o-mini',
				temperature: temperature || 0.7,
				messages: conversation.map(({ role, message }) => ({
					role, content: message,
				})),
			}),
		})
		let data
		try {
			data = await response.json()
		} catch (error) {
			console.error('Failure processing response:', error)
		}
		if (!response.ok) {
			console.error('Error loading response:', data)
		}
		return data?.choices?.[0]?.message?.content
	}
}
