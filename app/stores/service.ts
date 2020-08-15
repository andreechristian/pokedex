import { _save, _load } from './_storage'


export namespace ServiceStore {

	export async function save<T extends any>(key: string, value: T): Promise<T> {
		return _save(`service/${ key }`, value)
	}

	export const load = async (key: string): Promise<any> => {
		return _load(`service/${ key }`)
	}

}
