import { actionTypes } from "../actions/actionTypes";

const initState = {
    loading: false,
    query: "",
    numberOfPages: 0,
    currentPage: 0,
    results: {}
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
        default:
            return state;
    }
}

export default rootReducer;