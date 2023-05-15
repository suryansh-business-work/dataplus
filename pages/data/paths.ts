

export enum SecurePaths {
  csvToRegistryCompare = '/tool/csv-to-registry-compare',
  websiteCrawler = '/tool/website-crawler',
  emailVerifier = '/tool/email-verifier',
  emailFinder = '/tool/email-finder',
  addressVerification = '/tool/address-verification',
  phoneVerification = '/tool/phone-verification',
  whatsAppVerification = '/tool/whatsapp-verification',
  chromeExtention = '/tool/chrome-extension',
  registry = '/registry/[...id]',
  reports = '/reports',
  dashboard = '/dashboard',
  generalSetting = '/user/general-setting',
  billing = '/user/billing',
  teamManagement = '/user/team-managment',
  support = '/user/support',
  pageNotFound = '/pageNotFound',
  integration = '/user/integration',
  notifications = '/notifications',
  lists = '/lists',
  projects = '/projects'
}

export enum UnsecurePaths {
  login = '/auth/login',
  signup = '/auth/signup',
  forgotPassword = '/auth/forgot-password',
  resetPassword = '/auth/reset-password',
}

export const pathNameFn = (path: any): any => {
  let pathName = '';
  switch (path) {
    case SecurePaths.csvToRegistryCompare: pathName = 'csvToRegistryCompare'; break;
    case SecurePaths.websiteCrawler: pathName = 'websiteCrawler'; break;
    case SecurePaths.emailVerifier:  pathName = 'emailVerifier'; break;
    case SecurePaths.emailFinder:  pathName = 'emailFinder'; break;
    case SecurePaths.addressVerification:  pathName = 'addressVerification'; break;
    case SecurePaths.phoneVerification:  pathName = 'phoneVerification'; break;
    case SecurePaths.whatsAppVerification:  pathName = 'whatsAppVerification'; break;
    case SecurePaths.chromeExtention:  pathName = 'chromeExtention'; break;
    case SecurePaths.registry:  pathName = 'registry'; break;
    case SecurePaths.reports:  pathName = 'reports'; break;
    case SecurePaths.dashboard:  pathName = 'dashboard'; break;
    case SecurePaths.generalSetting:  pathName = 'generalSetting'; break;
    case SecurePaths.billing:  pathName = 'billing'; break;
    case SecurePaths.teamManagement:  pathName = 'teamManagement'; break;
    case SecurePaths.support:  pathName = 'support'; break;
    case SecurePaths.csvToRegistryCompare:  pathName = 'csvToRegistryCompare'; break;
    case SecurePaths.notifications:  pathName = 'notifications'; break;
    case SecurePaths.lists:  pathName = 'lists'; break;
    case SecurePaths.projects:  pathName = 'projects'; break;
    default:  pathName = 'pageNotFound'; break;
  }
  return pathName;
}

export const bodyHeaderData: any = {
  csvToRegistryCompare: {
    title: "CSV To Registry Compare",
    url: SecurePaths.csvToRegistryCompare,
    breadcrumb: [
      {
        label: 'Tool',
        link: ''
      },
      {
        label: 'CSV To Registry Compare',
        link: SecurePaths.csvToRegistryCompare
      }
    ],
    actions: [
      {
        buttonText: 'Start New Compaison'
      }
    ]
  },
  websiteCrawler: {
    title: "Website Crawler",
    url: SecurePaths.websiteCrawler,
    breadcrumb: [
      {
        label: 'Tool',
        link: ''
      },
      {
        label: 'Website Crawler',
        link: SecurePaths.websiteCrawler
      }
    ],
    actions: [
      {
        buttonText: 'Add Website'
      }
    ]
  },
  emailVerifier: {
    title: "Email Verifier",
    url: SecurePaths.emailVerifier,
    breadcrumb: [
      {
        label: 'Tool',
        link: ''
      },
      {
        label: 'Email Verifier',
        link: SecurePaths.emailVerifier
      }
    ],
    actions: [
      {
        buttonText: 'Add Email'
      }
    ]
  },
  emailFinder: {
    title: "Email Finder",
    url: SecurePaths.emailFinder,
    breadcrumb: [
      {
        label: 'Tool',
        link: ''
      },
      {
        label: 'Email Finder',
        link: SecurePaths.emailFinder
      }
    ],
    actions: [
      {
        buttonText: 'Find Email'
      }
    ]
  },
  addressVerification: {
    title: "Address Verification",
    url: SecurePaths.addressVerification,
    breadcrumb: [
      {
        label: 'Tool',
        link: ''
      },
      {
        label: 'Address Verification',
        link: SecurePaths.addressVerification
      }
    ],
    actions: [
      {
        buttonText: 'Add Address'
      }
    ]
  },
  phoneVerification: {
    title: "Phone Verification",
    url: SecurePaths.phoneVerification,
    breadcrumb: [
      {
        label: 'Tool',
        link: ''
      },
      {
        label: 'Phone Verification',
        link: SecurePaths.phoneVerification
      }
    ],
    actions: [
      {
        buttonText: 'Add Phone'
      }
    ]
  },
  whatsAppVerification: {
    title: "WhatsApp Verification",
    url: SecurePaths.whatsAppVerification,
    breadcrumb: [
      {
        label: 'Tool',
        link: ''
      },
      {
        label: 'WhatsApp Verification',
        link: SecurePaths.whatsAppVerification
      }
    ],
    actions: [
      {
        buttonText: 'Add WhatsApp Number'
      }
    ]
  },
  chromeExtention: {
    title: "Chrome Extention",
    url: SecurePaths.chromeExtention,
    breadcrumb: [
      {
        label: 'Tool',
        link: ''
      },
      {
        label: 'Chrome Extention',
        link: SecurePaths.chromeExtention
      }
    ],
    actions: [
      {
        buttonText: 'Download Chrome Extention'
      }
    ]
  },
  registry: {
    title: "Registry",
    url: SecurePaths.registry,
    breadcrumb: [
      {
        label: 'App',
        link: ''
      },
      {
        label: 'Registry',
        link: SecurePaths.registry
      }
    ],
    actions: [
      {
        buttonText: 'Add Registry'
      }
    ]
  },
  reports: {
    title: "Reports",
    url: SecurePaths.reports,
    breadcrumb: [
      {
        label: 'App',
        link: ''
      },
      {
        label: 'Reports',
        link: SecurePaths.reports
      }
    ],
    actions: [
      {
        buttonText: 'Export Registry'
      }
    ]
  },
  dashboard: {
    title: "Dashboard",
    url: SecurePaths.dashboard,
    breadcrumb: [
      {
        label: 'App',
        link: ''
      },
      {
        label: 'Dashboard',
        link: SecurePaths.dashboard
      }
    ],
    actions: [
      {
        buttonText: 'New Widget'
      }
    ]
  },
  generalSetting: {
    title: "General Setting",
    url: SecurePaths.generalSetting,
    breadcrumb: [
      {
        label: 'User',
        link: ''
      },
      {
        label: 'General Setting',
        link: SecurePaths.generalSetting
      }
    ]
  },
  billing: {
    title: "Billing",
    url: SecurePaths.billing,
    breadcrumb: [
      {
        label: 'User',
        link: ''
      },
      {
        label: 'Billing',
        link: SecurePaths.billing
      }
    ]
  },
  teamManagement: {
    title: "Team Management",
    url: SecurePaths.teamManagement,
    breadcrumb: [
      {
        label: 'User',
        link: ''
      },
      {
        label: 'Team Management',
        link: SecurePaths.teamManagement
      }
    ]
  },
  support: {
    title: "Support",
    url: SecurePaths.support,
    breadcrumb: [
      {
        label: 'Application',
        link: ''
      },
      {
        label: 'Support',
        link: SecurePaths.support
      }
    ]
  },
  lists: {
    title: "Lists",
    url: SecurePaths.support,
    breadcrumb: [
      {
        label: 'Application',
        link: ''
      },
      {
        label: 'Lists',
        link: SecurePaths.lists
      }
    ]
  },
  projects: {
    title: "Projects",
    url: SecurePaths.projects,
    breadcrumb: [
      {
        label: 'Application',
        link: ''
      },
      {
        label: 'Projects',
        link: SecurePaths.support
      }
    ]
  },
  pageNotFound: {
    title: "Page Not Found",
    url: SecurePaths.pageNotFound,
    breadcrumb: [
      {
        label: 'Application',
        link: ''
      },
      {
        label: 'Page Not Found',
        link: SecurePaths.pageNotFound
      }
    ]
  },
  notifications: {
    title: "Notifications",
    url: SecurePaths.notifications,
    breadcrumb: [
      {
        label: 'Application',
        link: ''
      },
      {
        label: 'Notifications',
        link: SecurePaths.notifications
      }
    ]
  }
}

export const pathData = (pathName: string): any => {
  return bodyHeaderData[pathNameFn(pathName)]
}

export const HeaderNavigation = [
  {
    label: "Dashboard",
    link: SecurePaths.dashboard
  },
  {
    label: "Data Lists",
    link: SecurePaths.lists
  },
  {
    label: "Data Enrich Tools",
    items: [
      {
        label: "CSV To Registry Compare",
        link: SecurePaths.csvToRegistryCompare
      },
      {
        label: "Website Crawler",
        link: SecurePaths.websiteCrawler
      },
      {
        label: "Email Verifier",
        link: SecurePaths.emailVerifier
      },
      {
        label: "Email Finder",
        link: SecurePaths.emailFinder
      },
      {
        label: "Address Verification",
        link: SecurePaths.addressVerification
      },
      {
        label: "Phone Verification",
        link: SecurePaths.phoneVerification
      },
      {
        label: "WhatsApp Verification",
        link: SecurePaths.whatsAppVerification
      },
      {
        label: "Chrome Extention",
        link: SecurePaths.chromeExtention
      }
    ]
  },
  {
    label: "Reports",
    link: SecurePaths.reports
  }
]

export const userNavigationData = [
  {
    label: "General Setting",
    link: SecurePaths.generalSetting,
    icon: 'fa-solid fa-user-pen'
  },
  {
    label: "Billing",
    link: SecurePaths.billing,
    icon: 'fa-solid fa-money-bills'
  },
  {
    label: "Team",
    link: SecurePaths.teamManagement,
    icon: 'fa-solid fa-users-line'
  },
  {
    label: "Support",
    link: SecurePaths.support,
    icon: 'fa-solid fa-headset'
  },
  // {
  //   label: "Integration",
  //   link: SecurePaths.integration,
  //   icon: 'fa-solid fa-circle-nodes'
  // },
  // {
  //   label: "Notifications",
  //   link: SecurePaths.integration,
  //   icon: 'fa-solid fa-bell'
  // },
  // {
  //   label: "Connected Account",
  //   link: SecurePaths.integration,
  //   icon: 'fa-solid fa-user-plus'
  // },
  // {
  //   label: "God Admin",
  //   icon: 'fa-solid fa-shapes',
  //   items: [
  //     {
  //       label: "App Config",
  //       link: SecurePaths.teamManagement,
  //       icon: 'fa-solid fa-screwdriver-wrench'
  //     },
  //     {
  //       label: "Manage Role",
  //       link: SecurePaths.teamManagement,
  //       icon: 'fa-solid fa-users'
  //     },
  //     {
  //       label: "Website",
  //       link: SecurePaths.teamManagement,
  //       icon: 'fa-brands fa-buffer'
  //     },
  //     {
  //       label: "Notifications",
  //       link: SecurePaths.teamManagement,
  //       icon: 'fa-solid fa-bell'
  //     },
  //     {
  //       label: "Subscription",
  //       link: SecurePaths.teamManagement,
  //       icon: 'fa-solid fa-people-carry-box'
  //     }
  //   ]
  // }
]