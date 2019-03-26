import { rootConstants } from '../_constants';
import { rootService } from '../_services';

export const rootActions = {
    getModels,
    selectModel,
    fetchRecord,
    showLoader,
    hideLoader
};

function showLoader() {
    return dispatch => dispatch({ type: rootConstants.SHOW_LOADER });
}

function hideLoader() {
    return dispatch => dispatch({ type: rootConstants.HIDE_LOADER });
} 

function getModels() {
    return dispatch => {
        dispatch(request());
        showLoader();

        rootService.getModels()
            .then(
                models => {
                    dispatch(success(models));
                    hideLoader();
                },
                error => {
                    dispatch(failure(error.toString()));
                    hideLoader();
                }
            );
    };

    function request() { return { type: rootConstants.GET_MODELS_REQUEST } }
    function success(models) { return { type: rootConstants.GET_MODELS_SUCCESS, models } }
    function failure(error) { return { type: rootConstants.GET_MODELS_FAILURE, error } }
}

function selectModel(obj) {
    return dispatch => {
        dispatch({ type: rootConstants.SELECT_MODEL, name: obj.name });
    };
}

function fetchRecord(link) {
    return dispatch => {
        dispatch(request());
        showLoader();

        rootService.fetchModel(link)
            .then(
                record => {
                    dispatch(success(record));
                    hideLoader();
                },
                error => {
                    dispatch(failure(error.toString()));
                    hideLoader();
                }
            );
    };

    function request() { return { type: rootConstants.FETCH_RECORD_REQUEST } }
    function success(record) { return { type: rootConstants.FETCH_RECORD_SUCCESS, record } }
    function failure(error) { return { type: rootConstants.FETCH_RECORD_FAILURE, error } }
}