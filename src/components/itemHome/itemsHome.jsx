import React from 'react'
import { IoTrendingUp } from 'react-icons/io5'

export default function ItemsHome() {
  return (
   <>
     <div className="bg-[#171821] p-4 w-full  rounded-md shadow-sm md:max-w-[150px]  lg:min-w-[200px]  lg:max-w-[250px]">
        <div>
          <IoTrendingUp size={25} color="#FEB95A"/>
          <h4 className=" text-white font-semibold my-4  text-xl">
            $5K
          </h4>
          <h5 className=" text-white text-lg  font-semibold">
           Ventas totales
          </h5>
          <p className=" text-[#FEB95A] text-xs  font-semibold">
            el 10% a partir de ayer
          </p>
        </div>
      </div>
   </>
  )
}
