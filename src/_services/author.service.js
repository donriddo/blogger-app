import config from 'config';
import { authHeader } from '../_helpers';
import { logout } from './author.service';
import { history } from '../_helpers';

export const authorService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

function create(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/authors`, requestOptions).then(handleResponse);
}

function getAll(link) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(link, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/authors/${id}`, requestOptions).then(handleResponse);
}

function update(authors) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(authors)
    };

    return fetch(`${config.apiUrl}/authors/${authors._id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/authors/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log('Raw response: ', response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            history.push('/login');
        }

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            alert(error);
            return Promise.reject(error);
        }

        return data;
    });
}