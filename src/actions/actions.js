import { actionTypes } from "./actionTypes"

export const updateParamsAction = (searchParams) => {
    return {
        type: actionTypes.UPDATE_SEARCH_PARAMS,
        searchParams
    }
}

export const updateResultsAction = (results) => {
    return {
        type: actionTypes.UPDATE_SEARCH_RESULTS,
        results
    }
}

export const updateStatusAction = (loading) => {
    return {
        type: actionTypes.UPDATE_STATUS,
        loading
    }
}

export const updatePageAction = (currentPage) => {
    return {
        type: actionTypes.UPDATE_CURR_PAGE_NUMBER,
        currentPage
    }
}

export const updateQueryAction = (query) => {
    return {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        query
    }
}

export const createToastAction = (toast) => {
    return {
        type: actionTypes.CREATE_TOAST,
        toast
    }
}