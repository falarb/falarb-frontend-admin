import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { status, valueFormatterStatus } from "./status";
import { category, valueFormatterCategory } from "./category";
import "./PieCharts.css";
import { KeyboardArrowRight } from "@mui/icons-material";

export default function PieCharts() {
  return (
    <div className="container-pies">
      <div className="pie">
        <div className="title-pies">
          Por status <KeyboardArrowRight /> <span>Todas as solicitações</span>
        </div>
        <PieChart
          className="chart"
          series={[
            {
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
              ...data_status,

              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 10,
              startAngle: -45,
              endAngle: 225,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "normal",
              fontSize: 14,
              fill: "#fff",
            },
          }}
          {...size}
        />
      </div>
      <div className="pie">
        <div className="title-pies">
          Por categoria <KeyboardArrowRight />{" "}
          <span>Todas as solicitações</span>
        </div>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
              ...data_categoria,

              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 10,
              startAngle: -45,
              endAngle: 225,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "normal",
              fontSize: 10,
              fill: "#fff",
            },
          }}
          {...size}
        />
      </div>
    </div>
  );
}

const size = {
  width: 400,
  height: 200,
};

const data_status = {
  data: status,
  valueFormatterStatus,
};

const data_categoria = {
  data: category,
  valueFormatterCategory,
};
