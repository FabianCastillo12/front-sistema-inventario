import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PdfGenerator = ({ contentRef, filename }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        setIsGenerating(true);

        // Usar html2canvas para capturar el componente
        const element = contentRef.current;

        // Configuración básica de html2canvas
        html2canvas(element, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL("image/png");

            // Crear un nuevo documento PDF
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210; // Ancho de la página A4 en mm
            const pageHeight = 297; // Alto de la página A4 en mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Escalar la imagen al ancho de la página A4

            let heightLeft = imgHeight;
            let position = 0;

            // Si la imagen es más alta que una página, se dividirá en múltiples páginas
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Guardar el PDF
            pdf.save(filename);
            setIsGenerating(false);
        });
    };

    return (
        <button
            onClick={handleDownload}
            className={`inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            disabled={isGenerating}
        >
            {isGenerating ? 'Generando PDF...' : 'Descargar PDF'}
        </button>
    );
};

export default PdfGenerator;
