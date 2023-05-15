// Core Module
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

// Prime React
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';

// Data
import { invoiceData, paymentStatus } from '../../../data/invoice-data'
import { paymenCards } from '../../../data/payment-cards';

// Components
import { PdfGenerator } from './components/invoice-pdf';
import Image from 'next/image';
import { Badge } from 'primereact/badge';
import { Skeleton } from 'primereact/skeleton';

const Invoice: NextPage = () => {
  const [showInvoice, setShowInvoice] = useState(false)
  const [showPaymentProcessDialog, setShowPaymentProcessDialog] = useState(false)
  const [paymentDetails, setPaymentDetails]: any = useState({})
  const [selectedCard, setSelectedCard]: any = useState({})
  const [loading, setLoading] = useState(true)

  const loaderBody = () => {
    return <Skeleton />
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, [])

  const table = {
    action: (rowData: any) => (
      <div className='action-link'>
        <a onClick={() => setShowInvoice(true)}>View</a>
        {rowData.status == 'Unpaid' ? <a onClick={() => paymentProcess(rowData, true)}>Pay now</a> : null}
        {rowData.status == 'Failed' ? <a onClick={() => paymentProcess(rowData, true)}>Try Again</a> : null}
      </div>
    ),
    paymentStatus: (rowData: any) => {
      return (<Badge value={rowData.status} severity="success" className={rowData.status == paymentStatus.paid ? 'accepted': rowData.status == paymentStatus.unpaid ? 'invited' : 'rejected' }></Badge>)
    },
  }

  const paymentProcess = (rowData: any, dialogStatus: boolean) => {
    setShowPaymentProcessDialog(dialogStatus);
    setPaymentDetails(rowData);
  }

  const paymentProcessFooter = () => {
    return (
      <div>
        <Button label="Pay Now" className="p-button-info" iconPos="right" icon="pi pi-angle-right" onClick={() => setShowPaymentProcessDialog(false)} autoFocus />
      </div>
    );
  }

  return (
    <div className='component-card'>
      <div className='component-heading-with-action'>
        <div className='heading'>
          <h3>Invoice</h3>
        </div>
      </div>
      <div className='component-card-body'>
        <div className='custom-table'>
          <Sidebar visible={showInvoice} position="right" className='invoice-view-mode' onHide={() => setShowInvoice(false)}>
            <div className='loader-pdf'>
              <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" animationDuration=".5s" />
            </div>
            <PdfGenerator />
          </Sidebar>
          <Dialog header="Payment" visible={showPaymentProcessDialog} style={{ width: '50vw' }} footer={paymentProcessFooter} onHide={() => setShowPaymentProcessDialog(false)}>
            <div className='payment-amount'>${paymentDetails.amount}</div>
            <div className='select-card-wrapper'>
              <label>Saved Card</label>
              <Dropdown value={selectedCard} options={paymenCards} onChange={(e: any) => setSelectedCard(e.value)} optionLabel="cardHolderName" optionValue="id" filter filterBy="name" placeholder="Select a Card" />
            </div>
            <Divider align="center" type="dashed">
                <b>Other Payment Gateways</b>
            </Divider>
            <div className='other-payment-methods'>
              <div className='paypal'>
                <Image src="/cards/paypal.png" width="150" height="40" alt="PayPal" />
              </div>
              <div className='stripe'>
                <Image src="/cards/razorpay.png" width="160" height="35" alt="PayPal" />
              </div>
            </div>
          </Dialog>
          <DataTable value={invoiceData} paginator={!loaderBody} responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
            <Column field="duration" body={loading ? loaderBody : null} header="Invoice Duration"></Column>
            <Column field="status" header="Invoice Status" body={loading ? loaderBody : table.paymentStatus}></Column>
            <Column field="amount" body={loading ? loaderBody : null} header="Invoice Amount"></Column>
            <Column field="action" header="Action" body={loading ? loaderBody : table.action}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}

export default Invoice
