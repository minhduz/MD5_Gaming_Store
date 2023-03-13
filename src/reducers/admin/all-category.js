import * as types from '../../constansts/admin-const'

const initialState = {
    categories: [],
    listSearch: [],
    loading: false,
    error: null
};


const categoryAllReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_CATEGORY_START:
        case types.GET_ALL_CATEGORY_START:
        case types.DELETE_CATEGORY_START:
        case types.UPDATE_CATEGORY_START:
        case types.SEARCH_CATEGORY_START:
            return {
                ...state,
                loading: true,
            }
        case types.GET_ALL_CATEGORY_SUCCESS:
        return {
            ...state,
            loading: false,
            categories: action.payload
        }
        case types.SEARCH_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                listSearch: action.payload
            }
        case types.CREATE_NEW_CATEGORY_SUCCESS:
        case types.DELETE_CATEGORY_SUCCESS:
        case types.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case types.DELETE_CATEGORY_ERROR:
        case types.CREATE_NEW_CATEGORY_ERROR:
        case types.GET_ALL_CATEGORY_ERROR:
        case types.UPDATE_CATEGORY_ERROR:
        case types.SEARCH_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default categoryAllReducer;


