// Core Modules
import type { NextPage } from 'next'
import Head from 'next/head'

// Prime React
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { useState } from 'react';
import { Chart } from 'primereact/chart';

// Components
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb'
import Header from '../common/Header'
import { teamMembers } from '../data/team-member';
import { csvCompareData } from '../data/csv-compare';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Reports: NextPage = () => {
  const [dates, setDates]: any = useState<Date | Date[] | undefined>(undefined);
  const [assignee, setAssignee]: any = useState(null);
  const CalendarInput: any = Calendar;
  const [basicData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#4854C2',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  });
  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .8,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  }
  return (
    <div className='root'>
      <Header />
      <HeadingWithBreadcrumb />
      <div className='reports-wrapper'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='component-card'>
                <div className='component-heading-with-action'>
                  <div className='heading'>
                    <div className='member-dropdown'>
                      <h4><i className="fa-solid fa-user"></i><span>Select Member</span></h4>
                      <div className='select-assignee'>
                        <MultiSelect value={assignee} options={teamMembers} onChange={(e) => setAssignee(e.value)} optionLabel="name" optionValue="id" placeholder="Select a Member" display="chip" />
                      </div>
                    </div>
                  </div>
                  <div className='component-actions'>
                    <CalendarInput id="range" value={dates} onChange={(e: any) => setDates(e.value)} selectionMode="range" readOnlyInput placeholder="Select Date" />
                    <Button icon="fa-solid fa-download">Download Report</Button>
                  </div>
                </div>
                <div className='component-card-body'>
                  <div className='total-contact-resolve'>
                    <h5>Total Contact resolve from date x to date y is 256</h5>
                  </div>
                  <div className='custom-graph-area'>
                    <Chart type="bar" data={basicData} options={basicOptions} />
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
