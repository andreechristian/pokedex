export namespace Colors {

	export const black = '#1F2026'
	export const white = '#FFFFFF'
	export const blue = '#118AB2'
	export const green = '#06D6A0'
	export const yellow = '#FFD166'
	export const red = '#EF476F'
	export const purple = '#A362EA'
	export const brown = '#E29578'
	export const grey = '#B7B7A4'
	export const darkgrey = '#353943'
	export const blackest = '#000000'

	export function opacity(color: string, alpha: number) {
		return `${ color }${ Math.floor(alpha * 255).toString(16).padStart(2, '0') }`
	}

}
