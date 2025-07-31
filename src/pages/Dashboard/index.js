import BarCharts from '../../components/Charts/BarCharts'
import InicialMetrics from '../../components/Charts/InicialMetrics'
import  PieCharts from '../../components/Charts/PieCharts'

export default function Dashboard() {
    return (
        <div>
               
        <InicialMetrics />
        <PieCharts />
        <BarCharts />   
      
        </div>
    );
}