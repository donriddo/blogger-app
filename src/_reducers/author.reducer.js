import { authorConstants } from '../_constants';

export function author(state = {}, action) {
  switch (action.type) {
    case authorConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case authorConstants.CREATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case authorConstants.CREATE_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading: false
      };
    case authorConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case authorConstants.GETALL_SUCCESS:
      return {
        ...state,
        authorList: action.authors,
        view: 'list'
      };
    case authorConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case authorConstants.GETONE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case authorConstants.GETONE_SUCCESS:
      return {
        ...state,
        loading: false,
        authorDetail: action.author,
        view: 'detail'
      };
    case authorConstants.GETONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case authorConstants.EDIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case authorConstants.EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        edit: action.author,
      };
    case authorConstants.EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case authorConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case authorConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case authorConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case authorConstants.DELETE_REQUEST:
      // add 'deleting:true' property to author being deleted
      return {
        ...state,
      };
    case authorConstants.DELETE_SUCCESS:
      // remove deleted author from state
      return {
        ...state
      };
    case authorConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to author 
      return {
        ...state,
      };
    default:
      return state
  }
}