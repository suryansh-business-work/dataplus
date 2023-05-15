

export const subcription = {
  plan: {
    name: "Standard Plan",
    price: "200 $",
    paymentType: "Recurring - Per Month",
    status: "Your current plan quota renewal on April 28, 2022 05:30 (Chennai time).",
    features: [
      {
        name: "Registry",
        values: [
          {
            name: 'Contacts Count',
            info: 'This is the total no. of contacts you will be able to upload/store inside the registry. You need to upgrade to higher plan or buy credits when your current plan`s limit is reached.',
            used: 50,
            given: 10000
          },
          {
            name: 'Exports Count',
            info: 'This is the maximum no. of contacts you can export directly in the form of .CSV file, per month.',
            used: 10,
            given: 100
          }
        ]
      },
      {
        name: "CSV Compare Tool",
        values: [
          {
            name: 'CSV Comparison Count',
            info: 'This is the no. of CSVs you can upload to compare with the contacts in the Registry, in your current plan.',
            used: 5,
            given: 10
          }
        ]
      },
      {
        name: "Email Verifier Tool",
        values: [
          {
            name: 'Email verification credits',
            info: 'This is the total no. of emails you can verify in your Registry.',
            used: 500,
            given: 2000
          }
        ]
      },
      {
        name: "Address Verifier Tool",
        values: [
          {
            name: 'Address verification credits',
            info: 'This is the total number of addresses you can verify for the contacts in your Registry.',
            used: 50,
            given: 1000
          }
        ]
      },
      {
        name: "Phone Verifier Tool",
        values: [
          {
            name: 'Phone verification credits',
            info: 'This is the total number of phone numbers you can verify inside your Registry, as per your current plan.',
            used: 50,
            given: 100
          }
        ]
      },
      {
        name: "Email Finder Tool",
        values: [
          {
            name: 'Email finder credits',
            info: 'This is the total no. of emails you can find/predict inside your Registry, when there is no email present for a contact.',
            used: 200,
            given: 5000
          }
        ]
      },
      {
        name: "Website Crawler Tool",
        values: [
          {
            name: 'Domain verification credits',
            info: 'This is the total number of website domains you can verify using the Website Crawler, as per your current plan.',
            used: 200,
            given: 5000
          }
        ]
      },
      {
        name: "WhatsApp Verification Tool",
        values: [
          {
            name: 'WhatsApp verification credits',
            info: 'This is the total number of contact phone numbers you can verify to see whether they are available on WhatsApp.',
            used: 200,
            given: 5000
          }
        ]
      },
      {
        name: "Team Management",
        values: [
          {
            name: 'Team Member Count',
            info: 'Maximun number of team member',
            used: 5,
            given: 20
          }
        ]
      }
    ]
  }
}
