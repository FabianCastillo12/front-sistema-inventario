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

  return (
    <div className="bg-[#2A2C39] rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-[#3D4059]">
        <thead>
          <tr className="bg-[#3D4059]">
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Precio
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Categoría
            </th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider w-52">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3D4059]">
          {productList.map((product) => (
            <tr key={product.id} className="hover:bg-[#343747] transition-colors duration-150 ease-in-out">
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm font-medium text-white">{product.id}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">{product.nombre}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">{Number(product.precio).toFixed(2)}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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