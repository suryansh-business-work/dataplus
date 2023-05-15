// Core Modules
import type { NextPage } from 'next'
import { useState } from 'react';

// Componenets
import PaymentCards from './components/payment-cards'

// Prime React
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { InputMask } from 'primereact/inputmask';

// 3rd Party Modules
import valid from "card-validator";
import { FaCcVisa, FaCcMastercard, FaCcDinersClub, FaCcJcb, FaCcDiscover, FaCcAmex, FaCreditCard, } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';

const cardTypeIconHandler = (num: any) => {
  let cardDetails = valid.number(parseInt(num)).card;
  if (cardDetails) {
    let type = cardDetails.type;
    if (type == "mastercard") {
      return <FaCcMastercard />;
    } else if (type == "visa") {
      return <FaCcVisa />;
    } else if (type == "diners-club") {
      return <FaCcDinersClub />;
    } else if (type == "jcb") {
      return <FaCcJcb />;
    } else if (type == "discover") {
      return <FaCcDiscover />;
    } else if (type == "american-express") {
      return <FaCcAmex />;
    } else {
      return <FaCreditCard />;
    }
  }
};

const cardValidation = Yup.object().shape({
  cardHolderName: Yup.string().required("Please enter card owner name"),
  cardNumber: Yup
    .string()
    .required("Please enter card number")
    .test({
      message: "Please enter correct card number",
      test: (value) => valid.number(value).isValid,
    }),
  expireDate: Yup
    .string()
    .required("Please enter expiry date")
    .test({
      message: "Please enter correct expiry date",
      test: (value: any) => valid.expirationDate(value).isValid,
    }),
  cvv: Yup.string().required("Please enter correct cvv").min(3).max(4),
});

const PaymentMethod: NextPage = () => {
  const [addPaymentDialog, setAddPaymentDialog] = useState(false);
  const [date, setDate] = useState<Date | Date[] | undefined>(undefined);
  const Cal: any = Calendar;

  const formik: any = useFormik({
    initialValues: {
      cardHolderName: '',
      cardNumber: '',
      expiryDate: date,
      cvv: '',
      makePrimary: true
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.cardHolderName) {
        errors.cardHolderName = 'Card Holder Name is required.';
      }

      if (!data.cardNumber) {
        errors.cardNumber = 'Card Number is required.';
      }

      if (!data.expiryDate) {
        errors.expiryDate = 'Card Expire Date is required.';
      }

      if (!data.cvv) {
        errors.cvv = 'Card CVV is required.';
      }

      return errors;
    },
    onSubmit: (data: any) => {
      console.log(data)
      formik.resetForm();
    }
  });

  const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: any) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <div className='component-card'>
      <div className='component-heading-with-action'>
        <div className='heading'>
          <h3>Payment Method</h3>
        </div>
        <div className='component-actions'>
          <Button onClick={() => setAddPaymentDialog(true)}>Add Payment Method</Button>
        </div>
      </div>
      <div className='component-card-body'>
        <Dialog className="add-payment-dialog" header="Add Card" visible={addPaymentDialog} style={{ width: '30vw' }} onHide={() => setAddPaymentDialog(false)}>
          <div className='card-fill-form'>
            <form onSubmit={formik.handleSubmit}>
              <div className='card-form-wrapper'>
                <div className='field-wrapper'>
                  <label htmlFor="cardHolderName">Card Holder Name</label>
                  <InputText id="cardHolderName" value={formik.values.cardHolderName} onChange={formik.handleChange} placeholder="John Doe" />
                  {getFormErrorMessage('cardHolderName')}
                </div>
                <div className='field-wrapper'>
                  <label htmlFor="cardNumber">Card Number</label>
                  <div className='p-inputgroup'>
                    <InputMask id="cardNumber" mask="9999-9999-9999-9999" value={formik.values.cardNumber} onChange={formik.handleChange} placeholder="****-****-****-****"></InputMask>
                    <span className="p-inputgroup-addon">{cardTypeIconHandler(formik.values.cardNumber)}</span>
                  </div>
                  {getFormErrorMessage('cardNumber')}
                </div>
                <div className='field-row-group'>
                  <div className='field-wrapper'>
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <Cal id="expiryDate" value={formik.values.expiryDate} onChange={formik.handleChange} view="month" dateFormat="mm/yy" />
                    {getFormErrorMessage('expiryDate')}
                  </div>
                  <div className='field-wrapper'>
                    <label htmlFor="cvv">CVV</label>
                    <InputMask id="cvv" mask="999" value={formik.values.cvv} onChange={formik.handleChange} placeholder="***"></InputMask>
                    {getFormErrorMessage('cvv')}
                  </div>
                </div>
                <div className='field-wrapper checkbox'>
                    <Checkbox id="makePrimary" checked={formik.values.makePrimary} onChange={formik.handleChange} />
                    <label htmlFor="makePrimary">Make Primary</label>
                  </div>
                <div className='action-wrapper'>
                  <Button type="submit" label="Save Card" className="mt-2" />
                </div>
              </div>
            </form>
          </div>
        </Dialog>
        <PaymentCards />
      </div>
    </div>
  )
}

export default PaymentMethod
