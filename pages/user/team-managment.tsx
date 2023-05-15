// Core Modules
import type { NextPage } from 'next'

// Components
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb';
import UserSidebar from './components/user-sidebar';
import TeamManagement from './components/team-managment';
import Header from '../common/Header';

const Team: NextPage = () => {
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
                  <TeamManagement />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Team
