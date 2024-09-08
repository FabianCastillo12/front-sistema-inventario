import { productStores } from '@/stores/productoStores';
import React, { useEffect, useState } from 'react';
import { IoChevronBackSharp, IoChevronForward } from 'react-icons/io5';

export default function Paginacion({ products }) {
    const mostrarProduct = productStores(state => state.mostrarProduct);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const [visiblePages, setVisiblePages] = useState([]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        mostrarProduct(currentProducts);
    }, [currentPage, products]);

    useEffect(() => {
        let startPage, endPage;

        if (totalPages <= 3) {
            // Si hay 3 o menos páginas, mostrar todas
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            // Si está en la primera página
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            // Si está en la última página
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            // En otros casos, centrar la página actual
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        setVisiblePages(pages);
    }, [currentPage, totalPages]);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <nav className="w-full flex justify-center items-center m-4 ">
                <ul className="flex">
                    <li>
                        <div
                            className="cursor-pointer mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                            aria-label="Previous"
                            onClick={() => paginate(currentPage - 1)}
                        >
                            <span className="material-icons text-sm"><IoChevronBackSharp /></span>
                        </div>
                    </li>
                    {visiblePages.map((page) => (
                        <li key={page}>
                            <div
                                className={`cursor-pointer mx-1 flex h-9 w-9 items-center justify-center rounded-full p-0 text-sm ${
                                    currentPage === page
                                        ? 'bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-md shadow-green-500/20'
                                        : 'border border-blue-gray-100 bg-transparent text-blue-gray-500 hover:bg-light-300'
                                } transition duration-150 ease-in-out`}
                                onClick={() => paginate(page)}
                            >
                                {page}
                            </div>
                        </li>
                    ))}
                    <li>
                        <div
                            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                            aria-label="Next"
                            onClick={() => paginate(currentPage + 1)}
                        >
                            <span className="material-icons text-sm"><IoChevronForward /></span>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}