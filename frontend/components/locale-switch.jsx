import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function LocaleSwitch({ pageContext }) {
    const isMounted = useRef(false);
    const select = useRef();
    const router = useRouter();
    const [locale, setLocale] = useState();
    const [showing, setShowing] = useState(false);

    const handleLocaleChange = async (selectedLocale) => {
        Cookies.set('NEXT_LOCALE', selectedLocale);
        setLocale(selectedLocale);
    };

    const handleLocaleChangeRef = useRef(handleLocaleChange);

    useEffect(() => {
        const localeCookie = Cookies.get('NEXT_LOCALE');
        if (!localeCookie) {
            handleLocaleChangeRef.current(router.locale);
        }
        setLocale(localeCookie || router.locale);
        return () => {
            isMounted.current = true;
        };
    }, [locale, router, pageContext]);

    return (
        <div>
            <h1>Navbar</h1>
            {pageContext.localizedPaths.map(({ href, locale }) => {
                return (
                    <Link
                        href={href}
                        locale={locale}
                        key={locale}
                        role={'option'}
                        passHref>
                        <a onClick={() => handleLocaleChange(locale)}>
                            {locale}
                            {'   '}
                        </a>
                    </Link>
                );
            })}
        </div>
    );
}
