// Core Modules
import type { NextPage } from 'next'
import { Button } from 'primereact/button';
import { useState } from 'react';

// Prime React
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';

// Data
import { currenciesData, pricingData } from "../../../../data/pricing-data";
import Link from 'next/link';

const PricingPlan: NextPage = () => {
  const [isAnnualy, setIsAnnualy] = useState(pricingData.isAnnualy)
  const [currency, selectedCurrency] = useState(pricingData.defaultCurrency)

  const planCost = (costArr: any, currency: string, isAnnualy: boolean) => {
    const selectedCost = costArr.filter((cost: any, index: any) => {
      return cost.currency == currency;
    })
    const parseCost: any = selectedCost[0];
    const amount = parseCost.amount * 12;
    const discount = pricingData.annuallyDiscount;
    const cost = !isAnnualy ? parseCost.amount : amount - ((discount / 100) * amount);
    return `${parseCost.sign} ${cost}`
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div className='pricing-wrapper'>
            <div className='pricing-header'>
              <h3>Pricing</h3>
            </div>
            <div className='pricing-option'>
              <div className='monthly-or-annualy'>
                <div className='monthly-text'>Monthly</div>
                <div className='switch'>
                  <InputSwitch checked={isAnnualy} onChange={(e) => setIsAnnualy(e.value)} />
                </div>
                <div className='annualy-text'>Annualy <span className='discount'>(Save {pricingData.annuallyDiscount}%)</span></div>
              </div>
              <div className='currency-selection'>
                <div className='select-currency-text'>
                  Select Currency
                </div>
                <div className='select-currency-dropdown'>
                  <Dropdown value={currency} options={currenciesData} onChange={(e: any) => selectedCurrency(e.value)} optionLabel="name" optionValue="value" placeholder="Select a City" />
                </div>
              </div>
            </div>
            <div className='plan-area'>
              <ul className='row'>
                {pricingData.plans.map((plan: any, index: any) => {
                  return (
                    <li className="col-3" key={index}>
                      <div className={plan.id == pricingData.currentUserPlan ? 'plan-body current-plan' : 'plan-body'}>
                        <div className='plan-icon'>
                          <i className={plan.icon}></i>
                        </div>
                        <div className='plan-name'>{plan.name}</div>
                        <div className='plan-cost'>{planCost(plan.cost, currency, isAnnualy)}<span>{isAnnualy ? '/Annually' : '/Monthly'}</span></div>
                        <div className='plan-features'>{
                          plan.features.map((feature: any, index: any) => {
                            return (
                              <div key={index} className="feature">
                                {feature.name}
                              </div>
                            )
                          })
                        }</div>
                        <div className='selection-button'>
                          <Button>
                            Upgrade Now
                          </Button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <Divider align="center" type="dashed">
              <b>Or</b>
            </Divider>
            <div className='row'>
              <div className='col-12'>
                <div className='custom-plan-wrapper'>
                  <div className='plan-heading'>
                    <h2>For any custom plan as per your requirements Kindly contact us</h2>
                  </div>
                  <div className='action-plan-wrapper'>
                    <Link href="/user/support" passHref><a><Button label="Contact Us" /></a></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='plan-note'>
              * VAT Included on all prices shown
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPlan
