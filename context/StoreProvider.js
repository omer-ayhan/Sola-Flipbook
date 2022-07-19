import { createContext, useEffect, useReducer } from "react";
import initialState from "./store";
import reducer from "./reducer";
import { loadState } from "./browser-storage";
import { CHANGE_TARGET_BRAND } from "./type";

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: CHANGE_TARGET_BRAND,
			payload: loadState("targetBrand", "CHARMING"),
		});
	}, []);

	return (
		<StoreContext.Provider
			value={{
				state,
				dispatch,
			}}>
			{children}
		</StoreContext.Provider>
	);
}
