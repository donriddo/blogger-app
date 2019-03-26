import { blogConstants } from '../_constants';

export function blog(state = {}, action) {
  switch (action.type) {
    case blogConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case blogConstants.CREATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case blogConstants.CREATE_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading: false
      };
    case blogConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case blogConstants.GETALL_SUCCESS:
      return {
        ...state,
        blogList: action.blogs,
        view: 'list'
      };
    case blogConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case blogConstants.GETONE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case blogConstants.GETONE_SUCCESS:
      return {
        ...state,
        loading: false,
        blogDetail: action.blog,
        view: 'detail'
      };
    case blogConstants.GETONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case blogConstants.EDIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case blogConstants.EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        edit: action.blog,
      };
    case blogConstants.EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case blogConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case blogConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case blogConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case blogConstants.DELETE_REQUEST:
      // add 'deleting:true' property to blog being deleted
      return {
        ...state,
      };
    case blogConstants.DELETE_SUCCESS:
      // remove deleted blog from state
      return {
        ...state
      };
    case blogConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to blog 
      return {
        ...state,
      };
    default:
      return state
  }
}