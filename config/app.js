const ENV = require('./env').ENV;

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug ? 'http://localhost:3000' : 'https://sudokulor.herokuapp.com';
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;
