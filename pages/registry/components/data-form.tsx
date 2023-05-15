// Core Module
import type { NextPage } from 'next'
import { useEffect } from 'react';

// 3rd Party Module
import { useFormik } from 'formik';

// Prime React
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';

// Data
import { properties } from '../../data/registry-data';

const DataForm = ({ props }: any) => {
  const data: any = props;
  
  const filterOptions = [
    {
        label: 'Save Filter',
        icon: 'pi pi-save',
        command: () => {}
    }
  ];

  const intialFormValue = () => {
    let rowData: any = data.rowData;
    if (data.action == 'add-data' || data.action == 'filter-data') {
      if (rowData.length > 0) {
        const obj: any = {}
        rowData.filter((value: any) => value ? value : null)
        for (let i = 0; i < rowData.length; i++) {
          obj[rowData[i]] = ''
        }
        rowData =  obj
      } else {
        rowData = {};
      }
    }
    else {
      rowData = data.rowData
    }
    return rowData;
  }

  const inputTypesArray: any = () => {
    const columnName = Object.keys(intialFormValue() ? intialFormValue() : []);
    return columnName;
  }

  const slugToFieldObj: any = (slug: string) => {
    const value = intialFormValue();
    if (value) {
      const propertyObj = properties.filter((value: any, index: any) => {
        return value?.slug == slug;
      })
      const propertyValue: any = propertyObj[0];
      return propertyValue;
    }
  }

  const formik: any = useFormik({
    initialValues: intialFormValue(),
    onSubmit: (formData) => {
      console.log('Form Data', formData)
    }
  });

  const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: any) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <div>
      {data.action != 'filter-data' ? <h3>{(() => { if (data.action == 'add-data') { return ('Add Data') } else if (data.action == 'edit-data') { return ('Edit Data') } else { return ('View Data') } })()}</h3> : null}
      <div className='data-form-wrapper'>
        <form onSubmit={formik.handleSubmit}>
          <div className={data.action == 'view-data' ? 'view-only all-inputs-form-fields' : 'all-inputs-form-fields'}>
            {inputTypesArray().map((value: any, index: any) => {
              const formJson = slugToFieldObj(value);
              if (formJson && formJson.type == 'text') {
                return (
                  <div key={index} className={formJson.type + ' form-field'}>
                    <label htmlFor={value}>{formJson.name}</label>
                    {data.action == 'view-data' ? formik.values[value] : <InputText id={value} name={value} value={formik.values[value]} onChange={formik.handleChange} />}
                    {getFormErrorMessage(value)}
                  </div>
                )
              }
            })}
          </div>
          <div className='action-wrapper'>
            <div className='last-update'>
              {data.action == 'edit-data' || data.action == 'view-data' || data.action != 'filter-data' ? 'Last updated or created at 20 Apr 2022 12:12:23 by Suryansh Srivastava' : null}
            </div>
            <div className='buttons-wrapepr'>
              <Button label="Close" type="submit" className="mr-3 p-button-secondary p-button-text" />
              {data.action == 'add-data' ? <Button label="Create" type="submit" className="ml-2" /> : null}
              {data.action == 'edit-data' ? <Button type="submit" label="Update" className="ml-2" /> : null}
              {data.action == 'filter-data' ? <SplitButton label="Apply Filter" icon="pi pi-filter" model={filterOptions} className="p-button-info ml-3 mr-2"></SplitButton> : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DataForm
