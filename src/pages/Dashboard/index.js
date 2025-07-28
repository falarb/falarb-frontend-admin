import BarCharts from '../../components/BarCharts'
import InicialMetrics from '../../components/InicialMetrics'
import  PieCharts from '../../components/PieCharts'

export default function Dashboard() {
    return (
        <div>
               
        <InicialMetrics />
        <PieCharts />
        <BarCharts />   
      
        </div>
    );
}