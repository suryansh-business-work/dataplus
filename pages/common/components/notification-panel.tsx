// Core Module
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// Config
import { APP } from '../../../app.config'

// Data
import { notificationsData } from '../../data/notifications-data'

const NotificationPanel: NextPage = () => {
  return (
    <div className='notification-short-panel'>
      <ul>
        {notificationsData.map((value: any, index: any) => {
          return (
            <li key={index}>
              <Link href={APP.routes.secure.notifications} passHref>
              <a>
                <div className='text-image'>
                  <Image src={value.image} alt={value.type} width="32" height="32" />
                </div>
                <div className='text-notification'>
                  <h4>{value.type}</h4>
                  <p>{value.subject}</p>
                </div>
              </a>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='see-all-notification'>
        <Link href={APP.routes.secure.notifications} passHref><a>See all notification</a></Link>
      </div>
    </div>
  )
}

export default NotificationPanel
