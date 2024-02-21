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

function BarChart(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = ['E.K Lac 1', 'E.K Ariana', 'E.K T.M', 'E.K Carthage', 'E.K Gammarth', 'E.K Azure City', 'E.K tunis'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'total Vente ',
            data: labels.map(() => { return Math.random() * 1000 + 500 }),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          
        ],
      };

    return(
      <TitleCard title={"Revenue Des Points De Ventes "}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChart