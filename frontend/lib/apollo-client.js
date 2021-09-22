import { ApolloClient, InMemoryCache } from '@apollo/client';

import { getStrapiURL } from './strapi-helpers';

// path for aws images

// https://portfolio-admin-cms-images.s3.eu-west-2.amazonaws.com/thumbnail_passport_d24aac3b38.jpg

// const bucket = 'portfolio-admin-cms-images';
// const region = 'eu-west-2';
// const size = 'thumbnail_'
// const src = 'passport_d24aac3b38.jpg'
// const a = 'https://' + bucket + '.s3.' + region + '.amazonaws.com/' + size + src;

// apollo client
const client = new ApolloClient({
    uri: getStrapiURL('/graphql'),
    cache: new InMemoryCache(),
});

export default client;
