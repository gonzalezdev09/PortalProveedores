'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook para obtener parámetros de ruta
import { OrderDetail, OrderStatus, OrderType } from '../../types'; // Ajusta la ruta si types.ts está en otro lugar
import styles from './OrderDetail.module.css';

// --- Simulación de API para obtener detalle de orden ---
const fetchOrderDetail = async (orderId: string): Promise<OrderDetail | null> => {
  console.log(`Simulando fetch para orden ID: ${orderId}`);
  // Simular demora de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Datos de ejemplo - busca en un mock o devuelve null si no existe
  const mockDetails: { [key: string]: OrderDetail } = {
    '1': {
      id: '1', orderNumber: 'ORD-001', claimNumber: 'SIN-123', clientName: 'Juan Pérez', status: OrderStatus.IN_PROGRESS, orderType: OrderType.REPAIR, creationDate: '2024-04-10',
      adjuster: 'Pedro Gómez', analyst: 'Ana Torres', insuredName: 'Juan Pérez', clientIdNumber: '001-1234567-8', contactPhone: '809-555-1111', policyNumber: 'POL-9876',
      vehicleMake: 'Toyota', vehicleModel: 'Corolla', vehicleYear: 2019, vehicleVin: 'ABC123XYZ789', vehiclePlate: 'A123456', vehicleColor: 'Rojo',
      history: [
        { timestamp: '2024-04-10T10:00:00Z', description: 'Orden creada y asignada.' },
        { timestamp: '2024-04-11T09:15:00Z', description: 'Vehículo recibido en taller.', status: OrderStatus.IN_PROGRESS, user: 'Recepción Taller' },
        { timestamp: '2024-04-12T14:30:00Z', description: 'Peritación iniciada.' },
      ]
    },
     '2': {
      id: '2', orderNumber: 'ORD-002', claimNumber: 'SIN-124', clientName: 'Ana Gómez', status: OrderStatus.PENDING, orderType: OrderType.SPARE_PART, creationDate: '2024-04-12',
      adjuster: 'Luisa Méndez', analyst: 'Carlos Ruiz', insuredName: 'Ana Gómez', clientIdNumber: '001-7654321-0', contactPhone: '829-555-2222', policyNumber: 'POL-1234',
      vehicleMake: 'Honda', vehicleModel: 'Civic', vehicleYear: 2020, vehicleVin: 'DEF456ABC123', vehiclePlate: 'A654321', vehicleColor: 'Azul',
      history: [
        { timestamp: '2024-04-12T11:00:00Z', description: 'Orden creada, pendiente de cotización repuestos.' },
      ]
    },
     // Añadir más mocks si es necesario para otros IDs
  };

  return mockDetails[orderId] || 'No se encontró nada'; // Devuelve el detalle o null si no se encuentra
};
// --- Fin Simulación API ---


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


export default function OrderDetailPage() {
  const params = useParams(); // Obtener parámetros de la ruta
  const orderId = params.orderId as string; // Obtener el ID específico

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      const loadData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchOrderDetail(orderId);
          if (data) {
            setOrderDetail(data);
          } else {
            setError(`No se encontró la orden con ID: ${orderId}`);
          }
        } catch (err) {
          setError('Error al cargar los detalles de la orden.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    } else {
        setError('ID de orden no proporcionado.');
        setIsLoading(false);
    }
  }, [orderId]); // Ejecutar efecto cuando cambie el orderId

  // Formatear fecha/hora del historial
  const formatHistoryTimestamp = (timestamp: string): string => {
      try {
          return new Date(timestamp).toLocaleString('es-DO', {
              dateStyle: 'medium',
              timeStyle: 'short'
          });
      } catch {
          return timestamp; // Devolver original si hay error
      }
  };

  // Manejador para el botón de peritación (simulado)
  const handleViewAppraisal = () => {
      alert('Funcionalidad "Ver Peritación" no implementada en este ejemplo.');
      console.log('Ver peritación para orden:', orderId);
  };


  // Renderizado condicional
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <span>Cargando detalle de la orden...</span>
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorContainer}>Error: {error}</div>;
  }

  if (!orderDetail) {
    // Esto no debería ocurrir si error maneja el caso null, pero por si acaso
    return <div className={styles.errorContainer}>No se encontró la orden.</div>;
  }

  // Renderizado del detalle de la orden
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Detalle de Orden: {orderDetail.orderNumber}</h1>

      <div className={styles.contentGrid}>

        {/* Sección Información General */}
        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Información General</h2>
          <dl className={styles.dataList}>
            <dt className={styles.dataLabel}>Número de Orden:</dt>
            <dd className={styles.dataValue}>{orderDetail.orderNumber}</dd>

            <dt className={styles.dataLabel}>Fecha Creación:</dt>
            <dd className={styles.dataValue}>{new Date(orderDetail.creationDate).toLocaleDateString('es-DO')}</dd>

            <dt className={styles.dataLabel}>Estado Actual:</dt>
            <dd className={styles.dataValue}>
                 <span className={`${styles.statusBadge} ${getStatusBadgeClass(orderDetail.status)}`}>
                    {orderDetail.status}
                 </span>
            </dd>

            <dt className={styles.dataLabel}>Tipo de Trabajo:</dt>
            <dd className={styles.dataValue}>{orderDetail.orderType}</dd>

            <dt className={styles.dataLabel}>Siniestro Asociado:</dt>
            <dd className={styles.dataValue}>{orderDetail.claimNumber}</dd>

            <dt className={styles.dataLabel}>Perito Asignado:</dt>
            <dd className={styles.dataValue}>{orderDetail.adjuster || 'N/A'}</dd>

            <dt className={styles.dataLabel}>Analista Asignado:</dt>
            <dd className={styles.dataValue}>{orderDetail.analyst || 'N/A'}</dd>
          </dl>
        </section>

        {/* Sección Datos del Cliente */}
        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Datos del Cliente</h2>
           <dl className={styles.dataList}>
             <dt className={styles.dataLabel}>Asegurado:</dt>
             <dd className={styles.dataValue}>{orderDetail.insuredName}</dd>

             <dt className={styles.dataLabel}>Contratante:</dt>
             <dd className={styles.dataValue}>{orderDetail.contractingParty || orderDetail.insuredName}</dd>

             <dt className={styles.dataLabel}>Cédula/RNC:</dt>
             <dd className={styles.dataValue}>{orderDetail.clientIdNumber}</dd>

             <dt className={styles.dataLabel}>Teléfono Contacto:</dt>
             <dd className={styles.dataValue}>{orderDetail.contactPhone}</dd>

             <dt className={styles.dataLabel}>No. Póliza:</dt>
             <dd className={styles.dataValue}>{orderDetail.policyNumber}</dd>

              {/* Siniestro ya está en Info General */}
             {/* <dt className={styles.dataLabel}>No. Siniestro:</dt>
             <dd className={styles.dataValue}>{orderDetail.claimNumber}</dd> */}
           </dl>
        </section>

        {/* Sección Datos del Vehículo */}
        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Datos del Vehículo</h2>
           <dl className={styles.dataList}>
              <dt className={styles.dataLabel}>Marca:</dt>
              <dd className={styles.dataValue}>{orderDetail.vehicleMake}</dd>

              <dt className={styles.dataLabel}>Modelo:</dt>
              <dd className={styles.dataValue}>{orderDetail.vehicleModel}</dd>

              <dt className={styles.dataLabel}>Año:</dt>
              <dd className={styles.dataValue}>{orderDetail.vehicleYear}</dd>

              <dt className={styles.dataLabel}>Chasis (VIN):</dt>
              <dd className={styles.dataValue}>{orderDetail.vehicleVin}</dd>

              <dt className={styles.dataLabel}>Placa:</dt>
              <dd className={styles.dataValue}>{orderDetail.vehiclePlate}</dd>

              <dt className={styles.dataLabel}>Versión:</dt>
              <dd className={styles.dataValue}>{orderDetail.vehicleVersion || 'N/A'}</dd>

              <dt className={styles.dataLabel}>Color:</dt>
              <dd className={styles.dataValue}>{orderDetail.vehicleColor || 'N/A'}</dd>
           </dl>
        </section>

        {/* Sección Peritación */}
        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Peritación</h2>
          {/* Aquí podrías mostrar un resumen si lo tienes, o solo el botón */}
          <p className={styles.dataValue}>Información detallada de la peritación.</p>
          <button onClick={handleViewAppraisal} className={styles.appraisalButton}>
             {/* Icono Opcional */}
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
             Ver Peritación
          </button>
        </section>

        {/* Sección Historial de la Orden */}
        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Historial de la Orden</h2>
          {orderDetail.history.length > 0 ? (
            <ul className={styles.historyList}>
              {orderDetail.history.map((event, index) => (
                <li key={index} className={styles.historyItem}>
                  <span className={styles.historyTimestamp}>{formatHistoryTimestamp(event.timestamp)}</span>
                  <p className={styles.historyDescription}>
                    {event.status && `Cambio a estado: ${event.status}. `}{event.description}
                  </p>
                   {event.user && <span className={styles.historyUser}>Por: {event.user}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.dataValue}>No hay historial registrado para esta orden.</p>
          )}
        </section>

      </div>
    </div>
  );
}