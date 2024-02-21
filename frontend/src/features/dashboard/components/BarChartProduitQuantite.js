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

function BarChartProduitQuantite(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = ['Produit 1', 'Produit 2', 'Produit 3', 'Produit 4', 'Produit 5'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Vente en Quantité',
            data: labels.map(() => { return Math.random() * 1000 + 500 }),
            backgroundColor: 'rgba(236,21,187)',
          },
          
        ],
      };

    return(
      <TitleCard title={"Top 5 Produits En Quantité"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChartProduitQuantite