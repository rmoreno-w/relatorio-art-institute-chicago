import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='pt-BR'>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&family=Montserrat:wght@355;400;600&display=swap'
                    rel='stylesheet'
                />

                <link rel='icon' href='/favicon.ico' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
