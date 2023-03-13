import * as types from '../../constansts/admin-const'

const initialState = {
    games: [],
    listSearch: [],
    loading: false,
    error: null
};

const gameAllReducer = (state = initialState,action) => {
    switch (action.type) {
        case types.CREATE_NEW_GAME_START:
        case types.UPDATE_CATEGORY_START:
            return{
                ...state,
                loading: true,
            }
        case types.CREATE_NEW_GAME_SUCCESS:
        case types.UPDATE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false
            }
        case types.CREATE_NEW_GAME_ERROR:
        case types.UPDATE_CATEGORY_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default gameAllReducer;

