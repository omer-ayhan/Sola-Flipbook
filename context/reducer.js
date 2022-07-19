import { saveState } from "./browser-storage";
import { CHANGE_LANG, CHANGE_TARGET_BRAND } from "./type";

export default function reducer(state, action) {
	switch (action.type) {
		case CHANGE_LANG:
			saveState("lang", action.payload);
			return {
				...state,
				lang: action.payload,
			};
		case CHANGE_TARGET_BRAND:
			saveState("targetBrand", action.payload);
			return {
				...state,
				targetBrand: action.payload,
			};
		default:
			return state;
	}
}
