import type { NextPage } from 'next'

// Prime React
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { properties, registryColumnData } from '../../data/registry-data';
import { useRef, useState } from 'react';
import CustomProperty from './add-custom-column';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';

const AddColumn = () => {
  const [addTableColumnDialog, setAddTableColumnDialog] = useState(false)
  const [columnsFields, setColumnsFields]: any = useState(registryColumnData);
  const [deleteColumnDialog, setDeleteColumnDialog] = useState(false)
  const toast: any = useRef(null);

  const columnBody = {
    visibility: (rowData: any) => {
      return (<InputSwitch checked={rowData.isVisible} onChange={(event) => onVisibilityChange('visibility-status-change', rowData, event)} />)
    },
    actions: (rowData: any) => {
      return (
        <>
          <ul className='table-actions-option'>
            <Tooltip className="subcription-tooltips" target=".custom-label-icon" />
            <li><a onClick={() => setDeleteColumnDialog(true)} className="custom-label-icon" data-pr-tooltip="Delete" data-pr-position="right"><i className="fa-solid fa-trash"></i></a></li>
          </ul>
        </>
      )
    }
  }

  const columns = [
    { field: 'header', header: 'Column Name', sortable: true },
    { body: columnBody.visibility, header: 'Visibility', sortable: false },
    { body: columnBody.actions, header: 'Delete Column', sortable: false }
  ];

  const onVisibilityChange = (change: any, rowData: any, event: any) => {
    let updatedData;
    if (change == 'visibility-status-change') {
      console.log("Visibility Change")
      updatedData = columnsFields.map((obj: any) =>
        obj.id === rowData.id ? { ...obj, isVisible: event.value } : obj
      );
      toast.current.show({ severity: 'info', summary: 'Column Visibility Updated', detail: `${rowData.header} column is now ${event.value ? 'visible' : 'hidden'}`, life: 3000 });
    }
    const updatedField = updatedData.find((value: any) => value.id == rowData.id)
    console.log(updatedField)
    setColumnsFields(updatedData)
  }

  const formik: any = useFormik({
    initialValues: {
      column: ''
    },
    onSubmit: (data) => {
      console.log(data)
      formik.resetForm();
    }
  });

  const dynamicColumns = columns.map((col, i) => {
    return <Column sortable={col.sortable} key={i} columnKey={col.field} field={col.field} header={col.header} body={col.body} />;
  });

  const AddTableColumnDialogFooter: any = () => {
    return (
      <div>
        <Button label="No" onClick={() => setAddTableColumnDialog(false)} className="p-button-text" />
        <Button label="Ok" onClick={() => setAddTableColumnDialog(false)} autoFocus />
      </div>
    );
  }

  const onRowReorder = (e: any) => {
    setColumnsFields(e.value);
    toast.current.show({ severity: 'info', summary: 'Column Sequence Updated', detail: `Column Sequence Updated`, life: 3000 });
  }

  const deleteColumnDialogFooter: any = () => {
    return (
      <div>
        <Button label="Cancel" onClick={() => setDeleteColumnDialog(false)} className="p-button-text" />
        <Button label="Delete Column" onClick={() => setDeleteColumnDialog(false)} className="p-button-danger" autoFocus />
      </div>
    );
  }

  return (
    <div id="root">
      <Dialog header="Add Custom Column" visible={addTableColumnDialog} style={{ width: '50vw' }} footer={AddTableColumnDialogFooter} onHide={() => setAddTableColumnDialog(false)}>
        <div className='table-setting-wrapper'>
          <CustomProperty />
        </div>
      </Dialog>
      <Dialog header="Are you sure you want to delete?" visible={deleteColumnDialog} style={{ width: '30vw' }} footer={deleteColumnDialogFooter} onHide={() => setDeleteColumnDialog(false)}></Dialog>
      <Toast position="bottom-right" ref={toast} />
      <div className='custom-property'>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-field custom-property-linear'>
            <label htmlFor="column">Select Column</label>
            <Dropdown id="column" name="column" value={formik.values.column} onChange={formik.handleChange} options={properties} optionLabel="name" optionValue="slug" />
            <Button type="submit" icon="pi pi-plus" label="Add To Registry Table" className="mr-2" />
            <Button icon="fa-solid fa-table-columns" onClick={() => setAddTableColumnDialog(true)} className="create-custom-column ml-2 p-button-secondary">Create Custom Column</Button>
          </div>
          <div className='table-column-list'>
            <div className='custom-table'>
              <DataTable value={columnsFields} reorderableColumns onRowReorder={onRowReorder} responsiveLayout="scroll">
                <Column rowReorder style={{ width: '3em' }} />
                {dynamicColumns}
              </DataTable>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddColumn
