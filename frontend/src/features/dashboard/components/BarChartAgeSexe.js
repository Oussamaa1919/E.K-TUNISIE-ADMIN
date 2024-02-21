import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartAgeSexe(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = ['10', '20', '30', '40', '50', '60', '70', '80','90','100'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Masculin',
            data: labels.map(() => { return Math.random() * 1000 + 500 }),
            backgroundColor: 'rgba(6, 159, 241 )',
          },
          {
            label: 'Féminin',
            data: labels.map(() => { return Math.random() * 1000 + 500 }),
            backgroundColor: 'rgba(241, 6, 191)',
          },
          
        ],
      };

    return(
      <TitleCard title={"Genre et Age des utilisateurs"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChartAgeSexe