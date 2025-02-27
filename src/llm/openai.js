const URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Create an interface with OpenAI, e.g. ChatGPT. You'll need
 * to provide credentials and so on.
 *
 * @param {string} apiKey - The API key needed to access the OpenAI service.
 * @param {string} [apiUrl] - Override with a custom URL to point to an API with an OpenAI-compatible interface.
 * @param {string} [model] - The OpenAI model, e.g. "gpt-4".
 * @param {number} [temperature] - The creativity ratio.
 * @return {*}
 */
export const llm = ({ apiKey, apiUrl, model, temperature }) => {
	return async (query) => {
		const response = await fetch(apiUrl || URL, {
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
