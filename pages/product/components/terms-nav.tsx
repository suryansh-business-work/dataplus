// Core Modules
import type { NextPage } from 'next'
import Link from 'next/link'

// Prime React
import { Image } from 'primereact/image';
import { APP } from '../../../app.config';

const TermsNav: NextPage = () => {
  return (
    <div>
      <div className='logo'>
        <Image src={APP.logo.dark} alt={APP.name} width="250" />
      </div>
      <div className='privacy-nav'>
        <ul>
          <li>
            <Link href="/product/terms">Terms</Link>
          </li>
          <li>
            <Link href="/product/policy">Policy</Link>
          </li>
          <li>
            <Link href="/product/data-privacy">Data Privacy</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TermsNav
