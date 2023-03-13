import * as types from '../../constansts/user-const' 

const initialState = {
    
    categories: [],
    loading: false,
    error: null
}

const categoryHomeReducer = (state = initialState,action) =>{
    switch (action.type) {
        case types.GET_LIST_HOME_CATEGORY_START:
            return {
                ...state,
                loading: true,
            }
        case types.GET_LIST_HOME_CATEGORY_SUCCESS:
            return {
                ...state,
                loading:false,
                categories: action.payload
            }
        case types.GET_LIST_HOME_CATEGORY_ERROR:
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default categoryHomeReducer;