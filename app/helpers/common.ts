export namespace CommonHelper {

	export function idFromUrl(url: string): number {
		const parts = url.split('/')
		parts.pop()

		return parseInt(parts.pop() as string, 10)
	}

	export function capitalize(chars: string): string {
		return chars.charAt(0).toUpperCase() + chars.slice(1)
	}

}
