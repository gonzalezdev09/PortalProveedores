import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  // Simulación de datos del usuario logueado
  // En una aplicación real, esto vendría del estado global, contexto o sesión
  const userName = "Manuel Santos";
  const companyName = "Proveedor Ejemplo SRL";
  const userInitials = userName.split(' ').map(n => n[0]).join(''); // Obtener iniciales

  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
         <div className={styles.userIcon} title={userName}>
            {userInitials} {/* Mostrar iniciales */}
         </div>
        <div className={styles.userDetails}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.companyName}>{companyName}</span>
        </div>
        {/* Aquí podrías añadir un dropdown para logout, perfil, etc. */}
      </div>
    </header>
  );
};

export default Header;