import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  Snippets: [],
  mySnippets: [],

  snippetDetails: {}
};

const SnippetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SNIPPETS:
      state = { ...state, Snippets: [...state?.Snippets, ...action.payload] };
      break;

    case ActionTypes.CLEAR_SNIPPETS:
      state = { ...state, Snippets: [] };
      break;

    case ActionTypes.GET_MY_SNIPPETS:
      state = { ...state, mySnippets: [...state?.mySnippets, ...action.payload] };
      break;

    case ActionTypes.CLEAR_MY_SNIPPETS:
      state = { ...state, mySnippets: [] };
      break;


    case ActionTypes.GET_SNIPPET_DETAIL:
      state = { ...state, snippetDetails: action.payload };
      break;

    case ActionTypes.CLEAR_SNIPPET_DETAIL:
      state = { ...state, snippetDetails: {} };
      break;



    default:
      break;
  }
  return state;
};

export default SnippetReducer;
