// const baseUrl = process.env.REACT_APP_BASEURL;
const baseUrl= 'http://localhost:5000/api'

export const fetchSinToken = (endpoint, data, method = 'GET') => {
	
    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

export const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'authToken': token
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'authToken': token,
                // 'Content-Type': 'application/json',
                'Accept': 'application/json'

            },
            body: JSON.stringify( data )
        });

    }
}


export const transactionFetch = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'authToken': token
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'authToken': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            },
            body: JSON.stringify( data )
        });

    }
}
