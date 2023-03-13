import * as types from '../../constansts/admin-const'

const initialState = {
    game: {},
    loading: false,
    error: null
};

const gameDetailReducer = (state = initialState,action) => {
    switch (action.type) {
        case types.GET_GAME_DETAIL_START:
        return{
            ...state,
            loading: true
        }
        case types.GET_GAME_DETAIL_SUCCESS:
            return{
                ...state,
                game: action.payload,
                loading: false
            }
        case types.GET_GAME_DETAIL_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export default gameDetailReducer