export const formatSlug = (slug, locale, defaultLocale) =>
    locale === defaultLocale ? `/${slug}` : `/${locale}/${slug}`;

const check = (prepend) => (prepend ? prepend : '');

export const getLocalizedPaths = (pageContext) => {
    const { locales, defaultLocale, localizations, slug, prepend } =
        pageContext;

    const paths = locales.map((locale) => {
        if (localizations.length === 0)
            return {
                locale,
                href: formatSlug(
                    `${check(prepend)}${slug}`,
                    locale,
                    defaultLocale
                ),
            };
        return {
            locale,
            href: localizePath({ ...pageContext, locale }), // object assign using spread
        };
    });
    return paths;
};

export const localizePath = (pageContext) => {
    const { locale, defaultLocale, localizations, slug, prepend } = pageContext;
    let localeFound = localizations.find((a) => a.locale === locale);
    if (localeFound)
        return formatSlug(
            `${check(prepend)}${localeFound.slug}`,
            locale,
            defaultLocale
        );
    else return formatSlug(`${check(prepend)}${slug}`, locale, defaultLocale);
};
