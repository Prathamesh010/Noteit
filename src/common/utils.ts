export function getLocalStorage(key: string): string {
	return localStorage.getItem(key) || ''
}

export function setLocalStorage(key: string, value: string): void {
	localStorage.setItem(key, value)
}

export function uuid(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c === 'x' ? r : (r & 0x3) | 0x8
			return v.toString(16)
		}
	)
}

// function to convert IsoDate to Date and format it to string with format it with days ago or hours ago
export function formatDate(date: string): string {
	const dateObj = new Date(date)
	const now = new Date()
	const diff = now.getTime() - dateObj.getTime()
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
	const diffHours = Math.floor(diff / (1000 * 60 * 60))
	const diffMinutes = Math.floor(diff / (1000 * 60))
	const diffSeconds = Math.floor(diff / 1000)
	if (diffDays > 0) {
		return diffDays === 1 ? `${diffDays} day ago` : `${diffDays} days ago`
	} else if (diffHours > 0) {
		return diffHours === 1
			? `${diffHours} hour ago`
			: `${diffHours} hours ago`
	} else if (diffMinutes > 0) {
		return diffMinutes === 1
			? `${diffMinutes} minute ago`
			: `${diffMinutes} minutes ago`
	} else if (diffSeconds > 0) {
		return `few seconds ago`
	} else {
		return 'just now'
	}
}
