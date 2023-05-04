export const isNullOrBlank = (str) =>
    str === undefined || str === null || typeof str !== 'string' || str.match(/^ *$/) !== null;
