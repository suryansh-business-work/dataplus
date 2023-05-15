import { HeaderNavigation, SecurePaths, UnsecurePaths } from "./pages/data/paths";

export const APP = {
  name: 'Octooplus',
  logo: {
    dark: '/logo-dark.svg',
    light: '/logo.svg'
  },
  navigations: {
    header: HeaderNavigation
  },
  routes: {
    unsecure: UnsecurePaths,
    secure: SecurePaths
  },
  secrets: {
    googleOAuth: '508167821875-0vrodq0g99ubkfidamr8kds0trpoe86c.apps.googleusercontent.com', // https://console.cloud.google.com/apis/credentials
    googleCaptcha: '6LfWPKAfAAAAAOGfOMvNrHkf01sV8_YL9WDDoXw9' // https://www.google.com/recaptcha/about
  }
}
