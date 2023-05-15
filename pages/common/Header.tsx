// Core Modules
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from "next/router";

// Prime React
import { Image } from 'primereact/image';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar';
import { Chip } from 'primereact/chip';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';

// Data
import Tutorial from './dialogs/Tutorial';

// Config
import { APP } from '../../app.config';
import NotificationPanel from './components/notification-panel';

const Header: NextPage = () => {
  const [showTutorial, setShowTutorial] = useState(false)
  const [headerSidebar, setHeaderSidebar] = useState(false)
  const [selectedProject, setSelectedProject] = useState({})

  const projects = [
    {
      id: '1',
      name: 'Exyconn Company'
    },
    {
      id: '2',
      name: 'Sibera Company'
    },
    {
      id: '3',
      name: 'Broxlab Company'
    }
  ]

  const op: any = useRef(null);
  const router = useRouter();
  const navigate = (path: any) => {
    router.push(path)
  }

  const onSearchClick = () => {

  }

  return (
    <div className='header-container-wrapper'>
      {/* <div className='email-window'>
        Email
      </div>
      <div className='call-window'>
        Call
      </div> */}
      <Sidebar className='header-sidebar' visible={headerSidebar} position="right" onHide={() => setHeaderSidebar(false)}>
        <div className='user-image'>
          <Chip label="Suryansh Srivastava" image="/profile.jpg" className="mr-2 mb-2" />
        </div>
        <ul className='sidebar-user-nav'>
          <li>
            <Link href={APP.routes.secure.generalSetting} passHref>
              <a><i className="fa-solid fa-user-gear"></i><span>General Setting</span></a>
            </Link>
          </li>
          <li>
            <Link href={APP.routes.secure.billing} passHref>
              <a><i className="fa-solid fa-money-bills"></i><span>Billing</span></a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a><i className="fa-solid fa-comments"></i><span>Community</span></a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a><i className="fa-solid fa-clipboard-question"></i><span>FAQs</span></a>
            </Link>
          </li>
          <li>
            <Link href={APP.routes.secure.support} passHref><a className="header-icon"><i className="fa-solid fa-headset"></i><span>Support</span></a></Link>
          </li>
          <li>
            <a onClick={() => router.push({ pathname: APP.routes.unsecure.login, query: { logout: 'success' } })}> <i className="fa-solid fa-right-from-bracket"></i><span>Logout</span> </a>
          </li>
        </ul>
      </Sidebar>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-2'>
            <Link href={APP.routes.secure.lists} passHref>
              <a className="logo">
                <Image src={APP.logo.light} alt={APP.name} width="250" />
              </a>
            </Link>
          </div>
          <div className='col-2'>
            <div className='project-dropdown'>
              <Dropdown filter filterBy="name" value={selectedProject} options={projects} onChange={(e: any) => setSelectedProject(e.value)} optionLabel="name" optionValue="id" placeholder="Select Project" />
            </div>
          </div>
          <div className='col-5'>
            <Dialog header="Tutorial" visible={showTutorial} style={{ width: '70vw' }} onHide={() => setShowTutorial(false)}>
              <Tutorial />
            </Dialog>
            <div className='menu-wrapper'>
              <ul>
                {APP.navigations.header.map((value: any, index: any): any => {
                  return (
                    <li key={index} className={router.pathname == value?.link ? "active" : ""}>
                      {!value?.hasOwnProperty('link') ?
                        (
                          <>
                            <a> {value?.label} <i className="fa-solid fa-angle-down"></i></a>
                            <ul>
                              {value?.items?.map((value: any, index: any) => {
                                return (
                                  <li key={index} className={router.pathname == value?.link ? "active-sub-child" : ""}>
                                    <a onClick={() => navigate(value?.link)}> {value?.label} </a>
                                  </li>
                                )
                              })}
                            </ul>
                          </>
                        )
                        : (<a onClick={() => navigate(value?.link)}> {value?.label} </a>)}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className='col-3'>
            <div className='header-option-wrapper'>
              <ul>
                <li>
                  <a className="header-icon" onClick={() => onSearchClick()}><i className="fa-solid fa-magnifying-glass"></i></a>
                </li>
                <li>
                  <a className="header-icon" onClick={() => setShowTutorial(true)}><i className="fa-solid fa-book-open-reader"></i></a>
                </li>
                <li>
                  <a onClick={(e) => op.current?.toggle(e)} className="header-icon"><i className="pi pi-bell p-overlay-badge"><Badge severity="danger" ></Badge></i></a>
                  <OverlayPanel
                    ref={op}
                    id="overlay_panel"
                    style={{ width: "450px" }}
                    className="notifications-overlaypanel"
                  >
                    <NotificationPanel />
                  </OverlayPanel>
                </li>
                <li>
                  <a onClick={() => setHeaderSidebar(true)} className='profile-image'><Avatar image="/profile.jpg" size="large" shape="circle" /><span className='user-name'></span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
