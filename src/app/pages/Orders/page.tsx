'use client';

import React, { useState, useEffect, useMemo } from 'react';
import OrderTable from '../../components/OrderTable';
import OrderFiltersComponent from '../../components/OrderFilters'; // Importar con el nuevo nombre
import { Order, OrderStatus, OrderType, OrderFilters } from '../../types';
import styles from './Orders.module.css';

// --- Datos de Ejemplo (Simulación de Backend) ---
const mockOrders: Order[] = [
    { id: '1', orderNumber: 'ORD-001', claimNumber: 'SIN-123', clientName: 'Juan Pérez', status: OrderStatus.IN_PROGRESS, orderType: OrderType.REPAIR, creationDate: '2024-04-10' },
    { id: '2', orderNumber: 'ORD-002', claimNumber: 'SIN-124', clientName: 'Ana Gómez', status: OrderStatus.PENDING, orderType: OrderType.SPARE_PART, creationDate: '2024-04-12' },
    { id: '3', orderNumber: 'ORD-003', claimNumber: 'SIN-125', clientName: 'Carlos López', status: OrderStatus.BILLING, orderType: OrderType.REPAIR, creationDate: '2024-03-28' },
    { id: '4', orderNumber: 'ORD-004', claimNumber: 'SIN-126', clientName: 'Laura Fernández', status: OrderStatus.PAID, orderType: OrderType.INSPECTION, creationDate: '2024-03-15' },
    { id: '5', orderNumber: 'ORD-005', claimNumber: 'SIN-127', clientName: 'Pedro Martínez', status: OrderStatus.CANCELLED, orderType: OrderType.REPAIR, creationDate: '2024-04-01' },
    { id: '6', orderNumber: 'ORD-006', claimNumber: 'SIN-128', clientName: 'Sofía Ramírez', status: OrderStatus.PENDING, orderType: OrderType.REPAIR, creationDate: '2024-04-14' },
  ];
  const statusOptions = Object.values(OrderStatus);
  const typeOptions = Object.values(OrderType);
  // --- Fin Datos de Ejemplo ---
  
  export default function OrdenesAsignadasPage() {
    // Estados (sin cambios)
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [filters, setFilters] = useState<OrderFilters>({
      searchTerm: '', status: '', orderType: '', startDate: '', endDate: '',
    });
    const [isLoading, setIsLoading] = useState(true);
  
    // Efecto de carga (sin cambios)
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 700));
        setAllOrders(mockOrders);
        setIsLoading(false);
      };
      fetchData();
    }, []);
  
    // Lógica de filtrado (sin cambios)
    const filteredOrders = useMemo(() => {
       return allOrders.filter(order => {
        const searchTermLower = filters.searchTerm.toLowerCase();
        const matchesSearch = filters.searchTerm === '' ||
          order.claimNumber.toLowerCase().includes(searchTermLower) ||
          order.clientName.toLowerCase().includes(searchTermLower);
        const matchesStatus = filters.status === '' || order.status === filters.status;
        const matchesOrderType = filters.orderType === '' || order.orderType === filters.orderType;
        const matchesStartDate = filters.startDate === '' || order.creationDate >= filters.startDate;
        const matchesEndDate = filters.endDate === '' || order.creationDate <= filters.endDate;
        return matchesSearch && matchesStatus && matchesOrderType && matchesStartDate && matchesEndDate;
      });
    }, [allOrders, filters]);
  
    // Calcular indicadores (sin cambios)
    const totalOrders = allOrders.length;
    const ordersByStatus = useMemo(() => {
        const counts: { [key in OrderStatus]?: number } = {};
        allOrders.forEach(order => {
            counts[order.status] = (counts[order.status] || 0) + 1;
        });
        return counts;
    }, [allOrders]);
  
    // Manejador de filtros (sin cambios)
    const handleFilterChange = (newFilters: OrderFilters) => {
      setFilters(newFilters);
    };
  
    return (
      // ** Eliminado el div contenedor .pageContainer **
      <div>
          {/* Cabecera */}
          <div className={styles.header}>
            <h1 className={styles.title}>Listado de Órdenes Asignadas</h1>
          </div>
  
           {/* Indicadores Rápidos */}
           <div className={styles.indicatorsContainer}>
               <div className={styles.indicatorCard}>
                   <span className={styles.indicatorValue}>{totalOrders}</span>
                   <span className={styles.indicatorLabel}>Total Órdenes</span>
               </div>
               {statusOptions.map(status => (
                   <div key={status} className={styles.indicatorCard}>
                      <span className={styles.indicatorValue}>{ordersByStatus[status] || 0}</span>
                      <span className={styles.indicatorLabel}>{status}</span>
                   </div>
               ))}
           </div>
  
          {/* Filtros */}
          <OrderFiltersComponent
            filters={filters}
            onFilterChange={handleFilterChange}
            statusOptions={statusOptions}
            typeOptions={typeOptions}
          />
  
          {/* Contenido Principal (Tabla o Carga) */}
          <div className={styles.tableSection}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <span>Cargando órdenes...</span>
              </div>
            ) : (
              <OrderTable orders={filteredOrders} />
            )}
          </div>
      </div>
    );
  }