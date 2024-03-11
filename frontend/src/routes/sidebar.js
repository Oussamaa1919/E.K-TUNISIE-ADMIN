/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import Users from '@heroicons/react/24/outline/UsersIcon'
import UsersGroup from '@heroicons/react/24/outline/UserGroupIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`


const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/app/pointdevente', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Points de Vente', // name that appear in Sidebar
  },
  {
    path: '/app/categorie', // url
    icon: <DocumentIcon className={iconClasses}/>, // icon component
    name: 'Categorie', // name that appear in Sidebar
  },
  {
    path: '/app/calcul', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Calcul', // name that appear in Sidebar
  },
  {
    path: '/app/client', // url
    icon: <UsersGroup className={iconClasses}/>, // icon component
    name: 'Clients', // name that appear in Sidebar
  },
  {
    path: '/app/clientpro', // url
    icon: <Users className={iconClasses}/>, // icon component
    name: 'Clients Pro', // name that appear in Sidebar
  },
  
  {
    path: '/app/promo', // url
    icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
    name: 'Promos', // name that appear in Sidebar
  },
 
  {
    path: '/app/venteflash', // url
    icon: <BoltIcon className={iconClasses}/>, // icon component
    name: 'Vente Flash', // name that appear in Sidebar
  },
  {
    path: '/app/produit', // url
   
    icon: <DocumentIcon className={iconClasses}/>, // icon component
    name: 'Produit', // name that appear in Sidebar
  },
  {
    path: '/app/publicité', // url
    icon: <ChartBarIcon className={iconClasses}/>, // icon component
    name: 'Publicité', // name that appear in Sidebar
  },
  
  

  
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Profile', // name that appear in Sidebar
      },
      
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Team Members', // name that appear in Sidebar
      },
    ]
  },
  
  
]

export default routes


