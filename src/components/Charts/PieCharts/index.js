import * as React from "react";
import { useAnimate } from "@mui/x-charts/hooks";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { styled } from "@mui/material/styles";
import { interpolateObject } from "@mui/x-charts-vendor/d3-interpolate";
import { PieChart } from "@mui/x-charts/PieChart";
import { KeyboardArrowRight } from "@mui/icons-material";

import "./PieCharts.css";

export default function PieCharts({ dados }) {
  // Extrair dados de status
  const statusData = Object.entries(dados?.solicitacoes_por_status || {})
    .filter(([key]) => key !== "total") // remove o "total"
    .map(([key, value], idx) => ({
      id: idx,
      value,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: key === "analise"
        ? "#ffc014ff"
        : key === "agendada"
          ? "#ff8408"
          : key === "concluida"
            ? "#10B981"
            : key === "indeferida"
              ? "#858585"
              : "#8884d8",
    }));

  // Extrair dados de categoria
  const categorias = Object.keys(dados?.solicitacoes_por_categoria || {});
  const valoresCategorias = Object.values(dados?.solicitacoes_por_categoria || {});

  return (
    <div className="container-pies">
      {/* PieChart - Status */}
      <div className="pie">
        <div className="title-pies">
          Por status <KeyboardArrowRight /> <span>Todas as solicitações</span>
        </div>
        <PieChart
          series={[
            {
              data: statusData,
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 7,
              cornerRadius: 10,
              startAngle: -45,
              endAngle: 225,
              colorKey: "color",
            },
          ]}
          width={250}
          height={250}
        />
      </div>

      {/* BarChart - Categoria */}
      <div className="pie">
        <div className="title-pies">
          Por categoria <KeyboardArrowRight />{" "}
          <span>Todas as solicitações</span>
        </div>
        <ChartContainer
          xAxis={[{ scaleType: "band", data: categorias }]}
          series={[{ type: "bar", id: "base", data: valoresCategorias }]}
          height={230}
          yAxis={[{ width: 40 }]}
          margin={{ left: 20, right: 0 }}
        >
          <BarPlot
            barLabel="value"
            borderRadius={20}
            slots={{ barLabel: BarLabel }}
          />
          <ChartsXAxis />
          <ChartsYAxis />
        </ChartContainer>
      </div>
    </div>
  );
}


const Text = styled("text")(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: "none",
  fill: (theme.vars || theme)?.palette?.text?.primary,
  transition: "opacity 0.2s ease-in, fill 0.2s ease-in",
  textAnchor: "middle",
  dominantBaseline: "central",
  pointerEvents: "none",
}));

function BarLabel(props) {
  const {
    seriesId,
    dataIndex,
    color,
    isFaded,
    isHighlighted,
    classes,
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    layout,
    skipAnimation,
    ...otherProps
  } = props;

  const animatedProps = useAnimate(
    { x: x + width / 2, y: y - 8 },
    {
      initialProps: { x: x + width / 2, y: yOrigin },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element, p) => {
        element.setAttribute("x", p.x.toString());
        element.setAttribute("y", p.y.toString());
      },
      skip: skipAnimation,
    }
  );

  return (
    <Text {...otherProps} fill={color} textAnchor="middle" {...animatedProps} />
  );
}
