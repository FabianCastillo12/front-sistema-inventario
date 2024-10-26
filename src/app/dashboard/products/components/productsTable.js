import React, { useState, useEffect } from "react";
import ProductModal from "@/app/dashboard/products/components/editProduct";
import { useSession } from "next-auth/react";

const ProductTable = ({
  products,
  onDeleteProduct,
  onUpdateProduct,
  categoria,
}) => {
  console.log(categoria);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState(null);
  const [productList, setProductList] = useState(products);

  const { data: session, status } = useSession();
  useEffect(() => {
    setProductList(products);
  }, [products]);

  const editProduct = (open, product) => {
    setIsEditModalOpen(open);
    setFormDataEdit(product);
  };

  const getCategoryColor = (categoryName) => {
    const categoryColors = {
      "Soda Limón": "bg-green-200 text-green-900", 
      "Kola T. oro": "bg-yellow-200 text-yellow-900", 
      "Kola Tigrina": "bg-orange-100 text-orange-800",
      "Kola T. naranja": "bg-orange-300 text-orange-900",
      "Kola T. guarana": "bg-red-200 text-red-900",
      "Kola T. roja": "bg-rose-200 text-rose-900",
      "Agua Vip": "bg-blue-200 text-blue-900",
      "Bebida Alcoholica": "bg-purple-200 text-purple-900",
      "Kola T. negra": "bg-gray-200 text-gray-900",
    };

    return categoryColors[categoryName] || categoryColors["default"];
  };

  return (
    <div className="bg-[#2A2C39] rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-[#3D4059]">
        <thead>
          <tr className="bg-[#3D4059]">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
            >
              Precio
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
            >
              Categoría
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider w-52"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3D4059]">
          {productList.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-[#343747] transition-colors duration-150 ease-in-out"
            >
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm font-medium text-white">
                  {product.id}
                </div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">{product.nombre}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {new Intl.NumberFormat("es-PE", {
                    style: "currency",
                    currency: "PEN",
                  }).format(product.precio)}
                </div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
                    product.categoria.nombre
                  )}`}
                >
                  {product.categoria.nombre}
                </span>
              </td>
              <td className="py-2 whitespace-nowrap text-right">
                <div className="flex justify-end items-center pr-4">
                  <button
                    onClick={() => editProduct(true, product)}
                    className="text-[#4B84F0] hover:text-[#3D72D9] bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm mr-2"
                  >
                    Modificar
                  </button>
                  {session.user.rol === "admin" && (
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="text-red-400 hover:text-red-500 bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <ProductModal
          products={products}
          setIsEditModalOpen={setIsEditModalOpen}
          formDataEdit={formDataEdit}
          onUpdateProduct={onUpdateProduct}
          categoria={categoria}
        />
      )}
    </div>
  );
};

export default ProductTable;
