import Head from 'next/head';

function Home() {
    return (
        <>
            <Head>
                <title>Relatório Art Institute Chicago</title>
            </Head>
            <main className='h-screen bg-gray-800 text-gray-100 flex flex-col'>
                <header className='flex items-center justify-center h-20 bg-gray-900 text-gray-100'>
                    Cabecalho maroto
                </header>
                <article className='flex items-center justify-center h-full bg-gray-800 text-gray-100'>
                    OH YES baby
                </article>
            </main>
        </>
    );
}

export default Home;
