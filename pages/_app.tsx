import type { AppProps } from 'next/app';
import Meta from '@components/atoms/Meta';
import { Provider } from "react-redux";
import { persistor, store } from 'src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Importing all the global styles & styles from ant design
import '../styles/globals.css';
import 'antd/dist/antd.css';
import { Toaster } from 'react-hot-toast';
// Create a client
const queryClient = new QueryClient()
import '@aws-amplify/ui-react/styles.css';
import awsconfig from '../src/aws-exports';

import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';

const configureAmplify = () => {
  // const urlsIn = awsconfig.oauth.redirectSignIn.split(',')
  // const urlsOut = awsconfig.oauth.redirectSignOut.split(',')
  // const currentHost = location.protocol + '//' + location.host
  // const isCurrentHost = (url: string) => url.includes(currentHost)
  // const newUrls = {
  //   redirectSignIn: urlsIn.find(url => isCurrentHost(url)),
  //   redirectSignOut: urlsOut.find(url => isCurrentHost(url))
  // }
  // const updateConfig = {
  //   ...awsconfig,
  //   oauth: {
  //     ...awsconfig.oauth,
  //     ...newUrls
  //   }
  // }
  Amplify.configure(awsconfig)
}


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    configureAmplify()
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Authenticator.Provider>
          <QueryClientProvider client={queryClient}>
            <Meta />
            <Toaster />
            <Component {...pageProps} />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </Authenticator.Provider>
      </PersistGate>
    </Provider >
  );
}

export default MyApp;
