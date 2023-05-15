// Core Module
import type { NextPage } from 'next'
import React, { useState, useEffect, useRef } from 'react';

// Prime React
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// Data
import { csvCompareData } from '../data/csv-compare'

// Components
import Header from '../common/Header';
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb';

// 3rd Party Tool
import CSVUpload from './components/csv-upload';

const CsvTool: NextPage = () => {
  return (
    <div className='root'>
      <Header />
      <HeadingWithBreadcrumb />
      <div className='component-card'>
        <div className='component-heading-with-action'>
          <div className='heading'>
            <h3>Comparison Table</h3>
          </div>
          <div className='component-actions'>
            <CSVUpload />
          </div>
        </div>
        <div className='component-card-body'>
          <div className='custom-table'>
            <DataTable value={csvCompareData} paginator responsiveLayout="scroll"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
              <Column field="name" header="Name"></Column>
              <Column field="fileName" header="File Name"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CsvTool
