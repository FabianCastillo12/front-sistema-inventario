import { useStore } from "@/stores/autenticacion";
import ProductModal from "@/components/productsComponents/editProduct"
import React , {useState} from "react";

const ProductTable = ({ products, onEditProduct,onDeleteProduct}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState(null);
  const editProduct = (open,producto) => {
    setIsEditModalOpen(open)
    setFormDataEdit(producto)
  }
  const user = useStore((state) => state.user);
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-[#05023c]">
          <tr>
            <th className="py-2 px-4 border-b text-white text-custom-blue">
              ID
            </th>
            <th className="py-2 px-4 border-b  text-white  text-custom-blue">
              Nombre
            </th>
            <th className="py-2 px-4 border-b  text-white  text-custom-blue">
              Precio
            </th>
            <th className="py-2 px-4 border-b  text-white  text-custom-blue">
              Categoría
            </th>
            <th className="py-2 px-4 border-b   text-white text-custom-blue">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-center">
          {products &&
            products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b text-custom-blue">
                  {product.id}
                </td>
                <td className="py-2 px-4 border-b text-custom-blue">
                  {product.nombre}
                </td>
                <td className="py-2 px-4 border-b text-custom-blue">
                  {product.precio}
                </td>
                <td className="py-2 px-4 border-b text-custom-blue">
                  {product.categoria.nombre}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick= {() => editProduct(true,product)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Modificar
                  </button>
                  {user.rol == "admin" ? (
                    <button  
                    
                    onClick= {() => onDeleteProduct(product.id)}
                    className="bg-red-600  ml-1 text-white py-1 px-3 rounded hover:bg-red-700">
                      Eliminar
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table>


      {
          isEditModalOpen&&(
            <ProductModal setIsEditModalOpen={setIsEditModalOpen} editProduct={editProduct} formDataEdit={formDataEdit}/>
          )
        	}
    </div>
  );
};

export default ProductTable;
