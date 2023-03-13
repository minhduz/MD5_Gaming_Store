import * as types from '../../constansts/user-const'

const initialState = {
    gameCategory:{},
    games: [],
    loading: false,
    error: null
}

const gameHomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_GAME_START:
        case types.GET_GAME_BY_CATEGORY_START:
            return {
                ...state,
                loading: true
            }
        case types.GET_HOME_GAME_SUCCESS:
            return {
                ...state,
                loading: false,
                games: action.payload
            }
        case types.GET_GAME_BY_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                gameCategory: action.payload
            }
        case types.GET_GAME_BY_CATEGORY_ERROR:
        case types.GET_HOME_GAME_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


export default gameHomeReducer;
