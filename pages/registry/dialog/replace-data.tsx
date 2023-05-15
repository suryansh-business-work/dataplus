import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ReplaceData = ({ props }: any) => {
  const [allColumns] = useState(props)
  const [replaceOption, setReplaceOption] = useState('specificColumn')

  const formik: any = useFormik({
    initialValues: {
      selectData: '',
      changeTo: '',
      selectedColumn: null
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.selectData) {
        errors.selectData = 'Select data is required.';
      }

      if (!data.changeTo) {
        errors.changeTo = 'Change To is required.';
      }

      if (replaceOption == 'specificColumn' && !data.selectedColumn) {
        errors.selectedColumn = 'Column selection is required.';
      }

      return errors;
    },
    onSubmit: (data: any) => {
      console.log(data);
      formik.resetForm();
    }
  });

  const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: any) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <div>
      <div className="replace-data-wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="replace-input-fields">
            <div className="form-field-body">
              <label htmlFor="selectData" className={classNames({ 'p-error': isFormFieldValid('selectData') })}>Select Data*</label>
              <InputText id="selectData" name="selectData" value={formik.values.selectData} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
              {getFormErrorMessage('selectData')}
            </div>
            <div className="replace-icon">
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
            </div>
            <div className="form-field-body">
              <label htmlFor="changeTo" className={classNames({ 'p-error': isFormFieldValid('changeTo') })}>Change To*</label>
              <InputText id="changeTo" name="changeTo" value={formik.values.changeTo} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
              {getFormErrorMessage('changeTo')}
            </div>
          </div>
          <div className="choose-column">
            <div className="form-field checkbox">
              <RadioButton inputId="replaceOnlyColumn" name="replace" value="specificColumn" onChange={(e: any) => {
                  setReplaceOption(e.value)
              }} checked={replaceOption == 'specificColumn'} />
              <label htmlFor="replaceOnlyColumn">Replace data on specific column</label>
            </div>
            <div className="form-field checkbox">
              <RadioButton inputId="replaceWholeColumnData" name="replace" value="wholeColumn" onChange={(e: any) => {
                  setReplaceOption(e.value)
              }} checked={replaceOption == 'wholeColumn'} />
              <label htmlFor="replaceWholeColumnData">Replace data on whole column</label>
            </div>
          </div>
          {replaceOption == 'specificColumn' ? <div className="choose-column-dropdown">
            <div className="form-field">
              <label htmlFor="selectedColumn" className={classNames({ 'p-error': isFormFieldValid('selectedColumn') })}>Select Column*</label>
              <Dropdown id="selectedColumn" value={formik.values.selectedColumn} options={allColumns} onChange={formik.handleChange} optionLabel="header" optionValue="id" placeholder="Select Column" />
              {getFormErrorMessage('selectedColumn')}
            </div>
          </div> : null}
          <div className="dialog-actions">
            <Button label="Relace" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReplaceData
