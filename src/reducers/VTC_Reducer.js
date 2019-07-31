import { NEW_VTC, FETCH_VTCS, DELETE_VTC, EDIT_VTC, SELECT_VTC } from '../actions/types';

const initialState = {
    vtcs: [],
    vtc: {},
    sel_vtc: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_VTC:
            return {
                ...state,
                vtc: action.payload
            };
        case FETCH_VTCS:
            return {
                ...state,
                vtcs: action.payload
            };
        case DELETE_VTC:
            return {
                ...state,
                vtc: action.payload
            };
        case EDIT_VTC:
            return {
                ...state,
                vtc: action.payload
            };
        case SELECT_VTC:
            return {
                ...state,
                sel_vtc: action.payload
            };
        default:
            return state;
    }
}