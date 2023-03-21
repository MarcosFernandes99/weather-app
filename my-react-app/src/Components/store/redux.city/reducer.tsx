const VALUE_INITIAL_STATE = {
    cities: ""
}

const CityReducer = (state = VALUE_INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case "SET_CITY":
            return {
                ...state,
                cities: action.payload
            }

        default:
            return state
    }
}

export default CityReducer