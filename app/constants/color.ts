export namespace Colors {

	export const black = '#073B4C'
	export const white = '#FFFFFF'
	export const blue = '#118AB2'
	export const green = '#06D6A0'
	export const yellow = '#FFD166'
	export const red = '#EF476F'

	export function opacity(color: string, alpha: number) {
		return `${ color }${ Math.floor(alpha * 255).toString(16).padStart(2, '0') }`
	}

}
