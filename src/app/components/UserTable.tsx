import React from 'react';
import { User } from '../types';
import styles from './UserTable.module.css'; // Importar CSS Module

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
  // onDelete?: (userId: string) => void; // Opcional
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onToggleStatus }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estatus</th>
            <th style={{ textAlign: 'center' }}>Acciones</th> {/* Alinear cabecera de acciones */}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.emptyMessageCell}>
                 <div className={styles.emptyMessageContent}>
                    {/* Podrías añadir un ícono SVG simple aquí */}
                    <span>No se encontraron usuarios.</span>
                    <span>Intenta crear uno nuevo.</span>
                 </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {/* Badge de Estatus */}
                  <span
                    className={`${styles.statusBadge} ${
                      user.status === 'Activo' ? styles.statusActive : styles.statusInactive
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className={styles.actionsCell}>
                   <div className={styles.actionsContainer}>
                        {/* Botón Editar */}
                        <button
                            onClick={() => onEdit(user)}
                            className={`${styles.actionButton} ${styles.editButton}`}
                            aria-label={`Editar ${user.name}`}
                            title="Editar"
                        >
                            {/* Icono SVG simple o texto */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        {/* Botón Activar/Desactivar */}
                        <button
                            onClick={() => onToggleStatus(user)}
                            className={`${styles.actionButton} ${user.status === 'Activo' ? styles.toggleButtonActive : styles.toggleButtonInactive}`}
                            aria-label={user.status === 'Activo' ? `Desactivar ${user.name}` : `Activar ${user.name}`}
                            title={user.status === 'Activo' ? 'Desactivar' : 'Activar'}
                        >
                            {/* Icono SVG simple o texto */}
                            {user.status === 'Activo'
                                ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="16" cy="12" r="3"></circle></svg>
                            }
                        </button>
                        {/* Botón Eliminar (Opcional) */}
                        {/*
                        <button onClick={() => onDelete(user.id)} className={styles.actionButton}>
                            Eliminar
                        </button>
                        */}
                   </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;