import * as types from '../../constansts/admin-const'

const initialState = {
    platforms: [],
    loading: false,
    error: null
}

const platformAllReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_PLATFORM_START:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_PLATFORM_SUCCESS:
            return {
                ...state,
                loading: false,
                platforms: action.payload
            }
        case types.GET_ALL_PLATFORM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default platformAllReducer