const VALUE_INITIAL_STATE = {
    day: ""
}

const SetDayState = (state = VALUE_INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case "SET_DAY_STATE":
            return {
                ...state,
                day: action.payload 
            }

        default:
            return state    
    }
}

export default SetDayState