import { Provider } from 'jotai';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import queryClient from '../services/react-query';
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider>
                <Component {...pageProps} />
            </Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
