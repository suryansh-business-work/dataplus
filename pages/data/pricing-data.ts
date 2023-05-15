

export const pricingData = {
  annuallyDiscount: 20,
  isAnnualy: false,
  defaultCurrency: 'usd',
  currentUserPlan: '3',
  plans: [
    {
      id: '1',
      name: "Free",
      icon: "fa-solid fa-spray-can-sparkles",
      cost: [
        {
          currency: 'usd',
          amount: 0,
          sign: '$'
        },
        {
          currency: 'inr',
          amount: 0,
          sign: '₹'
        },
        {
          currency: 'eur',
          amount: 0,
          sign: 'Є'
        }
      ],
      features: [
        {
          name: '1000 Contacts'
        },
        {
          name: '30 Days Trial'
        },
        {
          name: '24*7 Support'
        }
      ]
    },
    {
      id: '2',
      name: "Basic",
      icon: "fa-brands fa-creative-commons-remix",
      cost: [
        {
          currency: 'usd',
          amount: 20,
          sign: '$'
        },
        {
          currency: 'inr',
          amount: 1500,
          sign: '₹'
        },
        {
          currency: 'eur',
          amount: 15,
          sign: 'Є'
        }
      ],
      features: [
        {
          name: '1000 Contacts'
        },
        {
          name: '30 Days Trial'
        },
        {
          name: '24*7 Support'
        }
      ]
    },
    {
      id: '3',
      name: "Standard",
      icon: "fa-solid fa-rocket",
      cost: [
        {
          currency: 'usd',
          amount: 50,
          sign: '$'
        },
        {
          currency: 'inr',
          amount: 3000,
          sign: '₹'
        },
        {
          currency: 'eur',
          amount: 40,
          sign: 'Є'
        }
      ],
      features: [
        {
          name: '1000 Contacts'
        },
        {
          name: '30 Days Trial'
        },
        {
          name: '24*7 Support'
        }
      ]
    },
    {
      id: '4',
      name: "Enterprise",
      icon: "fa-solid fa-building-user",
      cost: [
        {
          currency: 'usd',
          amount: 200,
          sign: '$'
        },
        {
          currency: 'inr',
          amount: 2500,
          sign: '₹'
        },
        {
          currency: 'eur',
          amount: 150,
          sign: 'Є'
        }
      ],
      features: [
        {
          name: '1000 Contacts'
        },
        {
          name: '30 Days Trial'
        },
        {
          name: '24*7 Support'
        }
      ]
    }
  ]
}

export const currenciesData = [
  {
    name: 'USD',
    value: 'usd'
  },
  {
    name: 'INR',
    value: 'inr'
  },
  {
    name: 'EUR',
    value: 'eur'
  }
]