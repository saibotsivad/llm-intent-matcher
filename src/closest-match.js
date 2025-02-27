import levenshteinDistance from 'leven'

export const closestMatch = (key, possibles) => possibles.sort((a, b) => {
	if (!a) return 1
	if (!b) return -1
	return levenshteinDistance(key, a) - levenshteinDistance(key, b)
})[0]
