import React, { useState, useEffect } from "react";
import ProductModal from "@/components/productsComponents/editProduct";
import { useStore } from "@/stores/autenticacion";

const ProductTable = ({ products, onDeleteProduct }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState(null);
  const [productList, setProductList] = useState(products);
  const user = useStore((state) => state.user);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const editProduct = (open, product) => {
    setIsEditModalOpen(open);
    setFormDataEdit(product);
  };

  const handleUpdateProduct = (updatedProduct) => {
    // Actualiza la lista de productos
    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
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
              <td className="py-2 px-4 border-b">{product.precio}</td>
              <td className="py-2 px-4 border-b">{product.categoria.nombre}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => editProduct(true, product)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Modificar
                </button>
                {user.rol === "admin" && (
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
          onUpdateProduct={(updatedProduct) => {
            handleUpdateProduct(updatedProduct);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;

