export function getStrapiURL(path = '') {
    const url =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:1337'
            : 'http://localhost:1337';

    return `${url}${path}`;
}
