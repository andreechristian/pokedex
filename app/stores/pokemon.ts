import { _save, _load } from './_storage'
import { Pokemon } from '../constants'


export namespace PokemonStore {

	export async function save<T extends Pokemon>(key: number, value: T): Promise<T> {
		return _save(`pokemon/${ key }`, value)
	}

	export const load = async (key: number): Promise<Pokemon> => {
		return _load(`pokemon/${ key }`)
	}

}
