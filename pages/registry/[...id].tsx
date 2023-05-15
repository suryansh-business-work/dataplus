// Core Module
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

// Components
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb'
import Header from '../common/Header'

// Data
import { registryColumnData, registryData, savedFilter } from '../data/registry-data';

// Prime React Module
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar'
import { Message } from 'primereact/message';
import { SplitButton } from 'primereact/splitbutton';
import { Divider } from 'primereact/divider';

// Dialog
import DataForm from './components/data-form';
import AddColumn from './dialog/add-column';
import { Dropdown } from 'primereact/dropdown';
import ExportCSV from './dialog/export-csv';
import ImportCSV from './dialog/import-csv';
import SampleCSV from './dialog/sample-csv';
import ReplaceData from './dialog/replace-data';

const Registry: NextPage = () => {
  const [columns] = useState(registryColumnData);
  const [registry] = useState(registryData);
  const [selectedContact, setSelectedContact] = useState(null);
  const [registryColumn, setRegistryColumn] = useState(columns);
  const [searchValue, setSearchValue]: any = useState('');
  const [columnEditActive, setColumnEditActive]: any = useState(false);
  const [loading, setLoading] = useState(true)
  const [tableSettingDialog, setTableSettingDialog] = useState(false)
  const [deleteDataDialog, setDeleteDataDialog] = useState(false)
  const [contactDataSidebar, setContactDataSidebar] = useState(false)
  const [exportDataDialog, setExportDataDialog] = useState(false)
  const [sampleCsvDialog, setSampleCsvDialog] = useState(false)
  const [importCsvDialog, setImportCsvDialog] = useState(false)
  const [filterDialog, setFilterDialog] = useState(false)
  const [replaceDataDialog, setReplaceDataDialog] = useState(false)
  const [selectedSavedFilter, setSelectedSavedFilter] = useState({})
  const [data, setData] = useState({})
  
  const editColumnName: any = () => {
    setColumnEditActive(true)
  }

  const loaderBody = () => {
    return <Skeleton></Skeleton>
  }

  const columnToForm = () => {
    if (columns.length > 1) {
      const rows = columns.map((value: any, index: any) => {
        if (value.dataType) {
          return value.field
        }
      })
      return rows;
    } else {
      return []
    }
  }

  const csvOption = [
    {
      label: 'Import CSV',
      icon: 'pi pi-cloud-upload',
      command: () => {setImportCsvDialog(true)}
    },
    {
      label: 'Sample CSV',
      icon: 'pi pi-cloud-download',
      command: () => {setSampleCsvDialog(true)}
    }
  ];

  const showData = (action: string, rowData: any) => {
    let rows = rowData;
    setContactDataSidebar(true)
    if (action == 'edit-data') {
      rows = rowData;
    } else if (action == 'view-data') {
      rows = rowData;
    } else if (action == 'add-data') {
      rows = columnToForm();
    }
    setData({
      action: action,
      rowData: rows
    })
  }

  const registryActionColumn = (rowData: any) => {
    return (
      <div className='registry-actions'>
        <ul>
          <li>
            <a data-pr-at="right+10 top" onClick={() => showData('edit-data', rowData)} data-pr-tooltip="Edit Contact" className='action-target'><i className="fa-solid fa-pen-to-square"></i></a>
          </li>
          <li>
            <a data-pr-at="right+10 top" onClick={() => showData('view-data', rowData)} data-pr-tooltip="View Contact" className='action-target'><i className="fa-solid fa-eye"></i></a>
          </li>
          <li>
            <a data-pr-at="right+10 top" onClick={() => setDeleteDataDialog(true)} data-pr-tooltip="Delete Contact" className='action-target'><i className="fa-solid fa-trash"></i></a>
          </li>
        </ul>
      </div>
    )
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, [])

  const dynamicColumns = registryColumn.map((col: any, i) => {
    return <Column sortable={col.sortable} key={col.field} field={col.field} body={loading ? loaderBody : col.field == 'actions' ? registryActionColumn : ''} header={() => header(col)} />;
  });

  const contactSearch = (value: any) => {
    setSearchValue(value)
  }

  const onColumnNameChange = (event: any, column: any) => {
    const updatedColumn: any = registryColumn.map((obj: any) =>
      obj.id === column.id ? { ...obj, header: event.target.value } : obj
    );
    setRegistryColumn(updatedColumn)
  }

  const header = (column: any) => {
    const updatedColumn: any = registryColumn.filter((value: any) => {
      return value.id == column.id;
    })
    return loading ? loaderBody() : !columnEditActive ? <span onDoubleClick={() => editColumnName()}>{updatedColumn[0]?.header}</span> : <input autoComplete="off" autoCorrect="off" autoCapitalize="off" type="text" value={updatedColumn[0]?.header} onChange={(event) => onColumnNameChange(event, column)} onBlur={() => setColumnEditActive(false)} className="table-header-column-input" />
  }

  useEffect(() => {
    // console.log(registryColumn)
  }, [registryColumn])

  const panelFooterTemplate = () => {
    const selectedItems = registryColumn;
    const length = selectedItems ? selectedItems.length : 0;
    return (
      <div className="py-2 px-3">
        <b>{length}</b> column{length > 1 ? 's' : ''} selected.
      </div>
    );
  }

  const tableSettingDialogFooter: any = () => {
    return (
      <div>
        <Button label="No" onClick={() => setTableSettingDialog(false)} className="p-button-text" />
        <Button label="Ok" onClick={() => setTableSettingDialog(false)} autoFocus />
      </div>
    );
  }

  const deleteDataDialogFooter: any = () => {
    return (
      <div>
        <Button label="Cancel" onClick={() => setTableSettingDialog(false)} className="p-button-text" />
        <Button label="Delete" onClick={() => setTableSettingDialog(false)} className="p-button-danger" autoFocus />
      </div>
    );
  }

  const filterDialogOption: any = () => {
    setFilterDialog(true);
    setData({ action: 'filter-data', rowData: columnToForm() })
  }

  const onSavedFilterChange: any = (e: any) => {
    console.log(e)
    setSelectedSavedFilter(e.value)
  }

  return (
    <div className='root'>
      <Header />
      <HeadingWithBreadcrumb />
      <Tooltip target=".action-target" />
      <Dialog header="Table Setting" visible={tableSettingDialog} style={{ width: '50vw' }} footer={tableSettingDialogFooter} onHide={() => setTableSettingDialog(false)}>
        <div className='table-setting-wrapper'>
          <AddColumn />
        </div>
      </Dialog>
      <Dialog header="Export Data" visible={exportDataDialog} style={{ width: '50vw' }} onHide={() => setExportDataDialog(false)}>
        <ExportCSV />
      </Dialog>
      
      <Dialog header="Import CSV" visible={importCsvDialog} style={{ width: '60vw' }} onHide={() => setImportCsvDialog(false)}>
        <ImportCSV />
      </Dialog>

      <Dialog header="Sample CSV Download" visible={sampleCsvDialog} style={{ width: '40vw' }} onHide={() => setSampleCsvDialog(false)}>
        <SampleCSV />
      </Dialog>
      <Dialog header="Are you sure you want to delete?" visible={deleteDataDialog} style={{ width: '30vw' }} footer={deleteDataDialogFooter} onHide={() => setDeleteDataDialog(false)}></Dialog>
      <Dialog header="Replace Data" visible={replaceDataDialog} style={{ width: '50vw' }} onHide={() => setReplaceDataDialog(false)}>
        <ReplaceData props={registryColumn} />
      </Dialog>
      <Sidebar className="data-box" visible={contactDataSidebar} position="right" style={{ width: '40vw' }} onHide={() => setContactDataSidebar(false)}>
        <DataForm props={data} />
      </Sidebar>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='filter-wrapper'>
              <Dialog className='filter-wrapper-dialog' header="Filters" visible={filterDialog} style={{ width: '40vw' }} onHide={() => setFilterDialog(false)}>
                <Divider align="left">
                  <div className="custom-divider inline-flex align-items-center">
                    <i className="pi pi-filter mr-2"></i>
                    <span className='divider-text'>Saved Filter</span>
                  </div>
                </Divider>
                <div className='saved-filter-dropdown'>
                  <Dropdown value={selectedSavedFilter} options={savedFilter} onChange={onSavedFilterChange} optionLabel="name" optionValue="value" filter showClear filterBy="name" placeholder="Select Filter" />
                </div>
                <Divider align="left">
                  <div className="custom-divider inline-flex align-items-center">
                    <i className="pi pi-filter mr-2"></i>
                    <span className='divider-text'>Apply New Filter</span>
                  </div>
                </Divider>
                <DataForm props={data} />
              </Dialog>
            </div>
            <div className='registry-wrapper'>
              <div className='component-card'>
                <div className='component-heading-with-action'>
                  <div className='heading'>
                    <h3>Contacts</h3>
                  </div>
                  <div className='component-actions'>
                    {/* <div>
                      <MultiSelect filter value={registryColumn} options={columns} optionLabel="header" onChange={onColumnToggle} panelFooterTemplate={panelFooterTemplate} />
                    </div> */}
                    <div className='contact-search p-input-icon-right'>
                      <i className="fa-solid fa-magnifying-glass" />
                      <InputText placeholder="Search..." disabled={loading || (registry.length == 0 || columns.length == 0)} value={searchValue} onChange={(e: any) => contactSearch(e.target.value)} />
                    </div>
                    <SplitButton disabled={loading} label="Export CSV" onClick={() => { setExportDataDialog(true) }} model={csvOption} icon="pi pi-file-excel" className="p-button-text p-button-primary mr-0 ml-3"></SplitButton>
                    <Button disabled={loading || (registry.length == 0 || columns.length == 0)} onClick={() => setReplaceDataDialog(true)} className="p-button-text mr-0 ml-0" icon="fa-solid fa-arrow-right-arrow-left" iconPos="left">Replace Data</Button>
                    <Button disabled={loading || (registry.length == 0 || columns.length == 0)} onClick={() => filterDialogOption()} className="p-button-text mr-0 ml-0" icon="fa-solid fa-filter" iconPos="left">Filter Contact</Button>
                    <Button disabled={loading} onClick={() => setTableSettingDialog(true)} className="p-button-text" icon="fa-solid fa-gear" iconPos="left">Table Setting</Button>
                    <Button disabled={loading || columns.length == 0} icon="fa-solid fa-plus" onClick={() => showData('add-data', null)}>Add Contact</Button>
                  </div>
                </div>
                <div className='component-card-body'>
                  <div className='custom-table'>
                    {columns.length > 0 ? (
                      <DataTable responsiveLayout="scroll" breakpoint="960px" selection={selectedContact} onSelectionChange={e => setSelectedContact(e.value)} dataKey="id" removableSort resizableColumns columnResizeMode="fit" showGridlines virtualScrollerOptions={{ itemSize: 46 }} paginator value={registry} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
                        <Column selectionMode="multiple" headerStyle={{ width: '20px' }}></Column>
                        {dynamicColumns}
                        {columns.length > 0 ? <Column field='actions' body={loading ? loaderBody : registryActionColumn} header={loading ? loaderBody : "Actions"} /> : null}
                      </DataTable>
                    ) : <div className='pt-3 pl-3'><Message severity="info" text="No column found, Kindly create a column through table setting" /></div>}
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

export default Registry
