export enum paymentStatus {
  paid = 'Paid',
  unpaid = 'Unpaid',
  failed = 'Failed'
}

export const invoiceData = [
  {
    id: '1',
    duration: '12 March 2022 - 11 April 2022',
    status: paymentStatus.paid,
    amount: 200
  },
  {
    id: '2',
    duration: '12 April 2022 - 11 May 2022',
    status: paymentStatus.paid,
    amount: 200
  },
  {
    id: '4',
    duration: '12 June 2022 - 11 July 2022',
    status: paymentStatus.paid,
    amount: 500
  },
  {
    id: '4',
    duration: '12 June 2022 - 11 July 2022',
    status: paymentStatus.paid,
    amount: 200
  },
  {
    id: '4',
    duration: '12 June 2022 - 11 July 2022',
    status: paymentStatus.failed,
    amount: 250
  },
  {
    id: '3',
    duration: '12 May 2022 - 11 June 2022',
    status: paymentStatus.unpaid,
    amount: 200
  },
]


