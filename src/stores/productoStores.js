import { create } from 'zustand'

export const productStores = create((set) => ({
  productPage:[],
  mostrarProduct: (data) => set({ productPage: data })

}))

