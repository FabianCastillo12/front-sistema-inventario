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
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
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
        <nav className="w-full flex justify-center items-center m-4">
            <ul className="flex space-x-2">
                <li>
                    <button
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2A2C39] text-gray-300 hover:bg-[#343747] transition-colors duration-150 ease-in-out"
                        aria-label="Previous"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoChevronBackSharp className="w-5 h-5" />
                    </button>
                </li>
                {visiblePages.map((page) => (
                    <li key={page}>
                        <button
                            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out ${
                                currentPage === page
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md'
                                    : 'bg-[#2A2C39] text-gray-300 hover:bg-[#343747]'
                            }`}
                            onClick={() => paginate(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2A2C39] text-gray-300 hover:bg-[#343747] transition-colors duration-150 ease-in-out"
                        aria-label="Next"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <IoChevronForward className="w-5 h-5" />
                    </button>
                </li>
            </ul>
        </nav>
    );
}