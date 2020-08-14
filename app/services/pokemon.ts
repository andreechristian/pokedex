import { Type, Pokemon, Stat } from "../constants"
import { Defaults } from "../constants"
import { PokemonStore, ServiceStore } from "../stores"
import { CommonHelper } from "../helpers"


type Result = {
	id: number,
	name: string,
	type: Type,
}


export namespace PokemonService {

	// **
	// We apply store to comply with Fair Use Policy https://pokeapi.co/docs/v2
	// **

	export async function listByOffset(offset: number, count: number): Promise<{
		count: number,
		data: Result[],
	}> {
		return Promise.resolve().then(() => {
			return ServiceStore.load(`offset/${ offset }/count${ count }`)
		}).catch(async err => {
			return fetch(`${ Defaults.BASE_URL }pokemon?limit=${ count }&offset=${ offset }`)
				.then(res => res.json())
				.then(async res => {
					return ServiceStore.save(`offset/${ offset }/count${ count }`, {
						count: res.count,
						data: await Promise.all(res.results.map(async (result: any) => {
							const id = CommonHelper.idFromUrl(result.url)
							const pokemon = await PokemonStore.load(id).catch(() => null)
							return {
								id,
								name: result.name,
								type: pokemon ? pokemon.types.pop() : null,
							}
						}))
					})
				})
		})
	}

	export async function listByFilter(type: Type): Promise<{
		count: number,
		data: Result[],
	}> {
		return Promise.resolve().then(() => {
			return ServiceStore.load(`type/${ type }`)
		}).catch(async () => {
			return fetch(`${ Defaults.BASE_URL }type/${ type }`)
				.then(res => res.json())
				.then(res => {
					return ServiceStore.save(`type/${ type }`, {
						count: res.pokemon.length,
						data: res.pokemon.map((pokemon: any) => {
							return {
								id: CommonHelper.idFromUrl(pokemon.pokemon.url),
								name: pokemon.pokemon.name,
								type,
							}
						})
					})
				})
		})
	}

	export async function get(id: number) {
		return Promise.resolve().then(() => {
			return PokemonStore.load(id)
		}).catch(async () => {
			return fetch(`${ Defaults.BASE_URL }pokemon/${ id }`)
				.then(res => res.json())
				.then(data => {
					return PokemonStore.save(id, {
						id,
						name: data.name,
						baseExperience: data.base_experience,
						height: data.height,
						weight: data.weight,
						image: data.sprites?.other?.['official-artwork']?.front_default ?? null,
						stats: data.stats.map((stat: any) => {
							return {
								key: stat.stat.name,
								value: stat.base_stat,
							} as Stat
						}),
						types: data.types.map((type: any) => type.type.name),
					} as Pokemon)
				})
		})
	}

}
