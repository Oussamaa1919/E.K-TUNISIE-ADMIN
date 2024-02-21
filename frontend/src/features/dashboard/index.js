import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import BarChartProduitQuantite from './components/BarChartProduitQuantite'
import { useState } from 'react'
import BarChartProduitValeur from './components/BarChartProduitValeur'
import BarChartAgeSexe from './components/BarChartAgeSexe'

const statsData = [
    {title : "utilisateurs Actifs", value : "34.7 k", icon : <UserGroupIcon className='w-8 h-8'/>, description : ""},
    {title : "Nouveaux Utilisateurs", value : "1.3 K", icon : <UsersIcon className='w-8 h-8'/>, description : "Current month"},
    {title : "Total Vente", value : "456.405.023 DT", icon : <CircleStackIcon className='w-8 h-8'/>, description : ""},
    {title : "Total Vente Flash", value : "105.555.6DT", icon : <CircleStackIcon className='w-8 h-8'/>, description : ""},
    {title : "Total Vente Promo", value : "225.455.63DT", icon : <CircleStackIcon className='w-8 h-8'/>, description : ""},

]


function Dashboard(){

    

    

    const dispatch = useDispatch()
 

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/>
        
        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>



        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <BarChartProduitValeur />
                <BarChartProduitQuantite />
                <BarChart />
                <BarChartAgeSexe />
            </div>
            
        {/** ---------------------- Different stats content 2 ------------------------- */}
        
           

        {/** ---------------------- User source channels table  ------------------------- */}
        
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div>
        </>
    )
}

export default Dashboard