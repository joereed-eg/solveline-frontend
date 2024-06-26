import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/custom.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head';
import AuthGuard from '@/utils/AuthGuard';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleOAuthProvider clientId="1039853795806-kr4hn337o2h86j55jgkchmr2k7m6mfcp.apps.googleusercontent.com">
        <Provider store={store.reduxStore}>
          <PersistGate loading={null} persistor={store.persistor}>
            <AuthGuard>
            <Head>
              <title>Solveline</title>
              <link rel="icon" href="/images/logo_icon.png" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
            </AuthGuard>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </>
  )
}
