import config from 'config';
import { authHeader } from '../_helpers';

export const rootService = {
    getModels,
    fetchModel,
    fetchRecord
};

function getModels() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}`, requestOptions).then(handleResponse);
}

function fetchModel(link) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(link, requestOptions).then(handleResponse);
}

function fetchRecord(link) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(link, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log('Raw response: ', response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            alert(error);
            return Promise.reject(error);
        }

        return data;
    });
}