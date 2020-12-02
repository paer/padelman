import GoTrue from 'gotrue-js';

// Instantiate the GoTrue auth client with an optional configuration

export const auth = new GoTrue({
    APIUrl: 'https://www.padelman.se/.netlify/identity',
    audience: '',
    setCookie: false,
});