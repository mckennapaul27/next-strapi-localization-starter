import { useRouter } from 'next/router';
import LocaleSwitch from './locale-switch';
import Link from 'next/link';

export default function Navbar({ pageContext, navbar }) {
    const router = useRouter();
    return (
        <div>
            <h2>Navbar start</h2>
            {navbar[0].links.map((link) => {
                return (
                    <Link key={link.url} href={link.url} locale={router.locale}>
                        <a>
                            {link.text}
                            {'   '}
                        </a>
                    </Link>
                );
            })}
            <h2>Navbar end</h2>
            <LocaleSwitch pageContext={pageContext} />
        </div>
    );
}
