import type { NextPage } from 'next'
import { Button } from 'primereact/button'
import { Formik, Field, Form, useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { countryData } from '../../../data/_country-data';
import { Dropdown } from 'primereact/dropdown';
import { languagesData } from '../../../data/language-data';
import { Skeleton } from 'primereact/skeleton';

const ProfileDetails: NextPage = () => {

  const [loading, setLoading] = useState(true)

  const loaderBody: any = () => {
    return <Skeleton />
  }

  const LoaderBody: any = () => {
    return <Skeleton height="4rem" />
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, [])

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      console.log(position)
    });
  }

  const formik: any = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      addressLine1: '',
      addressLine2: '',
      addressCity: '',
      addressState: '',
      addressCountry: '',
      addressPincode: '',
      profilePhoto: '',
      language: ''
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.firstName) {
        errors.firstName = 'First name is required.';
      }

      if (!data.lastName) {
        errors.lastName = 'Last name is required.';
      }

      if (!data.email) {
        errors.email = 'Email is required.';
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log(data)
      // formik.resetForm();
    }
  });

  const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: any) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <div className='component-card'>
      <div className='component-heading-with-action'>
        <div className='heading'>
          <h3>Profile Details</h3>
        </div>
      </div>
      <div className='component-card-body'>
        <div className='container-fluid'>
          <div className='row'>
            {loading ? <>
              <div className='col-12  mt-4 mb-4'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
              <div className='col-6 mb-3'><LoaderBody /></div>
            </> : (
              <div className='col-12'>
                <div className='user-form-wrapper'>
                  <form onSubmit={formik.handleSubmit}>
                    <div className='container-fluid'>
                      <div className='row'>
                        <div className='col-12'>
                          <div className='field-wrapper'>
                            <div className='user-profile-image'>
                              <div className='image-input-wrapper'>
                                <span className='image'>
                                  <Image src="/profile.jpg" alt="User" width="120" height="120" />
                                  <input type="file" />
                                </span>
                                <span className='profile-info'>
                                  <span className='name'>Suryansh Srivastava</span>
                                  <span className='email'>suryansh@exyconn.com</span>
                                  <div className='profile-picture-option'>
                                    <button className='update-photo'>Update photo</button>
                                    <button className='remove-photo'>Remove photo</button>
                                  </div>
                                </span>
                              </div>

                            </div>
                            {/* <label htmlFor="profilePhoto">Profile Photo</label>
                            <Field type="text" id="profilePhoto" name="profilePhoto" placeholder="Path" /> */}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-12'>
                          <h4>General</h4>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="firstName">First Name</label>
                            <InputText type="text" id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} placeholder="Suryansh" />
                            {getFormErrorMessage('firstName')}
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="lastName">Last Name</label>
                            <InputText type="text" id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} placeholder="Srivastava" />
                            {getFormErrorMessage('lastName')}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="email">Email</label>
                            <InputText type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="suryansh@exyconn.com" />
                            {getFormErrorMessage('email')}
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="phone">Phone</label>
                            <InputText type="text" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} placeholder="+91-8791234693" />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="company">Company</label>
                            <InputText type="text" id="company" name="company" value={formik.values.company} onChange={formik.handleChange} placeholder="Exyconn" />
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="language">Language</label>
                            <Dropdown value={formik.values.language} onChange={formik.handleChange} id="language" name="language" filter filterBy="name" options={languagesData} optionLabel="name" optionValue="code" placeholder="Select your language" />
                          </div>
                        </div>
                      </div>
                      <div className='row align-items-center'>
                        <div className='col-6'>
                          <div className="get-location">
                            <h4>Address</h4>
                            <a onClick={() => { getLocation() }}><i className="fa-solid fa-location-dot"></i>Get Location</a>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="addressLine1">Address Line 1</label>
                            <InputText type="text" id="addressLine1" name="addressLine1" value={formik.values.addressLine1} onChange={formik.handleChange} placeholder="25 Street Block A" />
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="addressLine2">Address Line 2</label>
                            <InputText type="text" id="addressLine2" name="addressLine2" value={formik.values.addressLine2} onChange={formik.handleChange} placeholder="Near By Small Town" />
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="addressCity">City</label>
                            <InputText type="text" id="addressCity" name="addressCity" value={formik.values.addressCity} onChange={formik.handleChange} placeholder="Newyork" />
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="addressState">State</label>
                            <InputText type="text" id="addressState" name="addressState" value={formik.values.addressState} onChange={formik.handleChange} placeholder="Town Block" />
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="addressPincode">Pin Code</label>
                            <InputText type="text" id="addressPincode" name="addressPincode" value={formik.values.addressPincode} onChange={formik.handleChange} placeholder="11005" />
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='field-wrapper'>
                            <label htmlFor="addressCountry">Country</label>
                            <Dropdown value={formik.values.addressCountry} onChange={formik.handleChange} id="addressCountry" name="addressCountry" filter filterBy="name" options={countryData} optionLabel="name" placeholder="Select your country" />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-12'></div>
                      </div>
                      <div className='row justify-content-end mt-3'>
                        <div className='action-wrapper'>
                          <Button type="submit" label='Update Profile' />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
