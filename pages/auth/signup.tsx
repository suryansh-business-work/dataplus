// Core Module
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useRef, useState } from 'react';

// Prime React
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { Captcha } from 'primereact/captcha';

// 3rd Party Modules
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { GoogleLogin } from 'react-google-login';

// Data
import { countryData } from '../data/_country-data';

// Config
import { APP } from '../../app.config';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid First Name')
    .max(40)
    .required('Please enter First Name'),
  lastName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid Last Name')
    .max(40)
    .required('Please enter Last Name'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Please enter Email'),
  password: Yup.string().required('Please enter password').min(8, 'Password is too short - should be 8 chars minimum').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Password must have uppercase, lowercase, number and special case character"),
  confirmPassword: Yup.string().required('Please enter confirm password').oneOf([Yup.ref('password'), null], 'Passwords must match'),
  country: Yup.object().shape({
    name: Yup.string().required("Please select country"),
    code: Yup.string().required("Please select country"),
  }),
  termsCheck: Yup.boolean().required("The terms and conditions must be accepted.").oneOf([true], "The terms and conditions must be accepted.")
});

const Signup: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [oAuthloading, setoAuthloading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [termsCheck, setTermsCheck] = useState({});
  const toast: any = useRef(null);

  const responseGoogle = (response: any) => {
    console.log(response);
    setoAuthloading(false)
    if (response.error == 'popup_closed_by_user') {
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Popup Closed By User', life: 3000 });
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
        <title>{APP.name} - Signup</title>
      </Head>
      <div className='auth-wrapper'>
        <Toast ref={toast} />
        <div className='login-wrapper'>
          <div className='logo'>
            <Image src={APP.logo.dark} alt={APP.name} width="250" />
          </div>
          <div className='auth-form'>
            <div className='auth-form-header'>
              <h3>Sign Up to {APP.name}</h3>
              <p>Already have an account? <Link href="/auth/login"> Sign in here </Link></p>
            </div>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                country: { "name": "Select your country", "code": "" },
                termsCheck: false
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ errors, touched, isSubmitting, message }: any) => (
                <Form>
                  <div className='field-wrapper-row'>
                    <div className='field-wrapper'>
                      <label htmlFor="firstName">First Name</label>
                      <Field id="firstName" name="firstName" type="text" placeholder="John" />
                      <ErrorMessage name="firstName">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className='field-wrapper'>
                      <label htmlFor="lastName">Last Name</label>
                      <Field id="lastName" name="lastName" type="text" placeholder="Doe" />
                      <ErrorMessage name="lastName">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className='field-wrapper'>
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" type="email" placeholder="john.doe@example.com" />
                    <ErrorMessage name="email">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                  </div>
                  <div className='field-wrapper-row'>
                    <div className='field-wrapper'>
                      <label htmlFor="password">Password</label>
                      <Field id="password" name="password" type="password" placeholder="Not Just 1234">
                        {({ field }: any) => (
                          <Password {...field} toggleMask feedback={false} />
                        )}
                      </Field>
                      <ErrorMessage name="password">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className='field-wrapper'>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Field id="confirmPassword" name="confirmPassword" type="password" placeholder="Not Just 1234">
                        {({ field }: any) => (
                          <Password {...field} toggleMask feedback={false} />
                        )}
                      </Field>
                      <ErrorMessage name="confirmPassword">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className='field-wrapper'>
                    <label htmlFor="location">Select Country</label>
                    <Dropdown onChange={(e: any) => setSelectedCountry(e.target.value)} value={selectedCountry} id="location" name="country" filterBy="name" options={countryData} optionLabel="name" />
                    <ErrorMessage name="location">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                  </div>
                  <div className='field-wrapper checkbox'>
                    <Checkbox id="termsCheck" name="termsCheck" checked={termsCheck} onChange={setTermsCheck} />
                    <label htmlFor="termsCheck">
                      I accept all &nbsp; <Link href="/product/terms"> Terms and Conditions </Link>
                    </label>
                  </div>
                  <div className='captcha-wrapper'>
                    <Captcha siteKey={APP.secrets.googleCaptcha} onResponse={showCaptchaResponse} />
                  </div>
                  <div className='action-auth-wrapper'>
                    <Button label="Signup" loading={loading} loadingIcon="pi pi-spin pi-spinner" iconPos="left" />
                  </div>
                </Form>
              )}
            </Formik>
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
        </div>
      </div>
    </>
  )
}

export default Signup
