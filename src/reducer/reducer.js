const initial_state = {
    id: null,
    noHp: null,
    username: "",
    password: "",
    role: "",
    cart: [],
    favorite:[],
    errorLogin: false,
    successReg: false,
}

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.id,
                noHp: action.payload.noHp,
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role,
                cart: action.payload.cart
            }
        case 'ERROR_LOGIN':
            return {
                ...state,
                errorLogin: true
            }
        case 'HANDLE_CLOSE':
            return {
                ...state,
                errorLogin: false
            }
        case 'SUCCESS_REG':
            return {
                ...state,
                successReg: true
            }
        case 'LOGOUT':
            return initial_state
        default:
            return state
    }
}

export default reducer