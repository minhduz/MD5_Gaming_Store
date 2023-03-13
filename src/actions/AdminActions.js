import * as types from "../constansts/admin-const";

// Get all category actions begin
export const getAllCategoryStart = () => {
    return {
        type: types.GET_ALL_CATEGORY_START
    };
};
export const getAllCategorySuccess = (categories) => {
    return {
        type: types.GET_ALL_CATEGORY_SUCCESS,
        payload: categories
    }
}
export const getAllCategoryError = (error) => {
    return {
        type: types.GET_ALL_CATEGORY_ERROR,
        payload: error
    };
};
//End

// Get pagging categories actions begin
export const getListAdminCategoryStart = (pageNumber) => {
    return {
        type: types.GET_LIST_ADMIN_CATEGORY_START,
        payload: pageNumber
    };
};
export const getListAdminCategorySuccess = (pagingCategories, pages) => {
    return {
        type: types.GET_LIST_ADMIN_CATEGORY_SUCCESS,
        payload: {
            pagingCategories,
            pages,
        }
    };
};
export const getListAdminCategoryError = (error) => {
    return {
        type: types.GET_LIST_ADMIN_CATEGORY_ERROR,
        payload: error
    };
};
// End

// Create new category actions begin
export const createNewCategoryStart = (category) => {
    return {
        type: types.CREATE_NEW_CATEGORY_START,
        payload: category
    };
};
export const createNewCategorySuccess = () => {
    return {
        type: types.CREATE_NEW_CATEGORY_SUCCESS,
    };
};
export const createNewCategoryError = (error) => {
    return {
        type: types.CREATE_NEW_CATEGORY_ERROR,
        payload: error
    };
};
// End

// Delete category actions begin
export const deleteCategoryStart = (categoryID,pageNumber) => {

    return {
        type: types.DELETE_CATEGORY_START,
        payload: {
           categoryID,pageNumber 
        }
    };
};
export const deleteCategorySuccess = () => {
    return {
        type: types.DELETE_CATEGORY_SUCCESS,
    };
};
export const deleteCategoryError = (error) => {
    return {
        type: types.DELETE_CATEGORY_ERROR,
        payload: error
    };
};
// End

// Update category actions begin
export const updateCategoryStart = (categoryUpdated,pageNumber) => {
    console.log("pN-action",pageNumber);
    return {
        type: types.UPDATE_CATEGORY_START,
        payload: {
            categoryUpdated, 
            pageNumber,
        }
    };
};
export const updateCategorySuccess = () => {
    return {
        type: types.UPDATE_CATEGORY_SUCCESS,
    };
};
export const updateCategoryError = (error) => {
    return {
        type: types.UPDATE_CATEGORY_ERROR,
        payload: error
    };
};
// End

// Seatch category actions begin 
export const searchCategoryStart = (categoryName) => {
    return {
        type: types.SEARCH_CATEGORY_START,
        payload: categoryName
    };
};
export const searchCategorySuccess = (categories) => {
    return {
        type: types.SEARCH_CATEGORY_SUCCESS,
        payload: categories
    };
};
export const searchCategoryError = (error) => {
    return {
        type: types.SEARCH_CATEGORY_ERROR,
        payload: error
    };
};
// End

// Get pagging games actions begin
export const getListAdminGameStart = (pageNumber) => {
    return {
        type: types.GET_LIST_ADMIN_GAME_START,
        payload: pageNumber
    };
};
export const getListAdminGameSuccess = (pagingGames, pages) => {
    return {
        type: types.GET_LIST_ADMIN_GAME_SUCCESS,
        payload: {
            pagingGames,
            pages,
        }
    };
};
export const getListAdminGameError = (error) => {
    return {
        type: types.GET_ALL_CATEGORY_ERROR,
        payload: error
    };
};
// End


// Create new game actions begin
export const createNewGameStart = (game) => {
    return {
        type: types.CREATE_NEW_GAME_START,
        payload: game
    };
};
export const createNewGameSuccess = () => {
    return {
        type: types.CREATE_NEW_GAME_SUCCESS,
    };
};
export const createNewGameError = (error) => {
    return {
        type: types.CREATE_NEW_GAME_ERROR,
        payload: error
    };
};
// End

// Get all platform actions begin 
export const getAllPlatformStart = () => {
    return {
        type: types.GET_ALL_PLATFORM_START
    };
};
export const getAllPlatformSuccess = (platforms) => {
    return {
        type: types.GET_ALL_PLATFORM_SUCCESS,
        payload: platforms
    }
}
export const getAllPlatformError = (error) => {
    return {
        type: types.GET_ALL_PLATFORM_ERROR,
        payload: error
    };
};
// End

// Get game details actions begin
export const getGameDetailStart = (gameID) => {
    return {
        type: types.GET_GAME_DETAIL_START,
        payload: gameID
    };
};
export const getGameDetailSuccess = (game) => {
    return {
        type: types.GET_GAME_DETAIL_SUCCESS,
        payload: game
    }
}
export const getGameDetailError = (error) => {
    return {
        type: types.GET_GAME_DETAIL_ERROR,
        payload: error
    };
};
// End

// Update game actions begin
export const updateGameStart = (gameUpdated) => {
    return {
        type: types.UPDATE_GAME_START,
        payload: gameUpdated
    };
};
export const updateGameSuccess = () => {
    return {
        type: types.UPDATE_CATEGORY_SUCCESS,
    }
}
export const updateGameError = (error) => {
    return {
        type: types.UPDATE_CATEGORY_ERROR,
        payload: error
    };
};
// End


