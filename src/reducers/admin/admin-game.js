import * as types from '../../constansts/admin-const'

const initialState = {
    games: [],
    pageNumber: 0,
    pages: 0,
    loading: false,
    error: null
}

const gameAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIST_ADMIN_GAME_START:
            return {
                ...state,
                loading: true,
                pageNumber: action.payload
            }
        case types.GET_LIST_ADMIN_GAME_SUCCESS:
        let stateNew = {
                ...state,
                loading: false,
                games: action.payload.pagingGames,
                pages: action.payload.pages
            }    
        return stateNew
        case types.GET_LIST_ADMIN_GAME_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default gameAdminReducer;

