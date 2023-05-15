// Core Modules
import type { NextPage } from 'next'
import Head from 'next/head'
import { APP } from '../../app.config'

// Components
import TermsNav from './components/terms-nav'

const Policy: NextPage = () => {
  return (
    <div className='terms-wrapper'>
      <Head>
        <title>{APP.name} - General Policy</title>
      </Head>
      <div className='terms-nav'>
        <TermsNav />
      </div>
      <div className='terms-content'>
        <h3>General Policy</h3>
        <p><i>Note about this policy template: Lots of template policies are unhelpfully long and simply reiterate large portions of the legislation. This template is different: it aims to provide a concise and practical document that can be used by trustees of small charities as the foundation for a working Data Protection Policy. If you have any doubt about your legal obligations you should always check with a lawyer. </i></p>
      </div>
    </div>
  )
}

export default Policy
