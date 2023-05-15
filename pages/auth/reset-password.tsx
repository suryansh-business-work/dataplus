// Core Module
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useState } from 'react';

// Prime React
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

// 3rd Party Modules
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { APP } from '../../app.config';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Please enter password').min(8, 'Password is too short - should be 8 chars minimum').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Password must have uppercase, lowercase, number and special case character"),
  confirmPassword: Yup.string().required('Please enter confirm password').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup: NextPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>{APP.name} - Reset Password</title>
      </Head>
      <div className='auth-wrapper'>
        <div className='login-wrapper'>
          <div className='logo'>
            <Image src={APP.logo.dark} alt={APP.name} width="250" />
          </div>
          <div className='auth-form'>
            <div className='auth-form-header'>
              <h3>Reset Password</h3>
              <p>Enter the new password</p>
            </div>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={ResetPasswordSchema}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ errors, touched, isSubmitting, message }: any) => (
                <Form>
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
                  <div className='action-auth-wrapper'>
                    <Button label="Reset Password" loading={loading} loadingIcon="pi pi-spin pi-spinner" iconPos="left" />
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

export default Signup
