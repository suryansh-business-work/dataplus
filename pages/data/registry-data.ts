

export const registryData = [
  {
    id: '1',
    firstName: "Suryansh",
    lastName: "Srivastava",
    email: "suryansh@exyconn.com",
    phone: "+91-8791234693"
  },
  {
    id: '2',
    firstName: "Sayan",
    lastName: "Paul",
    email: "sayan@exyconn.com",
    phone: "+91-9875642893"
  },
  {
    id: '3',
    firstName: "Anshul",
    lastName: "Srivastava",
    email: "anshul@exyconn.com",
    phone: "+91-987569821"
  }
]


// export const DataType = [
//   {
//     name: 'String',
//     slug: 'string',
//     regex: '',
//     inputType: 'text'
//   },
//   {
//     name: 'Number',
//     slug: 'number',
//     regex: '',
//     inputType: 'number'
//   },
//   {
//     name: 'Email',
//     slug: 'email',
//     regex: '',
//     inputType: 'email'
//   },
//   {
//     name: 'Phone',
//     slug: 'phone',
//     regex: '',
//     inputType: 'tel'
//   },
//   {
//     name: 'String',
//     slug: 'string',
//     regex: '',
//     inputType: 'text'
//   }
// ]

export const InputType = [
  {
    name: 'Text',
    value: 'text'
  },
  // {
  //   name: 'Number',
  //   value: 'number'
  // },
  // {
  //   name: 'Checkbox',
  //   value: 'checkbox'
  // },
  // {
  //   name: 'Color',
  //   value: 'color'
  // },
  // {
  //   name: 'Date',
  //   value: 'date'
  // },
  // {
  //   name: 'Date and time Local',
  //   value: 'datetime-local'
  // },
  // {
  //   name: 'Email',
  //   value: 'email'
  // },
  // {
  //   name: 'File Upload',
  //   value: 'file'
  // },
  // {
  //   name: 'Month',
  //   value: 'month'
  // },
  // {
  //   name: 'Radio',
  //   value: 'radio'
  // },
  // {
  //   name: 'Range',
  //   value: 'range'
  // },
  // {
  //   name: 'Teleplone',
  //   value: 'tel'
  // },
  // {
  //   name: 'Time',
  //   value: 'time'
  // },
  // {
  //   name: 'URL',
  //   value: 'url'
  // },
  // {
  //   name: 'Week',
  //   value: 'week'
  // },
  // {
  //   name: 'Password',
  //   value: 'password'
  // },
  // {
  //   name: 'Dropdown',
  //   value: 'dropdown'
  // },
  // {
  //   name: 'Textarea',
  //   value: 'textarea'
  // },
  // {
  //   name: 'Rich Text Editor',
  //   value: 'rich-text'
  // },
  // {
  //   name: 'Rating',
  //   value: 'rating-input'
  // }
]

export const properties = [
  {
    name: 'First Name',
    slug: 'firstName',
    type: 'text',
    defaultValue: ''
  },
  {
    name: 'Last Name',
    slug: 'lastName',
    type: 'text',
    defaultValue: ''
  },
  {
    name: 'Email',
    slug: 'email',
    type: 'text',
    defaultValue: ''
  },
  {
    name: 'Phone',
    slug: 'phone',
    type: 'text',
    defaultValue: ''
  },
  {
    name: 'Address',
    slug: 'address',
    type: 'text',
    defaultValue: ''
  },
  {
    name: 'Gender',
    slug: 'gender',
    type: 'text',
    defaultValue: ''
  }
]

export const registryColumnData = [
  { id: '1', field: 'firstName', header: 'First Name', sortable: true, dataType: 'string', isVisible: true },
  { id: '2', field: 'lastName', header: 'Last Name', sortable: true, dataType: 'string', isVisible: true },
  { id: '3', field: 'email', header: 'Email', sortable: true, dataType: 'email', isVisible: true },
  { id: '4', field: 'phone', header: 'Phone', sortable: true, dataType: 'phone', isVisible: true }
]

export const savedFilter = [
  {
    name: 'Cold Leads',
    value: 'cold-leads'
  },
  {
    name: 'Hot Leads',
    value: 'hot-leads'
  },
  {
    name: 'Employee Data',
    value: 'employee-data'
  }
]