import { closestMatch } from './closest-match.js'
import assert from 'node:assert'

const response = '# add to reading list'

const possibles = [
	'physical item requiring delivery',
	'add to reading list',
	'physical item was delivered',
]

assert.equal(closestMatch(response, possibles), 'add to reading list')
