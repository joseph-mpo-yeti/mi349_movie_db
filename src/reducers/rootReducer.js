import { actionTypes } from "../actions/actionTypes";
import {reducer as notificationsReducer} from 'reapop';
import { combineReducers } from "redux";

const initState = {
    loading: false,
    query: "",
    results: {},
    toasts: []
}

const rootReducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_STATUS:
            return {
                ...state,
                loading: action.loading
            };    
        case actionTypes.UPDATE_SEARCH_PARAMS:
            return {
                ...state,
                searchParams: action.searchParams
            }; 
        case actionTypes.UPDATE_CURR_PAGE_NUMBER:
            return {
                ...state,
                currentPage: action.currentPage
            }; 
        case actionTypes.UPDATE_SEARCH_QUERY:
            return {
                ...state,
                query: action.query
            }; 
        case actionTypes.UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                results: action.results
            };
        case actionTypes.CREATE_TOAST:
            return {
                ...state,
                toasts: [
                    ...state.toasts,
                    action.toast
                ]
            }
        default:
            return state;
    }
}

export default combineReducers({
    root: rootReducer,
    notifications: notificationsReducer()
})