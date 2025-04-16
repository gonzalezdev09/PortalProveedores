'use client';

import React, { useState, useEffect } from 'react';
// Asumiendo que UserTable y UserModal (versión CSS Modules) están en components/
// Ajusta la ruta si es necesario
import UserTable from '../../components/UserTable'; // Reutiliza el componente de tabla CSS
import UserModal from '../../components/UserModal'; // Reutiliza el componente de modal CSS
import styles from './UsersManagementPage.module.css';
// Asumiendo que types.ts está en un nivel superior o se importa desde otro lugar
// Ajusta la ruta si es necesario
import { User, UserRole } from '../../types'; // Reutiliza tipos

// Datos de ejemplo (igual que en la versión original CSS)
const mockUsers: User[] = [
  { id: '1', name: 'Ana García', email: 'ana.garcia@proveedor.com', role: UserRole.ADMIN, status: 'Activo' },
  { id: '2', name: 'Luis Fernández', email: 'luis.fernandez@proveedor.com', role: UserRole.ORDERS, status: 'Activo' },
  { id: '3', name: 'María Rodríguez', email: 'maria.rodriguez@proveedor.com', role: UserRole.BILLING, status: 'Inactivo' },
];

const getAvailableRoles = (): UserRole[] => {
  return [UserRole.ADMIN, UserRole.ORDERS, UserRole.BILLING, UserRole.VIEWER];
};

export default function UsersManagementPage() { // Nombre del componente de página
  // Estados (igual que antes)
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto de carga (igual que antes)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(mockUsers);
      setAvailableRoles(getAvailableRoles());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Manejadores de eventos (igual que antes)
  const handleCreateUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

   const handleSaveUser = (userToSave: User) => {
    console.log("Guardando usuario (CSS):", userToSave);
    setIsLoading(true);
    setTimeout(() => {
      if (editingUser) {
        setUsers(users.map(u => u.id === userToSave.id ? userToSave : u));
      } else {
        setUsers([...users, { ...userToSave, id: `new-${Date.now()}` }]);
      }
      handleCloseModal();
      setIsLoading(false);
    }, 300);
  };

  const handleToggleStatus = (userToToggle: User) => {
     console.log("Cambiando estado (CSS):", userToToggle.id);
     setUsers(users.map(u =>
      u.id === userToToggle.id
        ? { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' }
        : u
    ));
  };

  return (
    // No se necesita el contenedor .pageContainer si el layout lo maneja
    <div>
        {/* Cabecera específica de la página */}
        <div className={styles.header}>
          <h1 className={styles.title}>Gestión de Usuarios</h1>
          <button
            onClick={handleCreateUser}
            className={styles.createButton}
            disabled={isLoading}
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
             <span>Nuevo Usuario</span>
          </button>
        </div>

        {/* Contenido Principal (Tabla o Carga) */}
        <div className={styles.tableSection}>
          {isLoading && !isModalOpen ? (
             <div className={styles.loadingContainer}>
               <div className={styles.spinner}></div>
               <span>Cargando usuarios...</span>
            </div>
          ) : (
            <UserTable
              users={users}
              onEdit={handleEditUser}
              onToggleStatus={handleToggleStatus}
              // onDelete={handleDeleteUser}
            />
          )}
        </div>

        {/* Modal (ya existente, versión CSS Modules) */}
        <UserModal
          user={editingUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          availableRoles={availableRoles}
        />
    </div>
  );
}