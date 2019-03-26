import { rootConstants } from '../_constants';

export function root(state = {}, action) {
  switch (action.type) {
    case rootConstants.SHOW_LOADER:
      return {
        ...state,
        showLoader: true
      }
    case rootConstants.HIDE_LOADER:
      return {
        ...state,
        showLoader: false
      }
    case rootConstants.GET_MODELS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case rootConstants.GET_MODELS_SUCCESS:
      return {
          ...state,
          loading: false,
          models: action.models.data
      };
    case rootConstants.GET_MODELS_FAILURE:
      return {
          ...state,
          loading: false,
          error: action.error
      };
    case rootConstants.FETCH_MODEL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case rootConstants.FETCH_MODEL_SUCCESS:
      return {
          ...state,
          currentModelName: action.name,
          currentModel: action.model,
          view: 'list'
      };
    case rootConstants.SELECT_MODEL:
      return {
          ...state,
          currentModelName: action.name,
      };
    case rootConstants.FETCH_MODEL_FAILURE:
      return {
          ...state,
          loading: false,
          error: action.error
      };
    case rootConstants.FETCH_RECORD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case rootConstants.FETCH_RECORD_SUCCESS:
      return {
          ...state,
          record: action.record,
          view: 'detail'
      };
    case rootConstants.FETCH_RECORD_FAILURE:
      return {
          ...state,
          loading: false,
          error: action.error
      };
    default:
      return state
  }
}