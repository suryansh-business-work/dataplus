import type { NextPage } from 'next'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { roles } from '../../../../data/rolesData';
import { useFormik } from 'formik';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Regex } from '../../../../utils/regex';

const InviteMemberDialog: NextPage = () => {
  const [inviteIntialFormValue, setInviteIntialFormValue]: any = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });
  const formik: any = useFormik({
    initialValues: inviteIntialFormValue,
    validate: (data) => {
      let errors: any = {};

      if (!data.firstName) {
        errors.firstName = 'First Name is required.';
      }

      if (!data.lastName) {
        errors.lastName = 'Last Name is required.';
      }

      if (!data.email) {
        errors.email = 'Email is required.';
      }
      else if (Regex.EMAIL.test(data.email)) {
        errors.email = 'Invalid email address. E.g. example@email.com';
      }

      if (!data.role) {
        errors.role = 'Role is required.';
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log(data)
      formik.resetForm();
    }
  });

  const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: any) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='field-wrapper-row'>
          <div className='field-wrapper'>
            <label htmlFor="firstName">First Name *</label>
            <InputText id="firstName" type="text" value={formik.values.firstName} onChange={formik.handleChange} name="firstName" placeholder="John" />
            {getFormErrorMessage('firstName')}
          </div>
          <div className='field-wrapper'>
            <label htmlFor="lastName">Last Name *</label>
            <InputText id="lastName" type="text" value={formik.values.lastName} onChange={formik.handleChange} name="lastName" placeholder="Doe" />
            {getFormErrorMessage('lastName')}
          </div>
        </div>
        <div className='field-wrapper'>
          <label htmlFor="email">Email *</label>
          <InputText
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
            value={formik.values.email} 
            onChange={formik.handleChange}
          />
          {getFormErrorMessage('email')}
        </div>
        <div className='field-wrapper'>
          <label htmlFor="role">Member Role *</label>
          <Dropdown id="role" name="role" options={roles} value={formik.values.role} onChange={formik.handleChange} optionLabel="name" optionValue="slug" placeholder="Select Member Role" />
          {getFormErrorMessage('role')}
        </div>
        <Button type="submit" label="Invite Member" className="mt-2" />
      </form>
    </div>
  )
}

export default InviteMemberDialog;
