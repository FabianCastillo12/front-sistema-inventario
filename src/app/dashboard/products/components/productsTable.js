import React, { useState, useEffect } from "react";
import ProductModal from "@/app/dashboard/products/components/editProduct";

import { useSession } from "next-auth/react";

const ProductTable = ({ products, onDeleteProduct, onUpdateProduct,categoria }) => {
  console.log(categoria)
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
    <div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-[#05023c]">
          <tr>
            <th className="py-2 px-4 border-b text-white">ID</th>
            <th className="py-2 px-4 border-b text-white">Nombre</th>
            <th className="py-2 px-4 border-b text-white">Precio</th>
            <th className="py-2 px-4 border-b text-white">Categoría</th>
            <th className="py-2 px-4 border-b text-white">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-black text-center">
          {productList.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.nombre}</td>
              <td className="py-2 px-4 border-b">{ Number( product.precio).toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{product.categoria.nombre}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => editProduct(true, product)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Modificar
                </button>
                {session.user.rol === "admin" && (
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="bg-red-600 ml-1 text-white py-1 px-3 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <ProductModal
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