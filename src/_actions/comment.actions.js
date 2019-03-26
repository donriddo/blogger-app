import { commentConstants } from '../_constants';
import { commentService } from '../_services';
import { rootActions } from './';

export const commentActions = {
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

        commentService.create(data)
            .then(
                comment => { 
                    dispatch(success(comment));
                    dispatch(rootActions.hideLoader());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(comment) { return { type: commentConstants.CREATE_REQUEST, comment } }
    function success(comment) { return { type: commentConstants.CREATE_SUCCESS, comment } }
    function failure(error) { return { type: commentConstants.CREATE_FAILURE, error } }
}

function getAll(link) {
    return dispatch => {
        dispatch(request());
        dispatch(rootActions.showLoader());

        commentService.getAll(link)
            .then(
                comments => {
                    dispatch(success(comments));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request() { return { type: commentConstants.GETALL_REQUEST } }
    function success(comments) { return { type: commentConstants.GETALL_SUCCESS, comments } }
    function failure(error) { return { type: commentConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());
        dispatch(rootActions.showLoader());

        commentService.getById(id)
            .then(
                comment => {
                    dispatch(success(comment));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request() { return { type: commentConstants.GETONE_REQUEST } }
    function success(comment) { return { type: commentConstants.GETONE_SUCCESS, comment } }
    function failure(error) { return { type: commentConstants.GETONE_FAILURE, error } }
}

function edit(comment) {
    return dispatch => {
        dispatch(request(comment));

        dispatch(success(comment));
    };

    function request(comment) { return { type: commentConstants.EDIT_REQUEST, comment } }
    function success(comment) { return { type: commentConstants.EDIT_SUCCESS, comment } }
    function failure(comment, error) { return { type: commentConstants.EDIT_FAILURE, comment, error } }
}

function update(comment) {
    return dispatch => {
        dispatch(request(comment));
        dispatch(rootActions.showLoader());

        commentService.update(comment)
            .then(
                (comment) => {
                    dispatch(success(comment));
                    dispatch(rootActions.hideLoader());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(comment, error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(comment) { return { type: commentConstants.UPDATE_REQUEST, comment } }
    function success(comment) { return { type: commentConstants.UPDATE_SUCCESS, comment } }
    function failure(comment, error) { return { type: commentConstants.UPDATE_FAILURE, comment, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        dispatch(rootActions.showLoader());

        commentService.delete(id)
            .then(
                comment => {
                    dispatch(success(id));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(id) { return { type: commentConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: commentConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: commentConstants.DELETE_FAILURE, id, error } }
}