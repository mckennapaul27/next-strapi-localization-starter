import { useRouter } from 'next/router';
import { formatSlug } from '../utils/localize';
import Navbar from './navbar';

const Layout = ({ children, pageContext, global }) => {
    const router = useRouter();
    const { locale, locales, defaultLocale, asPath } = router;
    const page = pageContext // if there is no pageConext because it is SSR page or non-CMS page
        ? pageContext
        : {
              locale,
              locales,
              defaultLocale,
              slug: formatSlug(asPath.slice(1), locale, defaultLocale), // slice(1) because asPath includes /
              localizedPaths: locales.map((loc) => ({
                  locale: loc,
                  href: formatSlug(asPath.slice(1), loc, defaultLocale),
              })),
          };

    return (
        <div>
            <Navbar pageContext={page} navbar={global.navbar} />
            {children}
        </div>
    );
};

export default Layout;
