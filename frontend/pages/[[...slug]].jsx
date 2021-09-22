import gql from 'graphql-tag';
import Layout from '../components/layout';
import client from '../lib/apollo-client';
import Link from 'next/link';
import { getGlobalData } from '../utils/api';
import { getLocalizedPaths } from '../utils/localize';

const DynamicPage = ({ global, pageContext, title, body }) => {
    return (
        <Layout global={global} pageContext={pageContext}>
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
            {pageContext.localizedPaths.map((p) => {
                return (
                    <div key={p.locale}>
                        {p.href}
                        {p.locale}
                    </div>
                );
            })}
            <Link href={`/affiliates/dashboard`}>
                <a>Go to dashboard {'>>>>>>>'}</a>
            </Link>
        </Layout>
    );
};

export async function getStaticPaths({ locales }) {
    const paths = (
        await Promise.all(
            locales.map(async (locale) => {
                const { data } = await client.query({
                    query: gql`
                        query GetAllPages($locale: String) {
                            pages(locale: $locale) {
                                slug
                                locale
                            }
                        }
                    `,
                    variables: { locale },
                });
                return {
                    pages: data.pages,
                    locale,
                };
            })
        )
    ).reduce((acc, item) => {
        item.pages.map((p) => {
            acc.push({
                params: {
                    slug: !p.slug ? false : p.slug.split('/'),
                },
                locale: p.locale,
            });
            return p;
        });
        return acc;
    }, []);

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({
    locale,
    locales,
    defaultLocale,
    params,
}) {
    const globalData = await getGlobalData(locale);

    const { data } = await client.query({
        query: gql`
            query GetSlugPage($slug: String, $locale: String) {
                pages(locale: $locale, where: { slug: $slug }) {
                    title
                    body
                    slug
                    locale
                    localizations {
                        id
                        slug
                        locale
                    }
                }
            }
        `,
        variables: {
            slug: params.slug ? params.slug[0] : '',
            locale,
        },
    });

    const page = data.pages[0];
    const { title, body } = page;

    const pageContext = {
        locale: page.locale,
        localizations: page.localizations,
        locales,
        defaultLocale,
        slug: params.slug ? params.slug[0] : '',
    };

    const localizedPaths = getLocalizedPaths(pageContext);

    return {
        props: {
            global: globalData,
            title,
            body,
            pageContext: {
                ...pageContext,
                localizedPaths,
            },
        },
    };
}

export default DynamicPage;
