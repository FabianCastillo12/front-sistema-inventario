import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(persist(
  (set) => ({
    user: {
      rol: "",
      nombre: "",
      token: ""
    },
    addUser: (newUser) => set((state) => ({
      user: {
        ...state.user,
        rol: newUser.rol,
        nombre: newUser.nombre,
        token: newUser.token
      }
    })),
  }),
  {
    name: 'user-store', // Nombre del item en localStorage
    getStorage: () => localStorage, // Especifica que usaremos localStorage
  }
));
