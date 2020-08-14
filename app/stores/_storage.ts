import AsyncStorage from '@react-native-community/async-storage'
import { Defaults } from '../constants/default'


export const _save = async (key: string, value: any) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(`${ Defaults.STORE_KEY }/${ key }`, jsonValue)

		return value
	} catch (e) {
		throw e
	}
}

export const _load = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(`${ Defaults.STORE_KEY }/${ key }`)

		if (jsonValue !== null) {
			return JSON.parse(jsonValue)
		}

		throw new Error()
	} catch (e) {
		throw e
	}
}