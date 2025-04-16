import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import styles from './UserModal.module.css'; // Importar CSS Module

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  availableRoles: UserRole[];
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose, onSave, availableRoles }) => {
  // Estados locales (igual que antes)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [status, setStatus] = useState<'Activo' | 'Inactivo'>('Activo');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Efecto para pre-rellenar (igual que antes)
  useEffect(() => {
    if (isOpen) { // Resetear o rellenar solo cuando se abre
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setStatus(user.status);
        } else {
            setName('');
            setEmail('');
            setRole('');
            setStatus('Activo');
        }
        setErrors({}); // Limpiar errores siempre al abrir
    }
  }, [user, isOpen]);

  // Validación (igual que antes)
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'El nombre es requerido.';
    if (!email.trim()) {
      newErrors.email = 'El email es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El formato del email no es válido.';
    }
    if (!role) newErrors.role = 'El rol es requerido.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar (igual que antes)
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const userData: User = {
      id: user?.id || `temp-${Date.now()}`,
      name,
      email,
      role: role as UserRole,
      status,
    };
    onSave(userData);
  };

  // Manejar cambio de estado (checkbox)
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked ? 'Activo' : 'Inactivo');
  };

  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;

  // Renderizar el modal
  return (
    <div className={styles.modalOverlay} onClick={onClose}> {/* Overlay para cerrar al hacer clic fuera */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> {/* Evita que clic en contenido cierre el modal */}
        {/* Cabecera del Modal */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
          </h2>
          <p className={styles.modalDescription}>
            {user ? 'Modifica los detalles del usuario.' : 'Completa los campos para añadir un nuevo usuario.'}
          </p>
        </div>

        {/* Cuerpo del Formulario */}
        <div className={styles.formBody}>
          {/* Campo Nombre */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Nombre</label>
            <div>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Ej: Juan Pérez"
                />
                {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
            </div>
          </div>

          {/* Campo Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <div>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                    placeholder="ejemplo@proveedor.com"
                />
                 {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>
          </div>

          {/* Campo Rol */}
          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.formLabel}>Rol</label>
             <div>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className={`${styles.formSelect} ${errors.role ? styles.inputError : ''}`}
                >
                    <option value="" disabled>Selecciona un rol</option>
                    {availableRoles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                    ))}
                </select>
                {errors.role && <p className={styles.errorMessage}>{errors.role}</p>}
             </div>
          </div>

          {/* Campo Estado (usando checkbox) */}
          <div className={`${styles.formGroup} ${styles.statusGroup}`}>
            <label htmlFor="status" className={styles.formLabel}>Estado</label>
            <div className={styles.statusControl}>
              <input
                type="checkbox"
                id="status"
                checked={status === 'Activo'}
                onChange={handleStatusChange}
                style={{ cursor: 'pointer' }} // Estilo inline simple para el cursor
              />
              <span>{status}</span>
            </div>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            {user ? 'Guardar Cambios' : 'Crear Usuario'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;