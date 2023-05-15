import type { NextPage } from 'next'

// Prime React
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useRef, useState } from 'react';

// Data
import { InputType } from '../../data/registry-data';
import { Checkbox } from 'primereact/checkbox';

const AddCustomColumn: any = () => {
  const [selectedInput, setSelectedInput] = useState('text');
  const defaultValue: any = useRef(null);
  
  const formik: any = useFormik({
    initialValues: {
      name: 'New Column',
      inputType: 'text',
      defaultValue: '',
      placeholder: '',
      unique: false,
      required: false,
      regex: '',
      regexValidationMsg: ''
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.name) {
        errors.name = 'Name is required.';
      }

      if (!data.inputType) {
        errors.inputType = 'Input Type is required.';
      }
      return errors;
    },
    onSubmit: (data) => {
      console.log(data)
      formik.resetForm();
    }
  });

  const onInputTypeChange = (value: any) => {
    console.log(value);
    formik.resetForm();
  }

  const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: any) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <div className='custom-property'>
      <form onSubmit={formik.handleSubmit}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              <div className='form-field'>
                <label htmlFor="name">Name<span className='required'>*</span></label>
                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus />
                {getFormErrorMessage('name')}
              </div>
            </div>
            <div className='col-6'>
              <div className='form-field'>
                <label htmlFor="inputType">Input Type<span className='required'>*</span></label>
                <Dropdown id="inputType" name="inputType" value={formik.values.inputType} onChange={(e: any) => { formik.handleChange(e), onInputTypeChange(e.value) }} options={InputType} optionLabel="name" optionValue="value" />
                {getFormErrorMessage('inputType')}
              </div>
            </div>
          </div>
        </div>


        <div className='conditional-form-field'>
          {selectedInput == 'text' ? (
            <>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-12'>
                    <h4>More Option</h4>
                  </div>
                  <div className='col-6'>
                    <div className='form-field'>
                      <label htmlFor="defaultValue">Default Value</label>
                      <InputText id="defaultValue" name="defaultValue" value={formik.values.defaultValue} onChange={formik.handleChange} autoFocus />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='form-field'>
                      <label htmlFor="placeholder">Placeholder</label>
                      <InputText id="placeholder" name="placeholder" value={formik.values.placeholder} onChange={formik.handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-6'>
                    <div className='form-field checkbox'>
                      <label htmlFor="unique">Unique data</label>
                      <Checkbox inputId="unique" name="unique" checked={formik.values.unique} onChange={formik.handleChange} />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='form-field checkbox'>
                      <label htmlFor="required">Required</label>
                      <Checkbox inputId="required" name="required" checked={formik.values.required} onChange={formik.handleChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='advance-option-wrapper'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-12'>
                      <h4>Advance Option</h4>
                    </div>
                    <div className='col-6'>
                      <div className='form-field'>
                        <label htmlFor="regex">Regex</label>
                        <InputText id="regex" name="regex" value={formik.values.regex} onChange={formik.handleChange} />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='form-field'>
                        <label htmlFor="regexValidationMsg">Error Message</label>
                        <InputText id="regexValidationMsg" name="regexValidationMsg" value={formik.values.regexValidationMsg} onChange={formik.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {selectedInput == 'number' ? (
            <>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-12'>
                    <h4>More Option</h4>
                  </div>
                  <div className='col-6'>
                    <div className='form-field'>
                      <label htmlFor="name">Default Value</label>
                      <InputNumber ref={defaultValue} id="defaultValue" name="defaultValue" value={formik.values.defaultValue} onChange={formik.handleChange} autoFocus />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='form-field'>
                      <label htmlFor="name">Placeholder</label>
                      <InputText id="placeholder" name="placeholder" value={formik.values.placeholder} onChange={formik.handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-6'>
                    <div className='form-field checkbox'>
                      <label htmlFor="unique">Unique data</label>
                      <Checkbox inputId="unique" name="unique" checked={formik.values.unique} onChange={formik.handleChange} />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='form-field checkbox'>
                      <label htmlFor="required">Required</label>
                      <Checkbox inputId="required" name="required" checked={formik.values.required} onChange={formik.handleChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='advance-option-wrapper'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-12'>
                      <h4>Advance Option</h4>
                    </div>
                    <div className='col-6'>
                      <div className='form-field'>
                        <label htmlFor="regex">Regex</label>
                        <InputText id="regex" name="regex" value={formik.values.regex} onChange={formik.handleChange} />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='form-field'>
                        <label htmlFor="regexValidationMsg">Error Message</label>
                        <InputText id="regexValidationMsg" name="regexValidationMsg" value={formik.values.regexValidationMsg} onChange={formik.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {selectedInput == 'checkbox' ? (
            <>
              <div className='form-field'>
                Input Type checkbox
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'color' ? (
            <>
              <div className='form-field'>
                Input Type color
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'date' ? (
            <>
              <div className='form-field'>
                Input Type date
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'datetime-local' ? (
            <>
              <div className='form-field'>
                Input Type datetime-local
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'email' ? (
            <>
              <div className='form-field'>
                Input Type email
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'file' ? (
            <>
              <div className='form-field'>
                Input Type file
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'month' ? (
            <>
              <div className='form-field'>
                Input Type month
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'radio' ? (
            <>
              <div className='form-field'>
                Input Type radio
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'range' ? (
            <>
              <div className='form-field'>
                Input Type range
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'tel' ? (
            <>
              <div className='form-field'>
                Input Type tel
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'time' ? (
            <>
              <div className='form-field'>
                Input Type time
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'url' ? (
            <>
              <div className='form-field'>
                Input Type url
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'week' ? (
            <>
              <div className='form-field'>
                Input Type Week
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'password' ? (
            <>
              <div className='form-field'>
                Input Type password
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
          {selectedInput == 'dropdown' ? (
            <>
              <div className='form-field'>
                Dropdown
              </div>
              <div className='form-field'>

              </div>
            </>
          ) : null}
        </div>

        <div className='output-column-input'>
          <h4>Output Column View</h4>
          {selectedInput == 'text' ?
            <div className='form-field'>
              <label>{formik.values.name ? formik.values.name : 'Column Name'} {formik.values.required ? <span className='required'>*</span> : null}</label>
              <InputText value={formik.values.defaultValue} placeholder={formik.values.placeholder} />
            </div>
            : null}
          {selectedInput == 'number' ?
            <div className='form-field'>
              <label>{formik.values.name ? formik.values.name : 'Column Name'} {formik.values.required ? <span className='required'>*</span> : null}</label>
              <InputNumber value={formik.values.defaultValue} placeholder={formik.values.placeholder} />
            </div>
            : null}
        </div>
        <div className='action-column'>
          <Button type="submit" label="Create Custom Column" className="mt-2" />
        </div>
      </form>
    </div>
  )
}

export default AddCustomColumn


{/* <div className='container-fluid'>
  <div className='row'>
    <div className='col-6'>

    </div>
    <div className='col-6'>

    </div>
  </div>
</div> */}