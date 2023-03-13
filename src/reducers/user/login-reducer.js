import * as types from '../../constansts/user-const'

const initialState = {
    signupInfo: {},
    loginInfo: {},
    loginData: {},
    loading: false,
    loginStatus: true,
    error: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_START:
            return {
                ...state,
                loading: true,
                signupInfo: action.payload
            }
        case types.LOGIN_START:
            return {
                ...state,
                loading: true,
                loginInfo: action.payload
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loginData: action.payload,
                loginStatus: false
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case types.LOGIN_FAIL:
            let stateNew = {
                ...state,
                loginStatus: false
            }
            return stateNew;
        case types.SIGNUP_ERROR:
        case types.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default loginReducer