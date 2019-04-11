export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// ======
function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds,
    };
}

export function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.token,
        user
    };
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: message,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('deeep.public.token');
        localStorage.removeItem('deeep.user');
        document.cookie = 'id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    return (dispatch) => {
        dispatch(requestLogin(creds));
        return new Promise((resolve, reject) => {
            const person = {
                "superAdmin": true,
                "blocked": false,
                "approved": true,
                "onBoarding": false,
                "_id": "5c07c1143b0bc4001324132b",
                "firstName": "Joao Gabriel Lima",
                "lastName": "Joao Gabriel Lima",
                "emailAddress": "joao.gabriel@deeep.marketing",
                "createdAt": "2019-01-28T14:57:49.071Z",
                "id": "5c07c1143b0bc4001324132b",
                "token": "46aff450-f887-11e8-8b99-1d7e4d96fb76"
            };
            localStorage.setItem('deeep.user', JSON.stringify(person));
            localStorage.setItem('deeep.public.token', person.token);
            dispatch(receiveLogin(person));
            return resolve()
        });
    };
}
