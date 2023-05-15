// Core Modules
import { AppProps } from 'next/app'
import Head from 'next/head'

// Style Document
import '../styles/globals.scss'

// 3rd Party Module
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { APP } from '../app.config';


function App({ Component, pageProps }: AppProps) {
  return (
    <div id='root'>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>{APP.name} App</title>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default App
