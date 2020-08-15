export type Type = 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | 'unknown' | 'shadow'

export type Stat = {
	key: string
	value: number
}

export type Pokemon = {
	id: number
	name: string
	baseExperience: number
	height: number
	weight: number
	image: string
	stats: Stat[]
	types: Type[]
}
