import React from "react";
import "../../styles/dashboard.css"; // Importa navbar.css
import BarChartExampleWithGroups from "../graficos/barras";
import LineChartUsageExample from "../graficos/linea";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="Total Clientes" value="1,234" />
      <DashboardCard title="Ventas del Mes" value="$45,678" />
      <DashboardCard title="Productos en Stock" value="567" />
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Actividad Reciente
        </h2>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">
            No hay actividades recientes para mostrar.
          </p>
        </div>
      </div>
      <BarChartExampleWithGroups />
      <LineChartUsageExample/>
    </div>
  );
};

const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-indigo-600">{value}</p>
    </div>
  );
};

export default Dashboard;
