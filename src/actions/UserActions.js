import * as types from '../constansts/user-const'

// HOME CATEGORY ACTIONS START
export const getListHomeCategoryStart = () => {
    return {
        type: types.GET_LIST_HOME_CATEGORY_START,
    };
};
export const getListHomeCategorySuccess = (categories) => {
    return {
        type: types.GET_LIST_HOME_CATEGORY_SUCCESS,
        payload: categories
    };
};
export const getListHomeCategoryError = (error) => {
    return {
        type: types.GET_LIST_HOME_CATEGORY_ERROR,
        payload: error
    };
};
// HOME CATEGORY ACTIONS END

// LOGIN SECTIONS START
export const loginStart = (loginInfo) => {
    return {
        type: types.LOGIN_START,
        payload: loginInfo
    };
};
export const loginSuccess = (loginData) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: loginData
    };
};
export const loginFail = () => {
    return {
        type:types.LOGIN_FAIL,
    }
}
export const loginError = (error) => {
    return {
        type: types.LOGIN_ERROR,
        payload: error
    };
};
// LOGIN ACTIONS END

// GET HOME GAME ACTIONS BEGIN
export const getListHomeGameStart = () => {
    return {
        type: types.GET_HOME_GAME_START,
    };
};
export const getListHomeGameSuccess = (games) => {
    return {
        type: types.GET_HOME_GAME_SUCCESS,
        payload: games
    };
};
export const getListHomeGameError = (error) => {
    return {
        type: types.GET_HOME_GAME_ERROR,
        payload: error
    };
};
// END

// SIGH UP ACTIONS BEGIN
export const signupStart = (signupInfo) => {
    return {
        type: types.SIGNUP_START,
        payload: signupInfo
    };
};
export const signupSuccess = () => {
    return {
        type: types.SIGNUP_SUCCESS
    };
};
export const singupError = (error) => {
    return {
        type: types.SIGNUP_ERROR,
        payload: error
    };
};
// END

// GET GAME BY CATEGORY ACTIONS BEGIN
export const getGameByCategoryStart = (categoryID) => {
    return {
        type: types.GET_GAME_BY_CATEGORY_START,
        payload: categoryID
    };
};
export const getGameByCategorySuccess = (categoryGame) => {
    return {
        type: types.GET_GAME_BY_CATEGORY_SUCCESS,
        payload: categoryGame
    };
};
export const getGameByCategoryError = (error) => {
    return {
        type: types.GET_GAME_BY_CATEGORY_ERROR,
        payload: error
    };
};
//END

