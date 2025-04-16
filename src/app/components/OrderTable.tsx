
import React from 'react';
import Link from 'next/link'; // Importar Link para navegación
import { Order, OrderStatus } from '../types';
import styles from './OrderTable.module.css';

interface OrderTableProps {
  orders: Order[];
}

// Helper para obtener la clase CSS del badge según el estado
const getStatusBadgeClass = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.PENDING: return styles.statusPending;
    case OrderStatus.IN_PROGRESS: return styles.statusInProgress;
    case OrderStatus.BILLING: return styles.statusBilling;
    case OrderStatus.PAID: return styles.statusPaid;
    case OrderStatus.CANCELLED: return styles.statusCancelled;
    default: return '';
  }
};

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>No. Orden</th>
            <th>No. Siniestro</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Fecha Creación</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyMessageCell}>
                 <div className={styles.emptyMessageContent}>
                    {/* Icono SVG simple */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                    <span>No hay órdenes para mostrar con los filtros actuales.</span>
                 </div>
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.claimNumber}</td>
                <td>{order.clientName}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${getStatusBadgeClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.creationDate).toLocaleDateString()}</td> {/* Formatear fecha */}
                <td className={styles.actionsCell}>
                   {/* Usar Link para navegar al detalle */}
                   <Link href={`/pages/${order.id}`} className={styles.actionButton}>
                        {/* Icono SVG simple */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        Ver Detalle
                   </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Aquí se podría añadir paginación si es necesario */}
    </div>
  );
};

export default OrderTable;