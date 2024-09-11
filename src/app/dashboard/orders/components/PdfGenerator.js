import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PdfGenerator = ({ contentRef, filename }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        setIsGenerating(true);

        const element = contentRef.current;

        // Ajustamos las opciones para capturar el encabezado completo
        const options = {
            scale: 1.2,
            width: element.offsetWidth,  // Cambia scrollWidth por offsetWidth
            height: element.scrollHeight + 300, // Aumentamos ligeramente la altura
            windowWidth: element.offsetWidth - 50,  // Asegúrate de que windowWidth sea igual al ancho del elemento
            windowHeight: element.scrollHeight + 1000,
            scrollX: 0,
            scrollY: -window.scrollY - 50, // Ajustamos el punto de inicio de la captura
            useCORS: true,
            logging: true,
        };

        console.log("Opciones de captura:", options);

        try {
            const canvas = await html2canvas(element, options);

            console.log("Tamaño del canvas generado:", { width: canvas.width, height: canvas.height });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
            pdf.save(filename);
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }

        setIsGenerating(false);
    };

    return (
        <button
            onClick={handleDownload}
            className={`inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded ${isGenerating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
            disabled={isGenerating}
        >
            {isGenerating ? "Generando PDF..." : "Descargar PDF"}
        </button>
    );
};

export default PdfGenerator;