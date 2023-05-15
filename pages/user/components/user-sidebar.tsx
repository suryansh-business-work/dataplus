// Core Modules
import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { userNavigationData } from '../../data/paths';

const UserSidebar: NextPage = () => {
  const router = useRouter();

  const navigate = (path: any) => {
    router.push(path)
  }

  return (
    <div>
      <div className='user-area-side-nav'>
        <ul>
          {userNavigationData.map((value: any, index: any): any => {
            return (
              <li key={index} className={router.pathname == value?.link ? "active" : ""}>
                {!value?.hasOwnProperty('link') ?
                  (
                    <>
                      <a> <i className={value.icon}></i> {value?.label}</a>
                      <ul>
                        {value?.items?.map((value: any, index: any) => {
                          return (
                            <li key={index} className={router.pathname == value?.link ? "active-sub-child" : ""}>
                              <a onClick={() => navigate(value?.link)}> <i className={value.icon}></i> {value?.label} </a>
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  )
                  : (<a onClick={() => navigate(value?.link)}> <i className={value.icon}></i> {value?.label} </a>)}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default UserSidebar
