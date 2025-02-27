# LLM Intent Matcher

Given some text, like from an email or SMS, use an LLM to determine what the most likely intent is.

(Uses pre/post LLM scripts to reduce risk of error.)

## Overview

Consider something like an email, or an SMS message.

Then consider a list of actions, like this:

- Add to reading list
- Alert me with a 2FA code
- Add/remove from a specific list (like purchased items waiting for delivery)

In this library, you define a key/value set of intents, where the key is the intent title, and the value is the context, like this:

```js
const intents = {
	'add to reading list': `
		the email contains a long-form essay or blog post
		type content and does not appear to be marketing
	`,
	'add to awaiting-delivery list': `
		the email notes that a physical item was purchased
		that will be shipped and delivered
	`,
	'mark as delivered on awaiting-delivery list': `
		the email notes that a physical item was delivered
		to an address or other physical location
	`,
}
```

You'd provide an LLM interface and the intents map, so imagine something like this:

```js
import { createIntentMatcher } from 'llm-intent-matcher'
import { llm } from 'llm-intent-matcher/llm/open-ai-compatible'

const matcher = createIntentMatcher({
	llm: llm({ apiKey }),
	intents, // from earlier
})
```

Then you can call that with some content, e.g. an email or SMS or whatever else, and it will return the key from the `intents` dictionary. For example, a plaintext email from Amazon:

```js
const key = await inquire(`
	Thanks for your order, Tobias!
	Ordered Shipped Out for Delivery Delivered
	Arriving Friday
	Tobias - Cityname, STATE
	Order # 123-123-123-123-123
	View or edit order
	Skechers mens Go Walk Max-athletic
	Quantity: 1
`)
console.log(key) // => "physical item requiring delivery"
```

## License

Published and released under the [Very Open License](http://veryopenlicense.com).
