// Core Modules
import type { NextPage } from 'next'
import Head from 'next/head'

// Components
import Header from '../common/Header';

// Prime React
import { Button } from 'primereact/button';
import UserSidebar from './components/user-sidebar';
import PaymentMethod from './components/billing/payment-method';
import Invoice from './components/billing/Invoice';
import SubscriptionPlan from './components/billing/subscription-plan';
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb';

const Billing: NextPage = () => {
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
                  <PaymentMethod />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <SubscriptionPlan />
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-12'>
                  <Invoice />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Billing
