// Core Modules
import type { NextPage } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import { APP } from '../app.config';

// Components
import Header from './common/Header';

const ErrorPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{APP.name} - 404 Page not found</title>
      </Head>
      <Header />
      <div className='error-page-body'>
        <div className='body-container-wrapper'>
          <div className='error-navigations'>
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <div className='error-wrapper'>
                    <div className='big-error-text'>
                      404
                    </div>
                    <div className='error-text'>
                      OOPS! Nothing Was Found
                    </div>
                    <div className='error-paragraph'>
                      The page you are loogin for might has been removed <br /> had its name changed is temporily unavailable
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>
                  <div className='error-menu'>
                    <h4>Website Pages</h4>
                    <ul>
                      <li>
                        <Link href="/">Home Page</Link>
                      </li>
                      <li>
                        <Link href="/">About Us</Link>
                      </li>
                      <li>
                        <Link href="/">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='error-menu'>
                    <h4>Application Pages</h4>
                    <ul>
                      <li>
                        <Link href="/registry">Registry</Link>
                      </li>
                      <li>
                        <Link href="/reports">Report</Link>
                      </li>
                      <li>
                        <Link href="/user/general-setting">General Profile Setting</Link>
                      </li>
                      <li>
                        <Link href="/user/billing">Billing</Link>
                      </li>
                      <li>
                        <Link href="/user/team-managment">Team Managment</Link>
                      </li>
                      <li>
                        <Link href="/user/support">Contact Support</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='error-menu'>
                    <h4>Enrich Tools</h4>
                    <ul>
                      <li>
                        <Link href="/csv-tool">CSV Tool</Link>
                      </li>
                      <li>
                        <Link href="/">Chrome Extension</Link>
                      </li>
                      <li>
                        <Link href="/">Domain Search</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage;
