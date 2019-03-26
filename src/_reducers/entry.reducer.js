import { entryConstants } from '../_constants';

export function entry(state = {}, action) {
  switch (action.type) {
    case entryConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case entryConstants.CREATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case entryConstants.CREATE_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading: false
      };
    case entryConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case entryConstants.GETALL_SUCCESS:
      return {
        ...state,
        entryList: action.entries,
        view: 'list'
      };
    case entryConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case entryConstants.GETONE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case entryConstants.GETONE_SUCCESS:
      return {
        ...state,
        loading: false,
        entryDetail: action.entry,
        view: 'detail'
      };
    case entryConstants.GETONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case entryConstants.EDIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case entryConstants.EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        edit: action.entry,
      };
    case entryConstants.EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case entryConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case entryConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case entryConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case entryConstants.DELETE_REQUEST:
      // add 'deleting:true' property to entry being deleted
      return {
        ...state,
      };
    case entryConstants.DELETE_SUCCESS:
      // remove deleted entry from state
      return {
        ...state
      };
    case entryConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to entry 
      return {
        ...state,
      };
    default:
      return state
  }
}