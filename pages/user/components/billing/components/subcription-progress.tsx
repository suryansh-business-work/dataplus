import type { NextPage } from 'next'
import Image from 'next/image'
import { ProgressBar } from 'primereact/progressbar'
import { Skeleton } from 'primereact/skeleton'
import { Tooltip } from 'primereact/tooltip'
import { useEffect, useState } from 'react'

const SubcriptionProgress = ({ props }: any) => {
  const [loading, setLoading] = useState(true)

  const loaderBody: any = () => {
    return <Skeleton />
  }

  const LoaderBody: any = () => {
    return <Skeleton height="2rem"/>
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, [])

  const subcription = props;
  return (
    <>
      {loading ? <div className='container-fluid'>
        <div className='row'>
          <div className='col-4 mb-3'><LoaderBody /></div>
          <div className='col-4 mb-3'><LoaderBody /></div>
          <div className='col-4 mb-3'><LoaderBody /></div>
          <div className='col-4 mb-3'><LoaderBody /></div>
          <div className='col-4 mb-3'><LoaderBody /></div>
          <div className='col-4 mb-3'><LoaderBody /></div>
          <div className='col-4 mb-3'><LoaderBody /></div>
          <div className='col-4 mb-3'><LoaderBody /></div>
        </div>
      </div> : <>
        {subcription.plan.features.map((feature: any, index: any): any => {
          return (
            <div className='col-4' key={index}>
              <div className='feature-group'>
                <span className='feature-name'>{feature.name}</span>
                {feature.values.map((value: any, index: any): any => {
                  return (<span key={index}>
                    <div className='feature-plan'>
                      <div className='plan-label'>
                        <span className='label-with-tooltips'>
                          <label>{value.name}</label>
                          <div className="flex align-items-center">
                            <Tooltip className="subcription-tooltips" target=".custom-label-icon" />
                            <i className="custom-label-icon pi pi-info-circle" data-pr-tooltip={value.info} data-pr-at="right+20 top+5" data-pr-position="right">
                            </i>
                          </div>
                        </span>
                        <span>{value.used}/{value.given}</span>
                      </div>
                      <ProgressBar value={(value.used / value.given) * 100} style={{ height: '6px' }}></ProgressBar>
                    </div>
                  </span>)
                })}
              </div>
            </div>
          )
        })}
      </>}
    </>
  )
}

export default SubcriptionProgress
