'use client'; // Necesario para usePathname

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook para obtener la ruta actual
import styles from './Sidebar.module.css';

// Iconos SVG simples
const UsersIcon = () => <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const OrdersIcon = () => <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;


const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Obtener la ruta actual

  // Definir los items del menú
  const menuItems = [
    { href: '/pages/UsersManagement', label: 'Gestión Usuarios', icon: <UsersIcon /> },
    { href: '/pages/Orders', label: 'Órdenes Asignadas', icon: <OrdersIcon /> },
    // Añadir más items aquí si es necesario
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        {/* Puedes reemplazar esto con tu logo real */}
        <div className={styles.logoPlaceholder}>PORTAL</div>
      </div>
      <nav>
        <ul className={styles.navList}>
          {menuItems.map((item) => {
            // Comprobar si el enlace está activo
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href} className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Puedes añadir un footer al sidebar si lo necesitas */}
    </aside>
  );
};

export default Sidebar;