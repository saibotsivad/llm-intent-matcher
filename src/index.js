import {closestMatch} from './closest-match.js'

const OVERALL_PROMPT = `
You are a message processing assistant who will be provided the body
of a message such as an email or SMS text, and will need to find the
most likely intent behind the email. Respond with just the heading, no
additional text. Here are the possible intents:
`

const generateQueryPrompt = (query) => `
${query}
`

/**
 * Create an intent matcher thingy.
 * @param llm
 * @param intents
 * @return {function(*): Promise<*>}
 */
export const createIntentMatcher = ({ llm, intents }) => {
	const intentKeys = Object.keys(intents)
	const initialContext = {
		role: 'system',
		message: OVERALL_PROMPT
			+ '\n'
			+ intentKeys
				.map(key => [
					`# ${key}`,
					intents[key].split('\n').map(line => line.trim()).join('\n'),
				].join('\n'))
				.join('\n'),
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
			: closestMatch(response, intentKeys)
	}
}
