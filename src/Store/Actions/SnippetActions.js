
import ActionTypes from './ActionTypes';

const getSnippetsList = payload => {
    return {
        type: ActionTypes.GET_SNIPPETS,
        payload: payload,
    };
};

const clearSnippetsList = () => {
    return {
        type: ActionTypes.CLEAR_SNIPPETS,
    };
};

const getSnippetDetail = payload => {
    return {
        type: ActionTypes.GET_SNIPPET_DETAIL,
        payload: payload,
    };
}

const clearSnippetDetail = () => {
    return {
        type: ActionTypes.CLEAR_SNIPPET_DETAIL,
    };
}

const getMySnippets = payload => {
    return {
        type: ActionTypes.GET_MY_SNIPPETS,
        payload: payload,
    };
}

const clearMySnippets = () => {
    return {
        type: ActionTypes.CLEAR_MY_SNIPPETS,
    };
}

const deleteSnippet = payload => {
    return {
        type: ActionTypes.DELETE_SNIPPET,
        payload: payload,
    };
}

const getSearchedValue = payload => {
    return {
        type: ActionTypes.GET_SEARCHED_VALUE,
        payload: payload,
    };
}

const clearSearchedValue = () => {
    return {
        type: ActionTypes.CLEAR_SEARCHED_VALUE,
        
    };
}


export {clearSearchedValue, getSearchedValue, deleteSnippet,  getSnippetsList, clearSnippetsList, getSnippetDetail, clearSnippetDetail, getMySnippets, clearMySnippets };

