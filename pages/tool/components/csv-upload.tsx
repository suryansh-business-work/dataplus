// Core Module
import type { NextPage } from 'next'
import { useRef, useState } from 'react';

// Prime React
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Steps } from 'primereact/steps';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

// 3rd Party Tool
import { useCSVReader } from 'react-papaparse';
import { Formik, Field, Form, FormikHelpers, ErrorMessage, FieldArray } from 'formik';
import { registryColumnData } from '../../data/registry-data';
import { useRouter } from 'next/router';

interface IComparisonInfo {
  comparisonName: string;
  fileName: string;
}

const CSVUpload: NextPage = () => {
  const router = useRouter();
  const [newCsvComparisonDialog, setNewCsvComparisonDialog] = useState(false);
  const [columnMapping, setColumnMapping]: any = useState({
    columns: [
      {
        csvColName: '',
        registryColName: ''
      },
      {
        csvColName: '',
        registryColName: ''
      }
    ]
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const items: any = [
    {
      label: 'CSV Name',
      command: (event: Event) => {
        console.log(event)
      }
    },
    {
      label: 'Column Mapping',
      command: (event: Event) => {
        console.log(event)
      }
    },
    {
      label: 'Validate',
      command: (event: Event) => {
        console.log(event)
      }
    }
  ];

  const randomComparisonName = () => {
    const random = Math.random().toString(36).replace(/[^a-z]+/g, '');
    return `New CSV Comparison ${random}`
  }
  const { CSVReader } = useCSVReader();
  const maxRowImportLimit = 10000;
  const registryColumn = ["Sr. No.", "First Name", "Last Name", "Full Name", "Email", "Gender", "Country"]
  const [csvColumn, setCsvColumn] = useState([]);
  const findDuplicates = (arr: any) => {
    const sorted_arr = arr.slice().sort();
    const results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }

  const csvComparisonFooter = () => {
    return (
      <>
        <Button label="Cancel" onClick={() => setNewCsvComparisonDialog(false)} className="p-button-text" />
        <Button label="Prev" disabled={activeIndex == 0} icon="fa-solid fa-chevron-left" onClick={() => setActiveIndex(activeIndex - 1)} />
        {activeIndex < 2 ? <Button label="Next" disabled={activeIndex == 2} iconPos='right' icon="fa-solid fa-chevron-right" onClick={() => setActiveIndex(activeIndex + 1)} autoFocus /> : null}
        {activeIndex == 2 ? <Button label="Start Comparing" disabled={activeIndex < 2} iconPos='right' icon="fa-solid fa-chevron-right" autoFocus onClick={() => router.push({ pathname: `/tool/comparison/324234` })} /> : null}
      </>
    )
  }

  const onDialogClose = () => {
    setActiveIndex(0)
    setNewCsvComparisonDialog(false)
  }

  const csvDropdownTemplate = (options: any) => {
    return (
      <div className='dropdown-text'>
        <Dropdown value={options.value} options={registryColumnData} optionLabel="header" optionValue="field"
          onChange={(e) => options.editorCallback(e.value)} placeholder="Select Registry Column"
        />
      </div>
    );
  }

  const csvDropdownText = (rowData: any) => {
    const registryColName: any = registryColumnData.filter((value: any) => {
      return value.field == rowData.registryColName
    })
    if (registryColName.length > 0) {
      return (<div className='dropdown-text'>{registryColName[0].header}</div>)
    } else {
      return (<div className='dropdown-text'>{rowData.registryColName}</div>)
    }

  }

  const onRowEditComplete1 = (e: any) => {
    let newMappedDataColumn = [...columnMapping];
    let { newData, index } = e;
    console.log(newData, index, newMappedDataColumn)
    newMappedDataColumn[index] = newData;
    console.log(newData, index, newMappedDataColumn)
    // console.log(newMappedDataColumn)
  }

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          setNewCsvComparisonDialog(true)
          const csvData = results?.data;
          const csvDataColumn = csvData[0];
          const duplicatesColumn = findDuplicates(csvDataColumn);
          setCsvColumn(csvDataColumn)
          const csvColForForm = csvDataColumn.map((value: any, index: any) => {
            return {
              csvColName: value,
              registryColName: 'Yet to map'
            }
          })
          setColumnMapping(csvColForForm)
          if (csvData?.length > maxRowImportLimit) {
            console.log(`CSV row limit should not greater than ${maxRowImportLimit}`)
            return;
          } else {
            if (csvDataColumn.every(((value: any) => (value.length == 0 || value.trim().length == ''))) && csvDataColumn?.length == 1) {
              console.log("All Column name row is blank");
              return;
            } else if (duplicatesColumn?.length > 0) {
              console.log(`Duplicate Column found: ${duplicatesColumn}`);
              return;
            } else if (csvData?.length == 1) {
              console.log(`Only Header Column Row presence, No Data row found`);
            } else {
              csvDataColumn.map((value: any, index: any) => {
                if (value.length == 0 || value.trim().length == '') {
                  console.log(`Name column number ${index + 1} has no string value`);
                }
              })
            }
          }
        }}

      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps
        }: any) => (
          <>
            <div>
              <Button type='button' {...getRootProps()}>
                New Comparison <div className='csv-progress-bar'>
                  <ProgressBar />
                </div>
              </Button>
              <div>
              </div>

            </div>

            <Dialog className="csv-comparison-dialog" id="root" header="New CSV Comparison" visible={newCsvComparisonDialog} style={{ width: '70vw' }} footer={csvComparisonFooter} onHide={() => onDialogClose()}>
              <div className='step-menu'>
                <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
              </div>
              <div className='step-content'>
                {activeIndex == 0 ? <div className='wrapper-option-csv'>
                  <Formik
                    initialValues={{
                      comparisonName: randomComparisonName(),
                      fileName: acceptedFile && acceptedFile.name
                    }}
                    onSubmit={(
                      values: IComparisonInfo,
                      { setSubmitting }: FormikHelpers<IComparisonInfo>
                    ) => {
                      console.log(values)
                      setSubmitting(false);
                    }}
                  >
                    <Form>
                      <div className='field-wrapper'>
                        <label htmlFor="comparisonName">Comparison Name</label>
                        <Field required type="text" id="comparisonName" name="comparisonName" placeholder="UK Lead Compare" />
                      </div>
                      <div className='field-wrapper'>
                        <label htmlFor="fileName">File Name</label>
                        <Field type="text" id="fileName" name="fileName" disabled placeholder="uk_lead_file.csv" />
                      </div>
                      <button type="submit">Submit</button>
                    </Form>
                  </Formik>

                </div> : null}
                {activeIndex == 1 ? <div className='wrapper-option-csv'>
                  <div className="column-mapping-wrapper">
                    <div className='custom-table'>
                      <DataTable sortField="csvColName" sortOrder={1} value={columnMapping} editMode="row" dataKey="csvColName" onRowEditComplete={onRowEditComplete1} responsiveLayout="stack">
                        <Column sortable field="csvColName" header="CSV Column"></Column>
                        <Column sortable field="registryColName" header="Registry Column" body={csvDropdownText} editor={(options) => csvDropdownTemplate(options)}></Column>
                        <Column rowEditor></Column>
                      </DataTable>
                    </div>
                  </div>
                </div> : null}
                {activeIndex == 2 ? <div className='wrapper-option-csv'></div> : null}
                {activeIndex == 3 ? <div className='wrapper-option-csv'></div> : null}
              </div>
            </Dialog>
          </>
        )}
      </CSVReader>
    </div>
  )
}

export default CSVUpload
