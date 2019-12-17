export const setAuthHeader = (contentType) => {
    let apiHeaders = {
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('_api_key'),
        }
    };

    apiHeaders.headers['Content-Type'] = contentType ? 'multipart/form-data' : 'application/json';

    return apiHeaders;
}