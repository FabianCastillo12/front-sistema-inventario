"use client";

import React from "react";
import { Card, Title, Text } from "@tremor/react";

const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

export default function HeatmapVentas({ datosVentas }) {
    // Procesar los datos para crear una matriz de ventas
    const productos = [...new Set(datosVentas.map((d) => d.producto))];
    const matrizVentas = productos.map((producto) =>
        diasSemana.map((dia) => {
            const venta = datosVentas.find(
                (d) => d.producto === producto && d.diaSemana === dia
            );
            return venta ? venta.totalVentas : 0;
        })
    );

    // Encontrar el valor máximo para la escala de colores
    const maxVenta = Math.max(...datosVentas.map((d) => d.totalVentas));

    // Función para obtener el color basado en el valor de venta
    const getColor = (venta) => {
        const intensity = venta / maxVenta;
        const hue = (1 - intensity) * 240; // De azul (240) a rojo (0)
        return `hsl(${hue}, 100%, 50%)`;
    };

    return (
        <Card className="bg-[#21222D]">
            <Title className="text-white">Heatmap de Ventas por Producto y Día</Title>
            <Text className="text-gray-400">
                Total de ventas por producto y día de la semana
            </Text>
            <div className="overflow-x-auto">
                <table className="mt-4">
                    <thead>
                        <tr>
                            <th className="px-2 py-1"></th>
                            {diasSemana.map((dia) => (
                                <th key={dia} className="px-2 py-1 text-center text-white">
                                    {dia.slice(0, 3)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, i) => (
                            <tr key={producto}>
                                <td className="px-2 py-1 text-right text-white font-semibold">
                                    {producto}
                                </td>
                                {matrizVentas[i].map((venta, j) => (
                                    <td key={`${producto}-${diasSemana[j]}`} className="px-2 py-1">
                                        <div
                                            className="w-8 h-8 rounded"
                                            style={{ backgroundColor: getColor(venta) }}
                                            title={`${producto} - ${diasSemana[j]}: ${venta}`}
                                        ></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Leyenda de la escala de colores */}
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <Text className="text-white text-sm">Bajas Ventas</Text>
                    <Text className="text-white text-sm">Altas Ventas</Text>
                </div>
                <div
                    className="h-4 mt-1"
                    style={{
                        background:
                            "linear-gradient(to right, hsl(240, 100%, 50%), hsl(0, 100%, 50%))",
                    }}
                ></div>
                <div className="flex items-center justify-between mt-1">
                    <Text className="text-white text-sm">0</Text>
                    <Text className="text-white text-sm">{maxVenta}</Text>
                </div>
            </div>
        </Card>
    );
}
