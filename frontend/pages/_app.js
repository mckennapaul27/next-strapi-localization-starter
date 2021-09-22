import '../styles/globals.css';
import { getGlobalData } from '../utils/api';
import App from 'next/app';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    const globalLocale = await getGlobalData(appContext.router.locale);

    return {
        ...appProps,
        pageProps: {
            global: globalLocale,
        },
    };
};

export default MyApp;
