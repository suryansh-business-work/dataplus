// Core Module
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react';

// Prime React
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

// Data
import { paymenCards } from '../../../../data/payment-cards'
import { Skeleton } from 'primereact/skeleton';

const PaymentCards: NextPage = () => {
  const [deleteCardDialog, setDeleteCardDialog] = useState(false);
  const [loading, setLoading] = useState(true)

  const LoaderBody: any = () => {
    return <Skeleton height="250px" />
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, [])

  const deleteCard = () => {
    confirmDialog({
      message: 'Do you want to delete this card?',
      header: 'Delete Card',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position: 'top',
      accept: () => { },
      reject: () => { },
    });
  }
  return (
    <div>
      <ConfirmDialog />
      <div className='container-fluid'>
        <div className='row payment-cards'>
          {loading ? <>
            <div className='col-3'><LoaderBody /></div>
            <div className='col-3'><LoaderBody /></div>
            <div className='col-3'><LoaderBody /></div>
          </> : <>
            {paymenCards.map((value: any, index: any) => {
              return (
                <div className='col-3' key={index} >
                  <div className='payment-box'>
                    <div className='payment-card'>
                      <div className='card-top'>
                        <div className='card-chip'>
                          
                        </div>
                        <div className='card-type'>
                          <Image src="/cards/visa-logo.png" alt="Card Logo" width="64" height="35" />
                        </div>
                      </div>
                      <div className='card-number'>
                        <span>****</span>
                        <span>****</span>
                        <span>****</span>
                        <span>{value.cardNumber.fourthFour}</span>
                      </div>
                      <div className='card-info'>
                        <div className='card-info-block'>
                          <span className='heading'>
                            Card Holder
                          </span>
                          <span className='name'>
                            {value.cardHolderName}
                          </span>
                        </div>
                        <div className='card-info-block'>
                          <span className='heading'>
                            Expires
                          </span>
                          <span className='name'>
                            {value.expiry.month}/{value.expiry.year}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='edit-card-option'>
                      <ul>
                        <li>
                          <a><i className="pi pi-credit-card"></i>Edit Card</a>
                        </li>
                        <li>
                          <a onClick={() => deleteCard()}><i className="pi pi-trash"></i>Delete Card</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </>}

        </div>
      </div>
    </div>
  )
}

export default PaymentCards
