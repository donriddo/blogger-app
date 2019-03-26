import { entryConstants } from '../_constants';
import { entryService } from '../_services';
import { rootActions } from './';

export const entryActions = {
    create,
    getOne,
    getAll,
    edit,
    update,
    delete: _delete
};

function create(data) {
    return dispatch => {
        dispatch(request(data));
        dispatch(rootActions.showLoader());

        entryService.create(data)
            .then(
                entry => { 
                    dispatch(success(entry));
                    dispatch(rootActions.hideLoader());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(entry) { return { type: entryConstants.CREATE_REQUEST, entry } }
    function success(entry) { return { type: entryConstants.CREATE_SUCCESS, entry } }
    function failure(error) { return { type: entryConstants.CREATE_FAILURE, error } }
}

function getAll(link) {
    return dispatch => {
        dispatch(request());
        dispatch(rootActions.showLoader());

        entryService.getAll(link)
            .then(
                entries => {
                    dispatch(success(entries));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request() { return { type: entryConstants.GETALL_REQUEST } }
    function success(entries) { return { type: entryConstants.GETALL_SUCCESS, entries } }
    function failure(error) { return { type: entryConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());
        dispatch(rootActions.showLoader());

        entryService.getById(id)
            .then(
                entry => {
                    dispatch(success(entry));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request() { return { type: entryConstants.GETONE_REQUEST } }
    function success(entry) { return { type: entryConstants.GETONE_SUCCESS, entry } }
    function failure(error) { return { type: entryConstants.GETONE_FAILURE, error } }
}

function edit(entry) {
    return dispatch => {
        dispatch(request(entry));

        dispatch(success(entry));
    };

    function request(entry) { return { type: entryConstants.EDIT_REQUEST, entry } }
    function success(entry) { return { type: entryConstants.EDIT_SUCCESS, entry } }
    function failure(entry, error) { return { type: entryConstants.EDIT_FAILURE, entry, error } }
}

function update(entry) {
    return dispatch => {
        dispatch(request(entry));
        dispatch(rootActions.showLoader());

        entryService.update(entry)
            .then(
                (entry) => {
                    dispatch(success(entry));
                    dispatch(rootActions.hideLoader());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(entry, error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(entry) { return { type: entryConstants.UPDATE_REQUEST, entry } }
    function success(entry) { return { type: entryConstants.UPDATE_SUCCESS, entry } }
    function failure(entry, error) { return { type: entryConstants.UPDATE_FAILURE, entry, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        dispatch(rootActions.showLoader());

        entryService.delete(id)
            .then(
                entry => {
                    dispatch(success(id));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(id) { return { type: entryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: entryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: entryConstants.DELETE_FAILURE, id, error } }
}