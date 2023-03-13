import { combineReducers } from 'redux';
import categoryHomeReducer from './user/home-category';
import loginReducer from './user/login-reducer';
import categoryAdminReducer from './admin/admin-category';
import categoryAllReducer from './admin/all-category';
import gameAdminReducer from './admin/admin-game';
import gameAllReducer from './admin/all-game';
import platformAllReducer from './admin/all-platform';
import gameDetailReducer from './admin/game-detail';
import gameHomeReducer from './user/home-game';

const rootReducer = combineReducers({
    categoryHomeReducer,
    categoryAdminReducer,
    loginReducer,
    categoryAllReducer,
    gameAdminReducer,
    gameAllReducer,
    platformAllReducer,
    gameDetailReducer,
    gameHomeReducer
});

export default rootReducer;

