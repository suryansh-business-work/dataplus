// Core Module
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'

// React Prime Module
import { Button } from 'primereact/button';

// Data
import { pathData } from '../../data/paths';
import { APP } from '../../../app.config';


const HeadingWithBreadcrumb: NextPage = ({props}: any) => {
  const router = useRouter();
  const app = pathData(router.pathname);

  return (
    <div className='page-header-section'>
    <Head>
      <title>{APP.name} - {app?.title}</title>
    </Head>
    <div className='container-fluid'>
      <div className='row align-items-center'>
        <div className='col-6'>
          <div className='breadcrumb'>
            <ul>
              {app?.breadcrumb.map((value: any,index: any) => {
                return (
                  <li key={index}>
                    {value.link ? <Link href={value.link}>{value.label}</Link> : value.label}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='main-page-heading'>
            <h3>{app?.title}</h3>
          </div>
        </div>
        {/* <div className='col-6 d-flex justify-content-end'>
          <Button label="Start New Comparison" aria-label="Start New Comparison" />
        </div> */}
      </div>
    </div>
  </div>
  )
}

export default HeadingWithBreadcrumb
