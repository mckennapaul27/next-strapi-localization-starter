import gql from 'graphql-tag';
import client from '../lib/apollo-client';

export const getGlobalData = async (locale) => {
    const { data } = await client.query({
        query: gql`
            query GetGlobal($locale: String) {
                global(locale: $locale) {
                    locale
                    navbar {
                        links {
                            text
                            url
                            newTab
                        }
                    }
                }
            }
        `,
        variables: {
            locale,
        },
    });

    return data.global;
};
