import { ErrorMessage, Field, Form, Formik } from 'formik';
import type { NextPage } from 'next'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { useState } from 'react';
import * as Yup from "yup";
import { APP } from '../../../../app.config';

const DeleteAccount: NextPage = () => {
  const [deleteAccount, setDeleteAccount] = useState(false);

  const PasswordSchema = Yup.object().shape({
    password: Yup.string().required('Please enter password').min(8, 'Password is too short - should be 8 chars minimum').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must have uppercase, lowercase, number and special case character")
  });

  const deleteAccountFn = () => {
    console.log("Delete Account");
  }

  const RenderFooter = (name: any) => {
    return (
      <div className='delete-account-action'>
        <Button label="Cancel" icon="pi pi-times" onClick={() => setDeleteAccount(false)} className="p-button-text" />
        <Button className="p-button-danger" type="submit" label="Delete Account" icon="pi pi-trash" onClick={() => deleteAccountFn()} />
      </div>
    );
  }

  return (
    <div className='component-card'>
      <Dialog header="Are you sure you want to delete your account?" visible={deleteAccount} style={{ width: '30vw' }} onHide={() => setDeleteAccount(false)}>
        <div className='warning-delete-message'>
          <p>By deleting your account, you`ll no longer be able to access any of your data or log in to {APP.name}.</p>
        </div>
        <Formik
          initialValues={{
            password: ''
          }}
          validationSchema={PasswordSchema}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          <Form>
            <div className='field-wrapper'>
              <label htmlFor="password">Current password</label>
              <Field id="password" name="password" type="password" placeholder="Current Password" autoFocus>
                {({ field }: any) => (
                  <Password {...field} toggleMask feedback={false} />
                )}
              </Field>
              <ErrorMessage name="password">{msg => <div className='error'>{msg}</div>}</ErrorMessage>
              <RenderFooter />
            </div>
          </Form>
        </Formik>
      </Dialog>
      <div className='component-heading-with-action'>
        <div className='heading'>
          <h3>Delete Account</h3>
        </div>
      </div>
      <div className='component-card-body'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='delete-warrning'>
                <p>By deleting your account, you`ll no longer be able to access any of your data or log in to Octoplus.</p>
              </div>
              <div className='action-delete-button mt-3'>
                <Button onClick={() => setDeleteAccount(true)} className="p-button-danger" type="submit" label='Delete Account' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount
