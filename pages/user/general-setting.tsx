// Core Modules
import type { NextPage } from 'next'
import Head from 'next/head'

// Components
import Header from '../common/Header';

// Prime React
import { Button } from 'primereact/button';
import UserSidebar from './components/user-sidebar';
import ProfileDetails from './components/general-setting/profile-details';
import PasswordChange from './components/general-setting/password-change';
import DeleteAccount from './components/general-setting/delete-account';
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb';

const GeneralSetting: NextPage = () => {
  return (
    <>
      <Header />
      <div className='user-area'>
        <div className='body-container-wrapper'>
          <div className='sidebar'>
            <UserSidebar />
          </div>
          <div className='main-content'>
            <HeadingWithBreadcrumb />
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <ProfileDetails />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <PasswordChange />
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-12'>
                  <DeleteAccount />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralSetting
