// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
    isPrivate: true,
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
    isPrivate: true,
  },
  {
    path: '/leads',
    component: Leads,
    isPrivate: true,
  },
  {
    path: '/settings-team',
    component: Team,
    isPrivate: true,
  },
  {
    path: '/calendar',
    component: Calendar,
    isPrivate: true,
  },
  {
    path: '/transactions',
    component: Transactions,
    isPrivate: true,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
    isPrivate: true,
  },
  {
    path: '/settings-billing',
    component: Bills,
    isPrivate: true,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
    isPrivate: true,
  },
  {
    path: '/features',
    component: DocFeatures,
    isPrivate: true,
  },
  {
    path: '/components',
    component: DocComponents,
    isPrivate: true,
  },
  {
    path: '/integration',
    component: Integration,
    isPrivate: true,
  },
  {
    path: '/charts',
    component: Charts,
    isPrivate: true,
  },
  {
    path: '/404',
    component: Page404,
    isPrivate: true,
  },
  {
    path: '/blank',
    component: Blank,
    isPrivate: true,
  },
]

export default routes