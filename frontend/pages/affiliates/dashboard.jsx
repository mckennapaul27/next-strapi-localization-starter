import Layout from '../../components/layout';
import useTranslation from 'next-translate/useTranslation';

const Aff = (props) => {
    const { t, lang } = useTranslation('dashboard');

    const example = t('variable-example', { count: 42 });

    return (
        <Layout global={props.global}>
            <div>
                <h1>{t('title')}</h1>
                The count is {example}
            </div>
        </Layout>
    );
};

export default Aff;
