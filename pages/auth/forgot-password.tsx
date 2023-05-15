// Core Modules
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useRef, useState } from 'react';

// Prime React
import { Image } from 'primereact/image';
import { Captcha } from 'primereact/captcha';
import { Button } from 'primereact/button';

// 3rd Party Modules
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

// Config
import { APP } from '../../app.config';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const ForgotPassword: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const toast: any = useRef(null);

  const showCaptchaResponse = () => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'User Responded' });
  }

  return (
    <>
      <Head>
        <title>{APP.name} - Forgot Password</title>
      </Head>
      <div className='auth-wrapper'>
        <div className='login-wrapper'>
          <div className='logo'>
            <Image src={APP.logo.dark} alt={APP.name} width="250" />
          </div>
          <div className='auth-form'>
            <div className='auth-form-header'>
              <h3>Forgot Password</h3>
              <p>Enter your email to reset your password.</p>
            </div>
            <Formik
              initialValues={{
                email: ''
              }}
              validationSchema={LoginSchema}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ errors, touched, isSubmitting, message }: any) => (
                <Form>
                  <div className='field-wrapper'>
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" type="email" placeholder="john.doe@example.com" />
                    <ErrorMessage name="email">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                  </div>
                  <div className='captcha-wrapper'>
                    <Captcha siteKey={APP.secrets.googleCaptcha} onResponse={showCaptchaResponse} />
                  </div>
                  <div className='action-auth-wrapper'>
                    <Button label="Send Reset Link" loading={loading} loadingIcon="pi pi-spin pi-spinner" iconPos="left" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div >
      </div >
    </>
  )
}

export default ForgotPassword
