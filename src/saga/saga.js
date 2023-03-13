import * as typesUser from '../constansts/user-const'
import * as typesAdmin from '../constansts/admin-const'

import { take, takeEvery, takeLatest, put, all, delay, fork, call } from 'redux-saga/effects';

import {
    getListHomeCategorySuccess,
    getListHomeCategoryError,
    loginSuccess,
    loginFail,
    loginError,
    getListHomeGameSuccess,
    getListHomeGameError,
    signupSuccess,
    singupError,
    getGameByCategorySuccess,
    getGameByCategoryError
} from '../actions/UserActions';

import {
    getListAdminCategorySuccess,
    getListAdminCategoryError,
    getAllCategorySuccess,
    getAllCategoryError,
    createNewCategorySuccess,
    createNewCategoryError,
    deleteCategorySuccess,
    deleteCategoryError,
    updateCategoryError,
    updateCategorySuccess,
    searchCategorySuccess,
    searchCategoryError,
    getListAdminGameSuccess,
    getListAdminGameError,
    createNewGameSuccess,
    createNewGameError,
    getAllPlatformSuccess,
    getAllPlatformError,
    getGameDetailSuccess,
    getGameDetailError,
    updateGameSuccess,
    updateGameError
} from '../actions/AdminActions';

import {
    getHomeCategoryApi,
    loginApi,
    getHomeGameApi,
    signupApi,
    getGameCategoryApi
} from '../api/UserApi'

import {
    getAdminCategoryApi,
    getAllCategoryApi,
    createCategoryApi,
    deleteCategoryApi,
    updateCategoryApi,
    searchCategoryApi,
    getAdminGameApi,
    createGameApi,
    getPlatformApi,
    getGameDetailApi,
    updateGameApi,
} from '../api/AdminApi'

// Functions call api and return the results
function* onLoadCategoryHomeStartAsync() {
    try {
        const response = yield call(getHomeCategoryApi)
        if (response.status === 200) {
            yield delay(500);
            yield put(getListHomeCategorySuccess(response.data))
        }
    } catch (error) {
        yield put(getListHomeCategoryError(error.response.data))
        console.log("error");
    }
}

function* onLoadCategoryAdminStartAsync(pageNumber) {
    try {
        const response = yield call(getAdminCategoryApi, pageNumber)
        if (response.status === 200) {
            yield put(getListAdminCategorySuccess(response.data.category, response.data.totalPages))
        }
    } catch (error) {
        yield put(getListAdminCategoryError(error.response.data))
        console.log("error");
    }
}

function* onLoadCategoryAllStartAsync() {
    try {
        const response = yield call(getAllCategoryApi)
        if (response.status === 200) {
            yield put(getAllCategorySuccess(response.data))
        }
    } catch (error) {
        yield put(getAllCategoryError(error.response.data))
        console.log("error");
    }
}

function* onLoadLoginStartAsync(loginInfo) {
    try {
        const response = yield call(loginApi, loginInfo)
        if (response.status === 200) {
            yield put(loginSuccess(response.data))
            yield localStorage.setItem('user', JSON.stringify(response.data));
        }
    } catch (error) {
        if (error.response.status === 403) {
            yield put(loginFail())
        }
        yield put(loginError(error.response.data))
        console.log(error);
    }
}

function* onCreateCategoryStartAsync({ payload }) {
    try {
        const response = yield call(createCategoryApi, payload)
        if (response.status === 200) {
            const res = yield call(getAdminCategoryApi, 0)
            if(res.status === 200) {
                console.log(res.data.category);
                yield put(getListAdminCategorySuccess(res.data.category, res.data.totalPages))
            }
            yield put(createNewCategorySuccess(response.data))
        }
    } catch (error) {
        yield put(createNewCategoryError(error.response.data))
        console.log(error);
    }
}

function* onDeleteCategoryStartAsync({payload}) {
    try {
        const response = yield call(deleteCategoryApi, payload.categoryID)
        if (response.status === 200) {
            const res = yield call(getAdminCategoryApi, payload.pageNumber)
            if(res.status === 200) {
                console.log(res.data.category);
                yield put(getListAdminCategorySuccess(res.data.category, res.data.totalPages))
            }
            yield put(deleteCategorySuccess(response.data))
        }
    } catch (error) {
        yield put(deleteCategoryError(error.response.data))
        console.log(error);
    }
}

function* onUpdateCategoryStartAsync({ payload }) {
    try {
        const response = yield call(updateCategoryApi, payload.categoryUpdated)
        if (response.status === 200) {
            const res = yield call(getAdminCategoryApi, payload.pageNumber)
            if(res.status === 200) {
                console.log(res.data.category);
                yield put(getListAdminCategorySuccess(res.data.category, res.data.totalPages))
            }
            yield put(updateCategorySuccess(response.data))
        }
    } catch (error) {
        yield put(updateCategoryError(error.response.data))
        console.log(error);
    }
}

function* onSearchCategoryStartAsync({ payload }) {
    try {
        const response = yield call(searchCategoryApi, payload)
        if (response.status === 200) {
            console.log("saga", response.data);
            yield put(searchCategorySuccess(response.data))
        }
    } catch (error) {
        yield put(searchCategoryError(error.response.data))
        console.log(error);
    }
}

function* onLoadGameAdminStartAsync(pageNumber) {
    try {
        const response = yield call(getAdminGameApi, pageNumber)
        if (response.status === 200) {
            yield put(getListAdminGameSuccess(response.data.games, response.data.totalPages))
        }
    } catch (error) {
        yield put(getListAdminGameError(error.response.data))
        console.log("error");
    }
}

function* onCreateGameStartAsync({ payload }) {
    try {
        const response = yield call(createGameApi, payload)
        console.log("saga", payload);
        if (response.status === 200) {
            yield put(createNewGameSuccess(response.data))
        }
    } catch (error) {
        yield put(createNewGameError(error.response.data))
        console.log(error);
    }
}

function* onLoadPlatformStartAsync() {
    try {
        const response = yield call(getPlatformApi)
        if (response.status === 200) {
            yield put(getAllPlatformSuccess(response.data))
        }
    } catch (error) {
        yield put(getAllPlatformError(error.response.data))
        console.log("error");
    }
}

function* onLoadGameDetailStartAsync(gameID) {
    try {
        const response = yield call(getGameDetailApi, gameID)
        if (response.status === 200) {
            console.log(response.data);
            yield put(getGameDetailSuccess(response.data))
        }
    } catch (error) {
        yield put(getGameDetailError(error.response.data))
        console.log(error);
    }
}

function* onUpdateGameStartAsync({ payload }) {
    try {
        const response = yield call(updateGameApi, payload)
        if (response.status === 200) {
            yield put(updateGameSuccess(response.data))
        }
    } catch (error) {
        yield put(updateGameError(error.response.data))
        console.log(error);
    }
}

function* onLoadGameHomeStartAsync() {
    try {
        const response = yield call(getHomeGameApi)
        if (response.status === 200) {
            yield put(getListHomeGameSuccess(response.data))
        }
    } catch (error) {
        yield put(getListHomeGameError(error.response.data))
        console.log(error);
    }
}

function* onLoadSignupStartAsync(signupInfo) {
    try {
        const response = yield call(signupApi, signupInfo)
        if (response.status === 200) {
            yield put(signupSuccess())
        }
    } catch (error) {
        yield put(singupError(error.response.data))
        console.log(error);
    }
}

function* onLoadGameCategoryStartAsync({payload}){
    try {
        const response = yield call(getGameCategoryApi, payload)
        if (response.status === 200) {
            yield put(getGameByCategorySuccess(response.data))
        }
    } catch (error) {
        yield put(getGameByCategoryError(error.response.data))
        console.log(error);
    }
}

// End


// Functions call generator function to call api
function* onLoadCategoryHome() {
    yield takeEvery(typesUser.GET_LIST_HOME_CATEGORY_START, onLoadCategoryHomeStartAsync)
}

function* onLoadCategoryAdmin() {
    while (true) {
        const { payload: pageNumber } = yield take(typesAdmin.GET_LIST_ADMIN_CATEGORY_START)
        yield call(onLoadCategoryAdminStartAsync, pageNumber);
    }
}

function* onLoadCategoryAll() {
    yield takeEvery(typesAdmin.GET_ALL_CATEGORY_START, onLoadCategoryAllStartAsync)
}

function* onLoadLogin() {
    while (true) {
        const { payload: loginInfo } = yield take(typesUser.LOGIN_START)
        yield call(onLoadLoginStartAsync, loginInfo)
    }
}

function* onCreateCategory() {
    yield takeLatest(typesAdmin.CREATE_NEW_CATEGORY_START, onCreateCategoryStartAsync)
}

function* onDeleteCategory() {
    yield takeLatest(typesAdmin.DELETE_CATEGORY_START, onDeleteCategoryStartAsync)
}

function* onUpdateCategory() {
    yield takeLatest(typesAdmin.UPDATE_CATEGORY_START, onUpdateCategoryStartAsync)
}

function* onSearchCategory() {
    yield takeLatest(typesAdmin.SEARCH_CATEGORY_START, onSearchCategoryStartAsync)
}

function* onLoadGameAdmin() {
    while (true) {
        const { payload: pageNumber } = yield take(typesAdmin.GET_LIST_ADMIN_GAME_START)
        yield call(onLoadGameAdminStartAsync, pageNumber);
    }
}

function* onCreateGame() {
    yield takeLatest(typesAdmin.CREATE_NEW_GAME_START, onCreateGameStartAsync)
}

function* onLoadPlatform() {
    yield takeEvery(typesAdmin.GET_ALL_PLATFORM_START, onLoadPlatformStartAsync)
}

function* onLoadGameDetails() {
    while (true) {
        const { payload: gameID } = yield take(typesAdmin.GET_GAME_DETAIL_START)
        yield call(onLoadGameDetailStartAsync, gameID)
    }
}

function* onUpdateGame() {
    yield takeLatest(typesAdmin.UPDATE_GAME_START, onUpdateGameStartAsync)
}

function* onLoadGameHome() {
    yield takeEvery(typesUser.GET_HOME_GAME_START, onLoadGameHomeStartAsync)
}

function* onLoadSignup() {
    while (true) {
        const { payload: signupInfo } = yield take(typesUser.SIGNUP_START)
        yield call(onLoadSignupStartAsync, signupInfo)
    }
}

function* onLoadGameCategory() {
    yield takeLatest(typesUser.GET_GAME_BY_CATEGORY_START, onLoadGameCategoryStartAsync)
}

// End



const homeSaga = [
    fork(onLoadCategoryHome),
    fork(onLoadCategoryAdmin),
    fork(onLoadLogin),
    fork(onLoadCategoryAll),
    fork(onCreateCategory),
    fork(onDeleteCategory),
    fork(onUpdateCategory),
    fork(onSearchCategory),
    fork(onLoadGameAdmin),
    fork(onCreateGame),
    fork(onLoadPlatform),
    fork(onLoadGameDetails),
    fork(onUpdateGame),
    fork(onLoadGameHome),
    fork(onLoadSignup),
    fork(onLoadGameCategory)
]

export default function* rootSaga() {
    yield all([...homeSaga])
}