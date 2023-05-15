// Core Module
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

// Prime React
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';

// Data
import { subcription } from '../../../data/plan';
import PricingPlan from './components/pricing-plan';

// Components
import SubcriptionProgress from './components/subcription-progress';
import { useFormik } from 'formik';
import { Skeleton } from 'primereact/skeleton';

const SubscriptionPlan: NextPage = () => {
  const [showPlan, setShowPlan] = useState(false)
  const [cancelDialog, setCancelDialog] = useState(false);
  const [loading, setLoading] = useState(true)

  const LoaderBody: any = () => {
    return <Skeleton />
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, [])

  const cancellationReason = [
    {
      label: 'Too Expensive',
      value: 'expensive'
    },
    {
      label: 'Choose a different product',
      value: 'different-product'
    }
  ]

  const cancelSubcription = () => {
    return (
      <div>
        <Button label="Go Back" onClick={() => setCancelDialog(false)} className="p-button-text" />
        <Button label="Downgrade Subcription" className="p-button-warning" onClick={() => setCancelDialog(false)} autoFocus />
        <Button label="Cancel Subcription" className="p-button-danger" onClick={() => setCancelDialog(false)} autoFocus />
      </div>
    );
  }

  const formik: any = useFormik({
    initialValues: {
      reason: '',
      reasonDescription: 'Why do you want to leave us, kindly brief?'
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.reason) {
        errors.reason = 'Reason is required.';
      }

      if (!data.reasonDescription) {
        errors.reasonDescription = 'Reason description is required.';
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
          <h3>Subscription Plan</h3>
        </div>
        <div className='component-actions'>
          <Button disabled={loading} className="p-button-danger p-button-outlined" onClick={() => setCancelDialog(true)}>Cancel Plan</Button>
          <Button disabled={loading} onClick={() => setShowPlan(true)}>Upgrade Plan</Button>
        </div>
      </div>
      <div className='component-card-body'>
        <Sidebar visible={showPlan} position="right" fullScreen onHide={() => setShowPlan(false)}>
          <PricingPlan />
        </Sidebar>
        <Dialog className="cancel-subcription-dialog" header="Are you sure you want to cancel the subcription?" visible={cancelDialog} style={{ width: '50vw' }} footer={cancelSubcription} onHide={() => setCancelDialog(false)}>
          <form onSubmit={formik.handleSubmit}>
            <div className='form-field'>
              <label htmlFor="reason">Reason</label>
              <Dropdown disabled={loading} id="reason" name="reason" value={formik.values.reason} onChange={formik.handleChange} options={cancellationReason} optionLabel="label" optionValue="value" />
              {getFormErrorMessage('reason')}
            </div>

            <div className='form-field'>
              <label htmlFor="reasonDescription">Reason Description</label>
              <Editor disabled={loading} style={{ height: '320px' }} id="reasonDescription" value={formik.values.reasonDescription} onTextChange={(e: any) => formik.handleChange(e.htmlValue)} />
              {getFormErrorMessage('reasonDescription')}
            </div>


           <div className='action-wrapper'>
              <Button disabled={loading} type="submit" label="Submit Reason" className="mt-2" />
           </div>

          </form>
        </Dialog>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-3'>
              <div className='subcription-details'>
                <div className='plan-name'>
                  <span className='plan-text'>{subcription.plan.name}</span>
                  <span className='price'>
                    <h4>Price</h4>
                    {loading ? <LoaderBody /> : <p>{subcription.plan.price} ({subcription.plan.paymentType})</p>}
                  </span>
                  <span className='status'>
                    <h4>Status</h4>
                    {loading ? <LoaderBody /> : <p>{subcription.plan.status}</p>}
                  </span>
                </div>
              </div>
            </div>
            <div className='col-9'>
              <div className='subcription-details'>
                <div className='plan-info'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <SubcriptionProgress props={subcription} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPlan
