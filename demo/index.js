import { createIntentMatcher } from '../index.js'
import { openAi } from './llm-open-ai.js'

const intents = {
	'add to reading list': `
		the email contains a long-form essay or blog post
		type content, or appears to link out to one, and
		does not appear to be primarily marketing
	`,
	'physical item requiring delivery': `
		the email notes that a physical item was purchased
		that will be shipped and delivered
	`,
	'physical item was delivered': `
		the email notes that a physical item was delivered
		to an address or other physical location
	`,
}

const inquire = createIntentMatcher({
	llm: openAi({
		apiKey: process.env.OPENAI_API_KEY,
		model: ''
	}),
	intents,
})

const intentKey = await inquire(
	'In this weeks blog post we will discuss whether MongoDB connection latency is enough to matter.',
)

console.log(intentKey)

console.log(
	intentKey === 'add to reading list'
		? 'Correct match.'
		: 'Incorrect match.'
)
