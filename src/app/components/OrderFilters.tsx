import React from 'react';
import { OrderStatus, OrderType, OrderFilters } from '../types';
import styles from './OrderFilters.module.css';

interface OrderFiltersProps {
  filters: OrderFilters;
  onFilterChange: (newFilters: OrderFilters) => void;
  statusOptions: OrderStatus[];
  typeOptions: OrderType[];
}

const OrderFiltersComponent: React.FC<OrderFiltersProps> = ({
  filters,
  onFilterChange,
  statusOptions,
  typeOptions,
}) => {

  // Manejador genérico para cambios en los inputs/selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  // Manejador para limpiar filtros
  const handleClearFilters = () => {
      onFilterChange({
          searchTerm: '',
          status: '',
          orderType: '',
          startDate: '',
          endDate: ''
      });
  };

  return (
    <div className={styles.filtersContainer}>
      {/* Campo de Búsqueda */}
      <div className={styles.filterGroup}>
        <label htmlFor="searchTerm" className={styles.filterLabel}>Buscar (Siniestro/Cliente)</label>
        <input
          type="search"
          id="searchTerm"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleChange}
          className={styles.filterInput}
          placeholder="Ej: SIN-123 o Juan Pérez"
        />
      </div>

      {/* Filtro por Estado */}
      <div className={styles.filterGroup}>
        <label htmlFor="status" className={styles.filterLabel}>Estado</label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleChange}
          className={styles.filterSelect}
        >
          <option value="">Todos</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Filtro por Tipo de Orden */}
      <div className={styles.filterGroup}>
        <label htmlFor="orderType" className={styles.filterLabel}>Tipo de Orden</label>
        <select
          id="orderType"
          name="orderType"
          value={filters.orderType}
          onChange={handleChange}
          className={styles.filterSelect}
        >
          <option value="">Todos</option>
           {typeOptions.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Filtro por Rango de Fechas */}
      <div className={styles.filterGroup}>
         <label className={styles.filterLabel}>Fecha Creación (Desde - Hasta)</label>
         <div className={styles.dateRangeGroup}>
            <input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className={styles.filterInput}
                aria-label="Fecha desde"
            />
            <input
                type="date"
                id="endDate"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className={styles.filterInput}
                aria-label="Fecha hasta"
            />
         </div>
      </div>

       {/* Botón Limpiar Filtros */}
       <div className={styles.buttonGroup}>
           {/* Se necesita un label vacío o ajustar el grid si el label es requerido arriba */}
           <label className={styles.filterLabel}>&nbsp;</label> {/* Placeholder label */}
           <button onClick={handleClearFilters} className={styles.clearButton}>
               Limpiar Filtros
           </button>
       </div>
    </div>
  );
};

export default OrderFiltersComponent; // Renombrado para claridad
