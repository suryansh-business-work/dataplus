// Core Module
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

// Components
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb'
import Header from '../common/Header'

// Data
import { ListData } from '../data/list-data'

// Prime React
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { OverlayPanel } from 'primereact/overlaypanel';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

// 3rd Party Component
import { useFormik } from 'formik'
import { Skeleton } from 'primereact/skeleton'

const Lists: NextPage = () => {
  const router = useRouter();
  const [lists, setLists] = useState(ListData)
  const [selectedList, setSelectedList] = useState([])
  const [createListDialog, setCreateListDialog] = useState(false)
  const [createFolderDialog, setCreateFolderDialog] = useState(false)
  const [moveToFolderBtn, setMoveToFolderBtn] = useState(true)
  const [loading, setLoading] = useState(true)
  const listFormSubmit: any = useRef(null);
  const folderFormSubmit: any = useRef(null);
  const op = useRef<OverlayPanel>(null);

  const folderFormInitialValues = {
    folders: [
      {
        name: '',
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  },[])

  const listFormik: any = useFormik({
    initialValues: {
      listName: '',
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.listName) {
        errors.listName = 'List name is required.';
      }

      return errors;
    },
    onSubmit: (data: any) => {
      listFormik.resetForm();
    }
  });

  const folderFormik: any = useFormik({
    initialValues: {
      folderName: '',
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.folderName) {
        errors.folderName = 'Folder name is required.';
      }

      return errors;
    },
    onSubmit: (data: any) => {
      folderFormik.resetForm();
    }
  });

  const createList = () => {
    setCreateListDialog(true);
  }

  const createListFormSubmit = () => {
    // setCreateListDialog(false);
    listFormSubmit.current.click()
  }

  const createFolderFormSubmit = () => {
    // setCreateFolderDialog(false);
    folderFormSubmit.current.click()
  }

  const loader = () => {
    return <Skeleton />
  }

  const onDeleteList = () => {
    confirmDialog({
      message: 'Do you want to delete this list?',
      header: 'Delete List Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => { },
      reject: () => { }
    });
  }

  const listHeading = (row: any) => {
    return (
      <div className='list-column-wrap'>
        <div className='list-name'>
          <span onClick={() => router.push({ pathname: `/registry/${row.id}` })}>{row.name} ({row.count})</span>
        </div>
        <div className='list-info'>
          Created on - {row.createdOn} by {row.owner}
        </div>
      </div>
    )
  }

  const listOptions = (row: any) => {
    return (
      <div className='list-options'>
        <ul>
          <li>
            <a onClick={() => { setCreateListDialog(true) }}><i className="fa-solid fa-pencil"></i></a>
          </li>
          <li>
            <a onClick={() => onDeleteList()}><i className="fa-solid fa-trash"></i></a>
          </li>
        </ul>
      </div>
    )
  }

  const createListFooter = () => {
    return (
      <div>
        <Button label="Cancel" onClick={() => setCreateListDialog(false)} className="p-button-text" />
        <Button label="Create" onClick={() => createListFormSubmit()} autoFocus />
      </div>
    );
  }

  const createFolderFooter = () => {
    return (
      <div>
        <Button label="Cancel" onClick={() => setCreateFolderDialog(false)} className="p-button-text" />
        <Button label="Create" onClick={() => createFolderFormSubmit()} autoFocus />
      </div>
    );
  }

  const isFolderFormFieldValid = (name: any) => !!(folderFormik.touched[name] && folderFormik.errors[name]);
  const getFolderFormErrorMessage = (name: any) => {
    return isFolderFormFieldValid(name) && <small className="p-error">{folderFormik.errors[name]}</small>;
  };

  const isListFormFieldValid = (name: any) => !!(listFormik.touched[name] && listFormik.errors[name]);
  const getListFormErrorMessage = (name: any) => {
    return isListFormFieldValid(name) && <small className="p-error">{listFormik.errors[name]}</small>;
  };

  const onSelection = (e: any) => {
    const selectedList = e.value;
    setSelectedList(selectedList)
    if (selectedList.length > 0) {
      setMoveToFolderBtn(false)
    } else {
      setMoveToFolderBtn(true)
    }
  }

  return (
    <div>
      <Header />
      <HeadingWithBreadcrumb />
      <ConfirmDialog />
      <Dialog className="new-list-dialog" header="New List" visible={createListDialog} style={{ width: '30vw' }} footer={createListFooter} onHide={() => setCreateListDialog(false)}>
        <form onSubmit={listFormik.handleSubmit}>
          <div className='field-wrapper'>
            <label htmlFor="listName">List Name</label>
            <InputText id="listName" name="listName" value={listFormik.values.listName} onChange={listFormik.handleChange} autoFocus />
            {getListFormErrorMessage('listName')}
          </div>
          <Button hidden ref={listFormSubmit} type="submit" label="Create List" className="mt-2" />
        </form>
      </Dialog>
      <Dialog className="new-folder-dialog" header="New Folder" visible={createFolderDialog} style={{ width: '30vw' }} footer={createFolderFooter} onHide={() => setCreateFolderDialog(false)}>
        <form onSubmit={folderFormik.handleSubmit}>
          <div className='field-wrapper'>
            <label htmlFor="folderName">Folder Name</label>
            <InputText id="folderName" name="folderName" value={folderFormik.values.folderName} onChange={folderFormik.handleChange} autoFocus />
            {getFolderFormErrorMessage('folderName')}
          </div>
          <Button hidden ref={folderFormSubmit} type="submit" label="Create Folder" className="mt-2" />
        </form>
      </Dialog>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='component-card'>
              <div className='component-heading-with-action'>
                <div className='heading'>
                  <h3>Lists</h3>
                </div>
                <div className='currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"component-actions'>
                  {/* <Button onClick={(e) => op.current?.toggle(e)} hidden={moveToFolderBtn} disabled={moveToFolderBtn} label="Move To Folder" iconPos="left" icon="pi pi-folder" className="p-button p-button-sm p-button-secondary p-button-text" />
                  <Button onClick={() => { setCreateFolderDialog(true) }} className="p-button-text p-button-secondary p-button-sm" icon="fa-solid fa-folder-plus" label='Create Folder' /> */}
                  <Button disabled={loading} onClick={() => createList()}>Create List</Button>
                  <OverlayPanel
                    ref={op}
                    id="list-folder-management"
                    style={{ width: "350px" }}
                    className="list-folder-management"
                  >
                    <div className='folder-area'>
                      <div className='folder-header-area'>
                        <h5>Folders</h5>
                      </div>
                    </div>
                    <div className='form-list-body-area'>
                      <ul>
                        <li>
                          <a><i className="fa-solid fa-folder"></i> Exyconn Data</a>
                        </li>
                        <li>
                          <a><i className="fa-solid fa-folder"></i>Sibera Data</a>
                        </li>
                        <li>
                          <a><i className="fa-solid fa-folder"></i>Dataplus Data</a>
                        </li>
                      </ul>
                    </div>
                  </OverlayPanel>
                </div>
              </div>
              <div className='component-card-body'>
                <div className='list-wrapper'>
                  <div className='custom-table'>
                    <DataTable selectionPageOnly paginator={!loading} rows={5} value={lists} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"  rowsPerPageOptions={[5, 10, 20, 50]} selectionMode="checkbox" selection={selectedList} onSelectionChange={e => onSelection(e)} dataKey="id" responsiveLayout="scroll">
                      {/* <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column> */}
                      
                      <Column body={loading ? loader : listHeading} header="List Name" />
                      <Column body={loading ? loader : listOptions} header=""></Column>
                    </DataTable>
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

export default Lists
