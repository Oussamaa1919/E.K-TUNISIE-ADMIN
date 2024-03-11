// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Promo = lazy(() => import('../pages/protected/Promo'))
const Publicité = lazy(() => import('../pages/protected/Publicité'))
const Team = lazy(() => import('../pages/protected/Team'))
const PointDeVente = lazy(() => import('../pages/protected/PointDeVente'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const Client = lazy(() => import('../pages/protected/Client'))
const Calcul = lazy(() => import('../pages/protected/Calcul'))
const Categorie = lazy(() => import('../pages/protected/Categorie'))
const VenteFlash = lazy(() => import('../pages/protected/VenteFlash'))
const Produit = lazy(() => import('../pages/protected/Produit'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
    isPrivate: true,
  },
  {
    path: '/categorie', // the url
    component: Categorie, // view rendered
    isPrivate: true,
  },
  {
    path: '/calcul', // the url
    component: Calcul, // view rendered
    isPrivate: true,
  },
  {
    path: '/client', // the url
    component: Client, // view rendered
    isPrivate: true,
  },
  {
    path: '/produit', // the url
    component: Produit, // view rendered
    isPrivate: true,
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
    isPrivate: true,
  },
  {
    path: '/promo',
    component: Promo,
    isPrivate: true,
  },
  {
    path: '/venteflash',
    component: VenteFlash,
    isPrivate: true,
  },
  {
    path: '/settings-team',
    component: Team,
    isPrivate: true,
  },
 
  {
    path: '/pointdevente',
    component: PointDeVente,
    isPrivate: true,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
    isPrivate: true,
  },
 

  
  {
    path: '/publicité',
    component: Publicité,
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