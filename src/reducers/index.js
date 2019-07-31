import { combineReducers } from 'redux';
import VTC_Reducer from './VTC_Reducer';
import LoginReducer from './LoginReducer';

export default combineReducers({
    vtcs: VTC_Reducer,
    login: LoginReducer
});