import gql from 'graphql-tag';
import Layout from '../../components/layout';
import client from '../../lib/apollo-client';
import Link from 'next/link';
import { getGlobalData } from '../../utils/api';
import { getLocalizedPaths } from '../../utils/localize';

const Help = ({ pageContext, global, title, body }) => {
    return (
        <Layout global={global} pageContext={pageContext}>
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
            {pageContext.localizedPaths.map((p) => {
                return (
                    <div key={p.locale}>
                        {p.href} {p.locale}
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
                        query GetHelps($locale: String) {
                            helps(locale: $locale) {
                                slug
                                locale
                            }
                        }
                    `,
                    variables: { locale },
                });
                return {
                    pages: data.helps,
                    locale,
                };
            })
        )
    ).reduce((acc, item) => {
        item.pages.map((p) => {
            acc.push({
                params: {
                    slug: p.slug,
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
    locales,
    locale,
    defaultLocale,
    params,
}) {
    const globalData = await getGlobalData(locale);
    const { data } = await client.query({
        query: gql`
            query GetHelpArticle($slug: String, $locale: String) {
                helps(locale: $locale, where: { slug: $slug }) {
                    title
                    slug
                    body
                    locale
                    localizations {
                        slug
                        locale
                    }
                }
            }
        `,
        variables: {
            slug: params.slug,
            locale,
        },
    });

    const page = data.helps[0];
    const { title, body } = page;

    const pageContext = {
        locale: page.locale,
        locales,
        defaultLocale,
        slug: params.slug,
        localizations: page.localizations,
        prepend: 'help/',
    };

    const localizedPaths = getLocalizedPaths({ ...pageContext });

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

export default Help;
