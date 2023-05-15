// Core Module
import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import Head from 'next/head'

// Prime React
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';
import { RadioButton } from 'primereact/radiobutton';

// Components
import Header from '../../common/Header';
import { InputText } from 'primereact/inputtext';

// Data
import { registryData } from '../../data/registry-data';
import { Dropdown } from 'primereact/dropdown';
import { teamMembers } from '../../data/team-member';
import { Divider } from 'primereact/divider';

const CsvTool: NextPage = () => {
  const [selectedData, setSelectedData]: any = useState([]);
  const [selectedCsvData, setSelectedCsvData]: any = useState([]);
  const [contactFixingDialog, setContactFixingDialog]: any = useState(false);
  const [selectedMember, setSelectedMember]: any = useState(null);

  const setData = (e: any) => {
    console.log(e.value);
  }

  const contactFixingDialogFooter = (
    <div>
      <Button className="p-button-secondary p-button-text" label="Close" onClick={() => setContactFixingDialog(false)} />
      <Button label="Assign" onClick={() => setContactFixingDialog(false)} />
    </div>
  );

  return (
    <div className='root'>
      <Header />
      <Dialog header="Assign Data Fixing" visible={contactFixingDialog} style={{ width: '50vw' }} footer={contactFixingDialogFooter} onHide={() => setContactFixingDialog(false)}>
        <div className='user-list-dropdown'>
          <Divider align="center">
            <b>Assign to</b>
          </Divider>
          <label>Select user</label>
          <Dropdown value={selectedMember} options={teamMembers} onChange={(e: any) => setSelectedMember(e.value)} optionLabel="name" optionValue="id" placeholder="Select User" />
        </div>
      </Dialog>
      <div className='csv-tool-wrapper'>
        <div className='component-card'>
          <div className='component-heading-with-action'>
            <div className='heading'>
              <h3>Comparison</h3>
            </div>
            <div className='actions'>
              <Button onClick={() => setContactFixingDialog(true)}>Assign Data Fixing</Button>
            </div>
          </div>
          <div className='component-card-body'>
            <div className="csv-tool">
              <div className='column-wrapper'>
                <div className='column-search'>
                  <div className="p-inputgroup">
                    <InputText placeholder="Search Column" />
                    <span className="p-inputgroup-addon">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                  </div>
                </div>
                <div className='column-entries'>
                  <ul>
                    <li>
                      <a>
                        <h4>ID</h4>
                        <div className='count-box'>
                          <span className='duplicate-count'>(363 Duplicates)</span>
                          <span className='unique-count'>(20 Unique)</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <h4>First name</h4>
                        <div className='count-box'>
                          <span className='duplicate-count'>(363 Duplicates)</span>
                          <span className='unique-count'>(20 Unique)</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <h4>Last name</h4>
                        <div className='count-box'>
                          <span className='duplicate-count'>(363 Duplicates)</span>
                          <span className='unique-count'>(20 Unique)</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <h4>Email</h4>
                        <div className='count-box'>
                          <span className='duplicate-count'>(363 Duplicates)</span>
                          <span className='unique-count'>(20 Unique)</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='entries-wrapper'>
                <div className='entries-search'>
                  <div className="p-inputgroup">
                    <InputText placeholder="Search Entries" />
                    <span className="p-inputgroup-addon">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                  </div>
                </div>
                <div className='entries-list'>
                  <TabView>
                    <TabPanel header="Uniques (20)">
                      <ul>
                        <li>
                          <a>
                            <div className='main-data'>
                              suryansh@exyconn.com
                            </div>
                            <div className='main-data-count'>
                              1 in Registry, 20 in CSV
                            </div>
                          </a>
                        </li>
                        <li>
                          <a>
                            <div className='main-data'>
                              sayan@exyconn.com
                            </div>
                            <div className='main-data-count'>
                              1 in Registry, 20 in CSV
                            </div>
                          </a>
                        </li>
                        <li>
                          <a>
                            <div className='main-data'>
                              anshul@exyconn.com
                            </div>
                            <div className='main-data-count'>
                              1 in Registry, 20 in CSV
                            </div>
                          </a>
                        </li>
                        <li>
                          <a>
                            <div className='main-data'>
                              daya@exyconn.com
                            </div>
                            <div className='main-data-count'>
                              1 in Registry, 20 in CSV
                            </div>
                          </a>
                        </li>
                      </ul>
                    </TabPanel>
                    <TabPanel header="Duplicates (363)">
                      <ul>
                        <li>
                          <a>
                            <div className='main-data'>
                              suryansh@exyconn.com
                            </div>
                            <div className='main-data-count'>
                              1 in Registry, 20 in CSV
                            </div>
                          </a>
                        </li>
                        <li>
                          <a>
                            <div className='main-data'>
                              sayan@exyconn.com
                            </div>
                            <div className='main-data-count'>
                              1 in Registry, 20 in CSV
                            </div>
                          </a>
                        </li>
                        <li>
                          <a>
                            <div className='main-data'>
                              anshul@exyconn.com
                            </div>
                            <div className='main-data-count'>
                              1 in Registry, 20 in CSV
                            </div>
                          </a>
                        </li>
                        <li>
                          <a>
                            <div className='main-data'>
                              daya@exyconn.com
                            </div>
                            <div className='main-data-count'>
                              1 in Registry, 20 in CSV
                            </div>
                          </a>
                        </li>
                      </ul>
                    </TabPanel>
                  </TabView>
                </div>
              </div>
              <div className='compare-window-wrapper'>
                <div className='compare-window'>
                  <div className='compare-window-header'>
                    <h4 className='main-data'>suryansh@exyconn.com <span className='main-data-count'>1 Registry, 20 in CSV</span></h4>
                    <p className='disclaimer'>Kindly select below data to perform desire action</p>
                  </div>
                  <div className='compare-window-body'>
                    <div className='registry-data'>
                      <h4 className='data-heading'>Registry Database</h4>
                      <form>
                        <div className='data-body'>
                          <ul>
                            {Object.entries(registryData[0]).map((value: any, index: any) => {
                              return (
                                <li key={index}>
                                  <RadioButton inputId={value[0]} name="data" value={value} onChange={(e) => {
                                    setData(e)
                                    setSelectedData(e.value)
                                  }} checked={value[1] == selectedData[1]} />
                                  <label>{value[1]}</label>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </form>
                    </div>
                    <div className='csv-data'>
                      <h4 className='data-heading'>CSV Database</h4>
                      <div className='data-body'>
                        <ul>
                          {Object.entries(registryData[0]).map((value: any, index: any) => {
                            return (
                              <li key={index}>
                                <RadioButton inputId={value[0]} name="data" value={value} onChange={(e) => {
                                  setData(e)
                                  setSelectedCsvData(e.value)
                                }} checked={value[1] == selectedCsvData[1]} />
                                <label>{value[1]}</label>
                              </li>
                            )
                          })}
                        </ul>
                        <Divider align="right">
                          <b>CSV data 2</b>
                        </Divider>
                        <ul>
                          {Object.entries(registryData[0]).map((value: any, index: any) => {
                            return (
                              <li key={index}>
                                <RadioButton inputId={value[0]} name="data" value={value} onChange={(e) => {
                                  setData(e)
                                  setSelectedCsvData(e.value)
                                }} checked={value[1] == selectedCsvData[1]} />
                                <label>{value[1]}</label>
                              </li>
                            )
                          })}
                        </ul>
                        <Divider align="right">
                          <b>CSV data 3</b>
                        </Divider>
                        <ul>
                          {Object.entries(registryData[0]).map((value: any, index: any) => {
                            return (
                              <li key={index}>
                                <RadioButton inputId={value[0]} name="data" value={value} onChange={(e) => {
                                  setData(e)
                                  setSelectedCsvData(e.value)
                                }} checked={value[1] == selectedCsvData[1]} />
                                <label>{value[1]}</label>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='compare-window-action-body'>
                  <Button title="Registry data is ok, Adding CSV data row to ignore list" className="btn-tooltip p-button-success">Registry data is ok</Button>
                  <Button title="Entry found in registry and CSV both, Select the column data that you want to keep" className="btn-tooltip p-button-secondary">Merge</Button>
                  <Button title="No entry found in registry, Add data row from CSV to registry" className='btn-tooltip'>Add to registry</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CsvTool
