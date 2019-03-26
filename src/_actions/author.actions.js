import { authorConstants } from '../_constants';
import { authorService } from '../_services';
import { rootActions } from './';

export const authorActions = {
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

        authorService.create(data)
            .then(
                author => { 
                    dispatch(success(author));
                    dispatch(rootActions.hideLoader());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(author) { return { type: authorConstants.CREATE_REQUEST, author } }
    function success(author) { return { type: authorConstants.CREATE_SUCCESS, author } }
    function failure(error) { return { type: authorConstants.CREATE_FAILURE, error } }
}

function getAll(link) {
    return dispatch => {
        dispatch(request());
        dispatch(rootActions.showLoader());

        authorService.getAll(link)
            .then(
                authors => {
                    dispatch(success(authors));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request() { return { type: authorConstants.GETALL_REQUEST } }
    function success(authors) { return { type: authorConstants.GETALL_SUCCESS, authors } }
    function failure(error) { return { type: authorConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());
        dispatch(rootActions.showLoader());

        authorService.getById(id)
            .then(
                author => {
                    dispatch(success(author));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request() { return { type: authorConstants.GETONE_REQUEST } }
    function success(author) { return { type: authorConstants.GETONE_SUCCESS, author } }
    function failure(error) { return { type: authorConstants.GETONE_FAILURE, error } }
}

function edit(author) {
    return dispatch => {
        dispatch(request(author));

        dispatch(success(author));
    };

    function request(author) { return { type: authorConstants.EDIT_REQUEST, author } }
    function success(author) { return { type: authorConstants.EDIT_SUCCESS, author } }
    function failure(author, error) { return { type: authorConstants.EDIT_FAILURE, author, error } }
}

function update(author) {
    return dispatch => {
        dispatch(request(author));
        dispatch(rootActions.showLoader());

        authorService.update(author)
            .then(
                (author) => {
                    dispatch(success(author));
                    dispatch(rootActions.hideLoader());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(author, error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(author) { return { type: authorConstants.UPDATE_REQUEST, author } }
    function success(author) { return { type: authorConstants.UPDATE_SUCCESS, author } }
    function failure(author, error) { return { type: authorConstants.UPDATE_FAILURE, author, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        dispatch(rootActions.showLoader());

        authorService.delete(id)
            .then(
                author => {
                    dispatch(success(id));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(id) { return { type: authorConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: authorConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: authorConstants.DELETE_FAILURE, id, error } }
}