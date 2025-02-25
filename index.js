import levenshteinDistance from 'leven'

const generateInitialPrompt = (intents) => `
You are an email processing assistant who will be provided the body
of an email and will need to find the most likely intent behind the
email. Here are the possible intents:
${Object.keys(intents).map(i => `- "${i}": ${intents[i]}`)}
`

const generateQueryPrompt = (query) => `
<email-message>
${query}
</email-message>
`

export const createIntentMatcher = ({ llm, intents }) => {
	const intentKeys = Object.keys(intents)
	const initialContext = {
		role: 'system',
		message: generateInitialPrompt(intents)
	}
	return async (query) => {
		const response = await llm({
			conversation: [
				initialContext,
				{
					role: 'user',
					message: generateQueryPrompt(query),
				},
			],
		})
		return intents[response]
			? response
			: intentKeys.sort((a, b) => {
				if (!a) return 1
				if (!b) return -1
				return levenshteinDistance(response, a) - levenshteinDistance(response, b)
			}).pop()
	}
}
