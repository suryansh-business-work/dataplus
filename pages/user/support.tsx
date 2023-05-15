// Core Modules
import type { NextPage } from 'next'
import Head from 'next/head'

// Components
import Header from '../common/Header';

// Prime React
import { Button } from 'primereact/button';
import UserSidebar from './components/user-sidebar';
import UserSupport from './components/support';
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb';

const Support: NextPage = () => {
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
              <div className='row mb-5'>
                <div className='col-12'>
                  <UserSupport />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Support
