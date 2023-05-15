// Core Module
import type { NextPage } from 'next'
import { useState } from 'react';

// Prime React
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

// Data
import { registryColumnData } from '../../data/registry-data';

// 3rd Party Plugin
import { Importer, ImporterField } from 'react-csv-importer';

const ImportCSV: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [isColumnSelected, setIsColumnSelected] = useState(false);

  const DialogFooter = (name: any) => {
    return (
      <div>
        <Button label="Close" icon="" className="p-button-text" />
        <Button disabled={isColumnSelected} label="Download" icon="pi pi-cloud-download" autoFocus />
      </div>
    );
  }

  return (
    <div className='export-csv-dialog-wrapepr'>
      <div className='uploading-csv'>
        {loading ? <ProgressSpinner /> : null}
      </div>
      {!loading ? (<div className='csv-components'>
        <div className='custom-table'>
          <Importer
            assumeNoHeaders={false}
            restartable={false}
            onStart={({ file, preview, fields, columnFields }) => {

            }}
            processChunk={async (rows, { startIndex }) => {
              console.log(rows)
            }}
            onComplete={({ file, preview, fields, columnFields }) => {
              console.log(file, preview, fields, columnFields)
              setLoading(true)
            }}
            onClose={({ file, preview, fields, columnFields }) => {

            }}
          >
            <ImporterField name="firstName" label="First Name" optional />
            <ImporterField name="lastName" label="Last Name" />
            <ImporterField name="email" label="Email" />
            <ImporterField name="phone" label="Phone" optional />
          </Importer>
        </div>
      </div>) : null}
      {loading ? <div className='dialog-actions'>
        <DialogFooter />
      </div> : ''}
    </div>
  )
}

export default ImportCSV
