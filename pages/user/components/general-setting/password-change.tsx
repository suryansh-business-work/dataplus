import type { NextPage } from 'next'
import { Button } from 'primereact/button'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Image from 'next/image';
import { Password } from 'primereact/password';
import * as Yup from "yup";

const PasswordChange: NextPage = () => {
  const PasswordSchema = Yup.object().shape({
    password: Yup.string().required('Please enter password').min(8, 'Password is too short - should be 8 chars minimum').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must have uppercase, lowercase, number and special case character"),
    newPassword: Yup.string().required('Please enter new password').min(8, 'Password is too short - should be 8 chars minimum').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must have uppercase, lowercase, number and special case character"),
    confirmNewPassword: Yup.string().required('Please confirm new password').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  return (
    <div className='component-card'>
      <div className='component-heading-with-action'>
        <div className='heading'>
          <h3>Password Change</h3>
        </div>
      </div>
      <div className='component-card-body'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='user-form-wrapper'>
                <Formik
                  initialValues={{
                    password: '',
                    newPassword: '',
                    confirmNewPassword: '',
                  }}
                  validationSchema={PasswordSchema}
                  onSubmit={(values) => {
                    console.log(values)
                  }}
                >
                  <Form>
                    <div className='container-fluid'>
                      <div className='row'>
                        <div className='col-4'>
                          <div className='field-wrapper'>
                            <label htmlFor="password">Old Password</label>
                            <Field id="password" name="password" type="password" placeholder="Not Just 1234">
                              {({ field }: any) => (
                                <Password {...field} toggleMask feedback={false} />
                              )}
                            </Field>
                            <ErrorMessage name="password">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                          </div>
                        </div>
                        <div className='col-4'>
                          <div className='field-wrapper'>
                            <label htmlFor="newPassword">New Password</label>
                            <Field id="newPassword" name="newPassword" type="newPassword" placeholder="New Password">
                              {({ field }: any) => (
                                <Password {...field} toggleMask feedback={false} />
                              )}
                            </Field>
                            <ErrorMessage name="newPassword">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                          </div>
                        </div>
                        <div className='col-4'>
                          <div className='field-wrapper'>
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <Field id="confirmNewPassword" name="confirmNewPassword" type="confirmNewPassword" placeholder="Confirm New Password">
                              {({ field }: any) => (
                                <Password {...field} toggleMask feedback={false} />
                              )}
                            </Field>
                            <ErrorMessage name="confirmNewPassword">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                          </div>
                        </div>
                      </div>
                      <div className='row row justify-content-end mt-3'>
                        <div className='action-wrapper'>
                          <Button type="submit" label='Change Password' />
                        </div>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordChange
