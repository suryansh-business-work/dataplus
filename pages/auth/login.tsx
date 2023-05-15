// Core Module
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useRef, useState } from 'react';

// Prime React
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Captcha } from 'primereact/captcha';

// 3rd Party Modules
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { GoogleLogin } from 'react-google-login';

// Config
import { APP } from '../../app.config';
import { useRouter } from 'next/router';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});

const Login: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [oAuthloading, setoAuthloading] = useState(false);
  const toast: any = useRef(null);
  const router = useRouter()
  
  const responseGoogle = (response: any) => {
    console.log(response);
    setoAuthloading(false)
    if (response.error == 'popup_closed_by_user') {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'Popup Closed By User', life: 3000});
    }
  }

  const onRequestStart: any = () => {
    setoAuthloading(true)
  }

  const showCaptchaResponse = () => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'User Responded' });
  }

  return (
    <>
      <Head>
        <title>{APP.name} - Login</title>
      </Head>
      <div className='auth-wrapper'>
        <Toast ref={toast} />
        <div className='login-wrapper'>
          <div className='logo'>
            <Image src={APP.logo.dark} alt={APP.name} width="250" />
          </div>
          <div className='auth-form'>
            <div className='auth-form-header'>
              <h3>Sign In to {APP.name}</h3>
              <p>New Here? <Link href="/auth/signup">Create an Account</Link></p>
            </div>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ errors, touched, isSubmitting, message }: any) => (
                <div>
                  <Form>
                    <div className='field-wrapper'>
                      <label htmlFor="email">Email</label>
                      <Field id="email" name="email" type="email" placeholder="john.doe@example.com" />
                      <ErrorMessage name="email">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className='field-wrapper'>
                      <label htmlFor="password">Password<Link href="/auth/forgot-password">Forgot Password ?</Link></label>
                      <Field id="password" name="password" type="password" placeholder="Not Just 1234" />
                      <ErrorMessage name="password">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className='captcha-wrapper'>
                      <Captcha siteKey={APP.secrets.googleCaptcha} onResponse={showCaptchaResponse} />
                    </div>
                    <div className='action-auth-wrapper'>
                      <Button label="Login" loading={loading} loadingIcon="pi pi-spin pi-spinner" iconPos="left" />
                    </div>
                  </Form>
                  <div className='o-auth-login'>
                    <div className='o-auth-text'><span className='or-text'>OR</span></div>
                    <div className='g-login'>
                      <GoogleLogin
                        clientId={APP.secrets.googleOAuth}
                        onAutoLoadFinished={() => setoAuthloading(false)}
                        render={renderProps => (
                          <button className="google-auth-btn" onClick={renderProps.onClick} disabled={renderProps.disabled || oAuthloading}>
                            <Image src='/google.svg' alt="Google" />
                            <span>Continue with Google</span>
                            {oAuthloading ? <span className='g-loader'><i className="pi pi-spin pi-spinner"></i></span> : null}
                          </button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        onRequest={onRequestStart}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div >
      </div >
    </>
  )
}

export default Login
