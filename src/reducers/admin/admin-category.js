import * as types from '../../constansts/admin-const'

const initialState = {
    categories: [],
    pageNumber: 0,
    pages: 0,
    loading: false,
    error: null
}

const categoryAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIST_ADMIN_CATEGORY_START:
            return {
                ...state,
                loading: true, 
                pageNumber: action.payload           
            }
        case types.GET_LIST_ADMIN_CATEGORY_SUCCESS:   
        let stateNew =  {
            ...state,
            loading: false,
            categories: action.payload.pagingCategories,
            pages: action.payload.pages
        }
        console.log(stateNew);
        return stateNew;
        case types.GET_LIST_ADMIN_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default categoryAdminReducer;