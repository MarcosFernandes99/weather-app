const VALUE_INITIAL_STATE = {
    isOpen: "false"
}

const ModalReducer = (state = VALUE_INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case "SET_MODAL":
            return {
                ...state,
                isOpen: action.payload
            }

        default:
            return state
    }
}

export default ModalReducer