// Core Modules
// Core Module
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react';

// Prime React
import { Image } from 'primereact/image';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

// Components
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb';
import Header from '../common/Header';

// Data
import { notificationsData } from '../data/notifications-data';

const Notifications: NextPage = () => {
  const [notifications, setNotification]: any = useState(notificationsData);
  const [showNotification, setShowNotification]: any = useState(false);
  const [viewNotification, setViewNotification]: any = useState({});

  const onReadOrUnreadClick = (row: any, type: string) => {
    let updatedNotification;
    if (type == 'read') {
      updatedNotification = notifications.map((obj: any) =>
        obj.id === row.id ? { ...obj, isRead: true } : obj
      );
    } else if (type == 'unread') {
      updatedNotification = notifications.map((obj: any) =>
        obj.id === row.id ? { ...obj, isRead: false } : obj
      );
    }
    setNotification(updatedNotification)
  }

  const showNotificationFn = (row: any) => {
    setShowNotification(true)
    setViewNotification(row)
    onReadOrUnreadClick(row, 'read')
  }

  const table = {
    action: (row: any) => (
      <div className='action-link'>
        <a onClick={() => onReadOrUnreadClick(row, 'read')}>Mark as read</a>
        <a onClick={() => onReadOrUnreadClick(row, 'unread')}>Mark as unread</a>
        <a onClick={() => showNotificationFn(row)}>View</a>
      </div>
    )
  }

  const rowClass = (data: any) => {
    return {
      'unread': data.isRead === false
    }
  }

  const showUnread = () => {
    const updatedNotification = notifications.filter((notification: any) => notification.isRead == false );
    setNotification(updatedNotification)
  }

  const markAllRead = () => {
    const updatedNotification = notifications.map((notification: any) => {
      return {
        ...notification,
        isRead:true
      }
    });
    setNotification(updatedNotification)
  }

  const showAllNotifications = () => {
    setNotification(notificationsData)
  }

  const notificationImage = (notification: any) => {
    return <Image src={notification.image} alt={notification.subject} width="32" height="32" />
  }

  return (
    <div className='root'>
      <Header />
      <HeadingWithBreadcrumb />
      <Sidebar visible={showNotification} position="right" onHide={() => setShowNotification(false)}>
        <div className='notification-offer-wrapper'>
          <Image src={viewNotification.offerImage} alt={viewNotification.subject} width="100" height="100" />
          <h3>{viewNotification.subject}</h3>
          <p>{viewNotification.message}</p>
        </div>
      </Sidebar>
      <div className='component-card'>
        <div className='component-heading-with-action'>
          <div className='heading'>
            <h3>Notifications</h3>
          </div>
          <div className='component-actions'>
            <Button className='p-button-outlined' onClick={() => showAllNotifications()}>Show All Notifications</Button>
            <Button className='p-button-outlined' onClick={() => showUnread()}>Show unread only</Button>
            <Button onClick={() => markAllRead()}>Mark all read</Button>
          </div>
        </div>
        <div className='component-card-body'>
          <div className='custom-table'>
            <DataTable value={notifications} rowClassName={rowClass} responsiveLayout="scroll"
              selectionPageOnly paginator rows={5}>
              <Column field="image" header="Image" body={notificationImage}></Column>
              <Column sortable field="type" header="Type"></Column>
              <Column sortable field="subject" header="Subject"></Column>
              <Column field="actions" header="Action" body={table.action}></Column>
            </DataTable>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Notifications
