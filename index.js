import chatJippity from './adapter/open-ai.js'
import { createMatcher } from './lib/index.js'


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

const inquire = createMatcher({
	llm: chatJippity({
		apiKey: process.env.OPENAI_API_KEY,
	}),
	intents,
})
