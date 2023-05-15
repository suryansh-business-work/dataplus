// Core Module
import type { NextPage } from 'next'
import { useState } from 'react';

// Prime React
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// Data
import { registryColumnData } from '../../data/registry-data';
import { Button } from 'primereact/button';

const ExportCSV: NextPage = () => {
  const [dataColumns, setDataColumns] = useState(registryColumnData);
  const [dataColumnsSelection, setDataColumnsSelection] = useState(registryColumnData);
  const [isColumnSelected, setIsColumnSelected] = useState(false);

  const columns = [
    { field: 'header', header: 'Column Name' }
  ]

  const onRowReorder = (e: any) => {
    console.log(e)
    setDataColumns(e.value);
  }

  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} columnKey={col.field} field={col.field} header={col.header} />;
  });

  const onDataColumnSelection = (e: any) => {
    const data = e?.value;
    data.length == 0 ? setIsColumnSelected(true) : setIsColumnSelected(false)
    setDataColumnsSelection(data)
  }

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
      <div className='custom-table'>
        <DataTable selectionMode="checkbox" selection={dataColumnsSelection} onSelectionChange={e => onDataColumnSelection(e)} dataKey="id" value={dataColumns} reorderableColumns onRowReorder={onRowReorder} responsiveLayout="scroll">
          <Column rowReorder style={{ width: '3em' }} />
          <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
          {dynamicColumns}
        </DataTable>
      </div>
      <div className='dialog-actions'>
        <DialogFooter />
      </div>
    </div>
  )
}

export default ExportCSV
