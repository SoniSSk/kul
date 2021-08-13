import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import TagManager from 'react-gtm-module';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/lib/style.css';

import theme from '../theme';
import GlobalStyle from '../styled/GlobalStyle';
import '../styles/bootstrap.min.css';
import { store, persistor } from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-55QK4RN' });
    axios
      .get('https://ip2c.org/self')
      .then((res) => {
        if (res.data) {
          const data = String(res.data).toLowerCase().split(';');
          if (data.length) {
            console.log("Location is", data[1]);
          }
        }
      })
      .catch(() => {
        console.log('Location does not detected');
      });
  }, []);

  return (
    <>
      <Head>
        <title>EzyLegal</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalStyle />
            <Component {...pageProps} />
            <ToastContainer />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
