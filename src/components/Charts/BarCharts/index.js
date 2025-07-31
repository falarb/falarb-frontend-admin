import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './BarsOverview.css';


export default function BarCharts() {

    return (
    <div className="container-charts">

<BarChart

borderRadius={18}
xAxis={[{
    scaleType: "band",
    data: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
}]}
series={[
    { data: [44, 33, 52, 31, 17, 88, 95, 23, 32, 59, 36, 74], label: "Concluídos", color: "#10B981" }, 
    { data: [76, 46, 73, 88, 95, 23, 52, 31, 17, 44, 33, 52], label: "Agendados", color: "#ffbe40" }, 
    { data: [44, 33, 92, 31, 47, 17, 38, 19, 60, 29, 40, 90], label: "Em espera", color: "#ff4040" },   
]}
height={300} />
    
    </div>
       
  );
}