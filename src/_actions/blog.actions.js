import { blogConstants } from '../_constants';
import { blogService } from '../_services';
import { rootActions } from './';

export const blogActions = {
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

        blogService.create(data)
            .then(
                blog => { 
                    dispatch(success(blog));
                    dispatch(rootActions.hideLoader());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(blog) { return { type: blogConstants.CREATE_REQUEST, blog } }
    function success(blog) { return { type: blogConstants.CREATE_SUCCESS, blog } }
    function failure(error) { return { type: blogConstants.CREATE_FAILURE, error } }
}

function getAll(link) {
    return dispatch => {
        dispatch(request());
        dispatch(rootActions.showLoader());

        blogService.getAll(link)
            .then(
                blogs => {
                    dispatch(success(blogs));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request() { return { type: blogConstants.GETALL_REQUEST } }
    function success(blogs) { return { type: blogConstants.GETALL_SUCCESS, blogs } }
    function failure(error) { return { type: blogConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());
        dispatch(rootActions.showLoader());

        blogService.getById(id)
            .then(
                blog => {
                    dispatch(success(blog));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request() { return { type: blogConstants.GETONE_REQUEST } }
    function success(blog) { return { type: blogConstants.GETONE_SUCCESS, blog } }
    function failure(error) { return { type: blogConstants.GETONE_FAILURE, error } }
}

function edit(blog) {
    return dispatch => {
        dispatch(request(blog));

        dispatch(success(blog));
    };

    function request(blog) { return { type: blogConstants.EDIT_REQUEST, blog } }
    function success(blog) { return { type: blogConstants.EDIT_SUCCESS, blog } }
    function failure(blog, error) { return { type: blogConstants.EDIT_FAILURE, blog, error } }
}

function update(blog) {
    return dispatch => {
        dispatch(request(blog));
        dispatch(rootActions.showLoader());

        blogService.update(blog)
            .then(
                (blog) => {
                    dispatch(success(blog));
                    dispatch(rootActions.hideLoader());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(blog, error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(blog) { return { type: blogConstants.UPDATE_REQUEST, blog } }
    function success(blog) { return { type: blogConstants.UPDATE_SUCCESS, blog } }
    function failure(blog, error) { return { type: blogConstants.UPDATE_FAILURE, blog, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        dispatch(rootActions.showLoader());

        blogService.delete(id)
            .then(
                blog => {
                    dispatch(success(id));
                    dispatch(rootActions.hideLoader());
                },
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(rootActions.hideLoader());
                }
            );
    };

    function request(id) { return { type: blogConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: blogConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: blogConstants.DELETE_FAILURE, id, error } }
}