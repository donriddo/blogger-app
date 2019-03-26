import { commentConstants } from '../_constants';

export function comment(state = {}, action) {
  switch (action.type) {
    case commentConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case commentConstants.CREATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case commentConstants.CREATE_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading: false
      };
    case commentConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case commentConstants.GETALL_SUCCESS:
      return {
        ...state,
        commentList: action.comments,
        view: 'list'
      };
    case commentConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case commentConstants.GETONE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case commentConstants.GETONE_SUCCESS:
      return {
        ...state,
        loading: false,
        commentDetail: action.comment,
        view: 'detail'
      };
    case commentConstants.GETONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case commentConstants.EDIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case commentConstants.EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        edit: action.comment,
      };
    case commentConstants.EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case commentConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case commentConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case commentConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case commentConstants.DELETE_REQUEST:
      // add 'deleting:true' property to comment being deleted
      return {
        ...state,
      };
    case commentConstants.DELETE_SUCCESS:
      // remove deleted comment from state
      return {
        ...state
      };
    case commentConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to comment 
      return {
        ...state,
      };
    default:
      return state
  }
}