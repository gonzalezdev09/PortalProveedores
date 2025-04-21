'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook para obtener parámetros de ruta
import { OrderDetail, OrderStatus, OrderType, InvoicePaymentStatus } from '../../types'; // Ajusta la ruta si types.ts está en otro lugar
import styles from './OrderDetail.module.css';

// --- Simulación de API para obtener detalle de orden ---
const fetchOrderDetail = async (orderId: string): Promise<OrderDetail | null> => {
  console.log(`Simulando fetch para orden ID: ${orderId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const mockDetails: { [key: string]: OrderDetail } = {
    '1': { /* ... Orden EN EJECUCION ... */ id: '1', orderNumber: 'ORD-001', claimNumber: 'SIN-123', clientName: 'Juan Pérez', status: OrderStatus.IN_PROGRESS, orderType: OrderType.REPAIR, creationDate: '2024-04-10', adjuster: 'Pedro Gómez', analyst: 'Ana Torres', insuredName: 'Juan Pérez', clientIdNumber: '001-1234567-8', contactPhone: '809-555-1111', policyNumber: 'POL-9876', vehicleMake: 'Toyota', vehicleModel: 'Corolla', vehicleYear: 2019, vehicleVin: 'ABC123XYZ789', vehiclePlate: 'A123456', vehicleColor: 'Rojo', history: [ { timestamp: '2024-04-10T10:00:00Z', description: 'Orden creada y asignada.' }, { timestamp: '2024-04-11T09:15:00Z', description: 'Vehículo recibido en taller.', status: OrderStatus.IN_PROGRESS, user: 'Recepción Taller' }, { timestamp: '2024-04-12T14:30:00Z', description: 'Peritación iniciada.' }, ], },
     '2': { /* ... Orden PENDIENTE PIEZAS ... */ id: '2', orderNumber: 'ORD-002', claimNumber: 'SIN-124', clientName: 'Ana Gómez', status: OrderStatus.PENDING, orderType: OrderType.SPARE_PART, creationDate: '2024-04-12', adjuster: 'Luisa Méndez', analyst: 'Carlos Ruiz', insuredName: 'Ana Gómez', clientIdNumber: '001-7654321-0', contactPhone: '829-555-2222', policyNumber: 'POL-1234', vehicleMake: 'Honda', vehicleModel: 'Civic', vehicleYear: 2020, vehicleVin: 'DEF456ABC123', vehiclePlate: 'A654321', vehicleColor: 'Azul', history: [ { timestamp: '2024-04-12T11:00:00Z', description: 'Orden creada, pendiente de cotización repuestos.' }, ], parts: [ { id: 'p1', name: 'Bumper Delantero Civic 2020', quantity: 1, receptionDate: null }, { id: 'p2', name: 'Faro Izquierdo LED', quantity: 1, receptionDate: '2024-04-18' }, { id: 'p3', name: 'Guardafango Izquierdo', quantity: 1, receptionDate: null }, ] },
    '3': { /* ... Orden en FACTURACION ... */ id: '3', orderNumber: 'ORD-003', claimNumber: 'SIN-125', clientName: 'Carlos López', status: OrderStatus.BILLING, orderType: OrderType.REPAIR, creationDate: '2024-03-28', adjuster: 'Pedro Gómez', analyst: 'Ana Torres', insuredName: 'Carlos López', clientIdNumber: '001-0001112-3', contactPhone: '809-555-4444', policyNumber: 'POL-5555', vehicleMake: 'Hyundai', vehicleModel: 'Tucson', vehicleYear: 2018, vehicleVin: 'KLM123ABC456', vehiclePlate: 'A555666', vehicleColor: 'Gris', history: [ { timestamp: '2024-04-15T10:00:00Z', description: 'Reparación finalizada, pendiente de facturación.', status: OrderStatus.BILLING, user: 'Taller Jefe' }, ], invoiceUrl: null, invoicePaymentStatus: null, },
     '4': { /* ... Orden PAGADA ... */ id: '4', orderNumber: 'ORD-004', claimNumber: 'SIN-126', clientName: 'Laura Fernández', status: OrderStatus.PAID, orderType: OrderType.INSPECTION, creationDate: '2024-03-15', adjuster: 'Luisa Méndez', analyst: 'Carlos Ruiz', insuredName: 'Laura Fernández', clientIdNumber: '001-3334445-6', contactPhone: '829-555-7777', policyNumber: 'POL-8888', vehicleMake: 'Mazda', vehicleModel: 'CX-5', vehicleYear: 2022, vehicleVin: 'EFG456HIJ789', vehiclePlate: 'A999888', vehicleColor: 'Negro', history: [ { timestamp: '2024-03-15T10:00:00Z', description: 'Inspección realizada y facturada.' }, { timestamp: '2024-03-20T14:00:00Z', description: 'Pago recibido.', status: OrderStatus.PAID, user: 'Administración' }, ], invoiceUrl: '/uploads/mock-invoice-004.pdf', invoicePaymentStatus: InvoicePaymentStatus.PAID, },
    '6': { /* ... Orden PENDIENTE VEHICULO ... */ id: '6', orderNumber: 'ORD-006', claimNumber: 'SIN-128', clientName: 'Sofía Ramírez', status: OrderStatus.PENDINGCAR, orderType: OrderType.REPAIR, creationDate: '2024-04-14', adjuster: 'Pedro Gómez', analyst: 'Ana Torres', insuredName: 'Sofía Ramírez', clientIdNumber: '001-9876543-2', contactPhone: '849-555-3333', policyNumber: 'POL-5678', vehicleMake: 'Kia', vehicleModel: 'Sportage', vehicleYear: 2021, vehicleVin: 'GHI789DEF456', vehiclePlate: 'A789012', vehicleColor: 'Blanco', history: [ { timestamp: '2024-04-14T15:00:00Z', description: 'Orden creada, en espera de entrada al taller.' }, ], vehicleReceptionDate: null, receptionComment: 'Cliente confirma traerá el vehículo el próximo Lunes.', },
  };
  return mockDetails[orderId] || null;
};
// --- Fin Simulación API ---

// Helper para obtener la clase CSS del badge de estado de orden
const getStatusBadgeClass = (status: OrderStatus): string => { /* ... (sin cambios) ... */ switch (status) { case OrderStatus.PENDING: return styles.statusPending; case OrderStatus.PENDINGCAR: return styles.statusPendingCar; case OrderStatus.IN_PROGRESS: return styles.statusInProgress; case OrderStatus.BILLING: return styles.statusBilling; case OrderStatus.PAID: return styles.statusPaid; case OrderStatus.CANCELLED: return styles.statusCancelled; default: return ''; } };
// Helper para obtener la clase CSS del badge de estado de pago
const getPaymentStatusBadgeClass = (status: InvoicePaymentStatus | null | undefined): string => { /* ... (sin cambios) ... */ if (status === InvoicePaymentStatus.PAID) return styles.paymentPaid; if (status === InvoicePaymentStatus.PENDING_PAYMENT) return styles.paymentPending; return ''; };


export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partReceptionDates, setPartReceptionDates] = useState<{ [partId: string]: string }>({});
  const [vehicleReceptionDate, setVehicleReceptionDate] = useState<string>('');
  const [receptionComment, setReceptionComment] = useState<string>('');
  const [requestType, setRequestType] = useState<'part' | 'labor' | ''>('');
  const [requestDescription, setRequestDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedInvoiceFile, setSelectedInvoiceFile] = useState<File | null>(null);
  const [isUploadingInvoice, setIsUploadingInvoice] = useState(false);

  useEffect(() => { /* ... (sin cambios en la lógica de carga inicial) ... */
    if (orderId) {
      const loadData = async () => {
        setIsLoading(true); setError(null); setPartReceptionDates({}); setVehicleReceptionDate(''); setReceptionComment(''); setRequestType(''); setRequestDescription(''); setSelectedFiles(null); setIsUploading(false); setSelectedInvoiceFile(null); setIsUploadingInvoice(false);
        try { const data = await fetchOrderDetail(orderId); if (data) { setOrderDetail(data); if (data.parts) { const initialDates: { [partId: string]: string } = {}; data.parts.forEach(part => { if (part.receptionDate) { initialDates[part.id] = part.receptionDate; } }); setPartReceptionDates(initialDates); } if (data.vehicleReceptionDate) { setVehicleReceptionDate(data.vehicleReceptionDate); } if (data.receptionComment) { setReceptionComment(data.receptionComment); } } else { setError(`No se encontró la orden con ID: ${orderId}`); } } catch (err) { setError('Error al cargar los detalles de la orden.'); console.error(err); } finally { setIsLoading(false); } };
      loadData();
    } else { setError('ID de orden no proporcionado.'); setIsLoading(false); }
  }, [orderId]);

  // --- Handlers existentes (sin cambios funcionales relevantes) ---
  const formatHistoryTimestamp = (timestamp: string): string => { try { return new Date(timestamp).toLocaleString('es-DO', { dateStyle: 'medium', timeStyle: 'short' }); } catch { return timestamp; } };
  const handleViewAppraisal = () => { alert('Funcionalidad "Ver Peritación" no implementada en este ejemplo.'); console.log('Ver peritación para orden:', orderId); };
  const handleDateChange = (partId: string, date: string) => { setPartReceptionDates(prevDates => ({ ...prevDates, [partId]: date })); };
  const handleSaveDates = () => { console.log('Guardando fechas de recepción:', partReceptionDates); alert('Fechas guardadas (simulado). Revisa la consola.'); };
  const handleVehicleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => { setVehicleReceptionDate(e.target.value); };
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setReceptionComment(e.target.value); };
  const handleSaveReception = () => { console.log('Guardando recepción vehículo:', { date: vehicleReceptionDate, comment: receptionComment }); alert('Recepción de vehículo guardada (simulado). Revisa la consola.'); };
  const handleStartExecution = () => { if (!vehicleReceptionDate) { alert('Por favor, ingrese la fecha de recepción del vehículo antes de iniciar la ejecución.'); return; } console.log(`Cambiando estado de orden ${orderId} a ${OrderStatus.IN_PROGRESS}`); setOrderDetail(prev => prev ? { ...prev, status: OrderStatus.IN_PROGRESS } : null); alert(`Orden ${orderId} actualizada a "${OrderStatus.IN_PROGRESS}" (simulado).`); };
  const handleRequestTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => { setRequestType(e.target.value as ('part' | 'labor' | '')); };
  const handleRequestDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setRequestDescription(e.target.value); };
  const handleRequestSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!requestType || !requestDescription.trim()) { alert('Por favor, seleccione un tipo y añada una descripción para la solicitud.'); return; } console.log('Enviando solicitud adicional:', { type: requestType, description: requestDescription }); alert('Solicitud adicional enviada (simulado).'); setRequestType(''); setRequestDescription(''); };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) { setSelectedFiles(e.target.files); console.log('Archivos seleccionados:', e.target.files); } };
  const handleUploadImages = async () => { if (!selectedFiles || selectedFiles.length === 0) { alert('Por favor, seleccione una o más imágenes para subir.'); return; } setIsUploading(true); console.log('Simulando subida de imágenes:', selectedFiles); await new Promise(resolve => setTimeout(resolve, 1500)); alert(`${selectedFiles.length} imágen(es) subida(s) (simulado).`); setSelectedFiles(null); const fileInput = document.getElementById('imageUpload') as HTMLInputElement; if (fileInput) fileInput.value = ''; setIsUploading(false); };
  const handleFinishAndBill = () => { if (window.confirm(`¿Está seguro que desea finalizar la reparación y pasar la orden ${orderId} a Facturación?`)) { console.log(`Cambiando estado de orden ${orderId} a ${OrderStatus.BILLING}`); setOrderDetail(prev => prev ? { ...prev, status: OrderStatus.BILLING } : null); alert(`Orden ${orderId} actualizada a "${OrderStatus.BILLING}" (simulado).`); } };
  const handleInvoiceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) { setSelectedInvoiceFile(e.target.files[0]); console.log('Factura seleccionada:', e.target.files[0]); } else { setSelectedInvoiceFile(null); } };
  const handleUploadInvoice = async () => { if (!selectedInvoiceFile) { alert('Por favor, seleccione un archivo de factura para subir.'); return; } setIsUploadingInvoice(true); console.log('Simulando subida de factura:', selectedInvoiceFile.name); await new Promise(resolve => setTimeout(resolve, 1000)); setOrderDetail(prev => prev ? { ...prev, invoiceUrl: `/uploads/mock-invoice-${orderId}.pdf`, invoicePaymentStatus: InvoicePaymentStatus.PENDING_PAYMENT } : null); alert(`Factura "${selectedInvoiceFile.name}" subida (simulado). Estado de pago: Pendiente.`); setSelectedInvoiceFile(null); const fileInput = document.getElementById('invoiceUpload') as HTMLInputElement; if (fileInput) fileInput.value = ''; setIsUploadingInvoice(false); };
  const handleMarkAsPaid = () => { if (window.confirm(`¿Marcar la factura de la orden ${orderId} como Pagada? Esta acción normalmente la realiza administración.`)) { console.log(`Marcando factura de orden ${orderId} como Pagada`); setOrderDetail(prev => prev ? { ...prev, invoicePaymentStatus: InvoicePaymentStatus.PAID, status: OrderStatus.PAID } : null); alert(`Factura de orden ${orderId} marcada como "${InvoicePaymentStatus.PAID}" (simulado).`); } };

  // ** Nuevo handler para confirmar recepción de todas las piezas **
  const handleConfirmPartsReceived = () => {
      if (!orderDetail || !orderDetail.parts) return;

      // Validar que todas las piezas tengan fecha
      const allPartsHaveDate = orderDetail.parts.every(part => partReceptionDates[part.id]);

      if (!allPartsHaveDate) {
          alert('Por favor, ingrese la fecha de recepción para todas las piezas listadas antes de continuar.');
          return;
      }

      if (window.confirm(`¿Confirma que todas las piezas (${orderDetail.parts.length}) han sido recibidas? Se cambiará el estado a "En espera de entrada al taller".`)) {
          console.log(`Cambiando estado de orden ${orderId} a ${OrderStatus.PENDINGCAR}`);
          // Simular actualización de estado localmente
          setOrderDetail(prev => prev ? { ...prev, status: OrderStatus.PENDINGCAR } : null);
          alert(`Orden ${orderId} actualizada a "${OrderStatus.PENDINGCAR}" (simulado).`);
          // Aquí iría la llamada a la API para actualizar el estado en el backend
          // y posiblemente guardar las fechas de recepción de piezas.
      }
  };


  // --- Renderizado ---
  if (isLoading) { return ( <div className={styles.loadingContainer}> <div className={styles.spinner}></div> <span>Cargando detalle de la orden...</span> </div> ); }
  if (error) { return <div className={styles.errorContainer}>Error: {error}</div>; }
  if (!orderDetail) { return <div className={styles.errorContainer}>No se encontró la orden.</div>; }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Detalle de Orden: {orderDetail.orderNumber}</h1>

      {/* Grid principal para las secciones de información */}
      <div className={styles.contentGrid}>
        {/* ... Secciones Info General, Cliente, Vehículo, Peritación, Historial (sin cambios) ... */}
        <section className={styles.infoSection}> <h2 className={styles.sectionTitle}>Información General</h2> <dl className={styles.dataList}> <dt className={styles.dataLabel}>Número de Orden:</dt><dd className={styles.dataValue}>{orderDetail.orderNumber}</dd> <dt className={styles.dataLabel}>Fecha Creación:</dt><dd className={styles.dataValue}>{new Date(orderDetail.creationDate).toLocaleDateString('es-DO')}</dd> <dt className={styles.dataLabel}>Estado Actual:</dt><dd className={styles.dataValue}><span className={`${styles.statusBadge} ${getStatusBadgeClass(orderDetail.status)}`}>{orderDetail.status}</span></dd> <dt className={styles.dataLabel}>Tipo de Trabajo:</dt><dd className={styles.dataValue}>{orderDetail.orderType}</dd> <dt className={styles.dataLabel}>Siniestro Asociado:</dt><dd className={styles.dataValue}>{orderDetail.claimNumber}</dd> <dt className={styles.dataLabel}>Perito Asignado:</dt><dd className={styles.dataValue}>{orderDetail.adjuster || 'N/A'}</dd> <dt className={styles.dataLabel}>Analista Asignado:</dt><dd className={styles.dataValue}>{orderDetail.analyst || 'N/A'}</dd> </dl> </section>
        <section className={styles.infoSection}> <h2 className={styles.sectionTitle}>Datos del Cliente</h2> <dl className={styles.dataList}> <dt className={styles.dataLabel}>Asegurado:</dt> <dd className={styles.dataValue}>{orderDetail.insuredName}</dd> <dt className={styles.dataLabel}>Contratante:</dt> <dd className={styles.dataValue}>{orderDetail.contractingParty || orderDetail.insuredName}</dd> <dt className={styles.dataLabel}>Cédula/RNC:</dt> <dd className={styles.dataValue}>{orderDetail.clientIdNumber}</dd> <dt className={styles.dataLabel}>Teléfono Contacto:</dt> <dd className={styles.dataValue}>{orderDetail.contactPhone}</dd> <dt className={styles.dataLabel}>No. Póliza:</dt> <dd className={styles.dataValue}>{orderDetail.policyNumber}</dd> </dl> </section>
        <section className={styles.infoSection}> <h2 className={styles.sectionTitle}>Datos del Vehículo</h2> <dl className={styles.dataList}> <dt className={styles.dataLabel}>Marca:</dt> <dd className={styles.dataValue}>{orderDetail.vehicleMake}</dd> <dt className={styles.dataLabel}>Modelo:</dt> <dd className={styles.dataValue}>{orderDetail.vehicleModel}</dd> <dt className={styles.dataLabel}>Año:</dt> <dd className={styles.dataValue}>{orderDetail.vehicleYear}</dd> <dt className={styles.dataLabel}>Chasis (VIN):</dt> <dd className={styles.dataValue}>{orderDetail.vehicleVin}</dd> <dt className={styles.dataLabel}>Placa:</dt> <dd className={styles.dataValue}>{orderDetail.vehiclePlate}</dd> <dt className={styles.dataLabel}>Versión:</dt> <dd className={styles.dataValue}>{orderDetail.vehicleVersion || 'N/A'}</dd> <dt className={styles.dataLabel}>Color:</dt> <dd className={styles.dataValue}>{orderDetail.vehicleColor || 'N/A'}</dd> </dl> </section>
        <section className={styles.infoSection}> <h2 className={styles.sectionTitle}>Peritación</h2> <p className={styles.dataValue}>Información detallada de la peritación.</p> <button onClick={handleViewAppraisal} className={styles.appraisalButton}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> Ver Peritación </button> </section>
        <section className={styles.infoSection}> <h2 className={styles.sectionTitle}>Historial de la Orden</h2> {orderDetail.history.length > 0 ? ( <ul className={styles.historyList}> {orderDetail.history.map((event, index) => ( <li key={index} className={styles.historyItem}> <span className={styles.historyTimestamp}>{formatHistoryTimestamp(event.timestamp)}</span> <p className={styles.historyDescription}> {event.status && `Cambio a estado: ${event.status}. `}{event.description} </p> {event.user && <span className={styles.historyUser}>Por: {event.user}</span>} </li> ))} </ul> ) : ( <p className={styles.dataValue}>No hay historial registrado para esta orden.</p> )} </section>
      </div> {/* Fin de contentGrid */}

      {/* --- Sección Recepción de Piezas (Condicional PENDING) --- */}
      {orderDetail.status === OrderStatus.PENDING && orderDetail.parts && orderDetail.parts.length > 0 && (
          <section className={styles.partsSection}>
              <h2 className={styles.sectionTitle}>Recepción de Piezas</h2>
              <ul className={styles.partsList}>
                  {orderDetail.parts.map((part) => ( <li key={part.id} className={styles.partItem}> <span className={styles.partName}>{part.name}</span> <span className={styles.partQuantity}>Cant: {part.quantity}</span> <div className={styles.partDateInputContainer}> <label htmlFor={`date-${part.id}`} className={styles.partDateLabel}> Fecha Recepción: </label> <input type="date" id={`date-${part.id}`} value={partReceptionDates[part.id] || ''} onChange={(e) => handleDateChange(part.id, e.target.value)} className={styles.partDateInput} /> </div> </li> ))}
              </ul>
              {/* ** Contenedor de botones para esta sección ** */}
              <div className={styles.partsButtonContainer}>
                    <button onClick={handleSaveDates} className={`${styles.actionButtonBase} ${styles.secondaryButton}`}>
                        Guardar Fechas
                    </button>
                    <button onClick={handleConfirmPartsReceived} className={`${styles.actionButtonBase} ${styles.primaryButton}`}>
                        Confirmar Recepción Total
                    </button>
              </div>
          </section>
      )}

       {/* --- Sección Recepción Vehículo (Condicional PENDINGCAR) --- */}
       {orderDetail.status === OrderStatus.PENDINGCAR && (
           <section className={styles.receptionSection}>
               <h2 className={styles.sectionTitle}>Recepción del Vehículo</h2>
               <div className={styles.receptionFormGroup}> <label htmlFor="vehicleReceptionDate" className={styles.receptionLabel}> Fecha de Recepción del Vehículo: </label> <input type="date" id="vehicleReceptionDate" value={vehicleReceptionDate} onChange={handleVehicleDateChange} className={styles.receptionInput} /> </div>
               <div className={styles.receptionFormGroup}> <label htmlFor="receptionComment" className={styles.receptionLabel}> Comentario de Recepción: </label> <textarea id="receptionComment" value={receptionComment} onChange={handleCommentChange} className={styles.receptionTextarea} placeholder="Detalles de lo conversado con el cliente, condición inicial, etc." rows={4} /> </div>
               <div className={styles.receptionButtonContainer}> <button onClick={handleSaveReception} className={`${styles.actionButtonBase} ${styles.secondaryButton}`}> Guardar Recepción </button> <button onClick={handleStartExecution} className={`${styles.actionButtonBase} ${styles.primaryButton}`}> Iniciar Ejecución </button> </div>
           </section>
       )}

       {/* --- Sección Acciones En Ejecución (Condicional IN_PROGRESS) --- */}
       {orderDetail.status === OrderStatus.IN_PROGRESS && (
           <section className={styles.inProgressSection}>
               <h2 className={styles.sectionTitle}>Acciones Durante Ejecución</h2>
               <form onSubmit={handleRequestSubmit} className={styles.requestForm}> <h3 className={styles.sectionSubTitle}>Solicitar Adicional</h3> <div className={styles.requestFormGroup}> <label htmlFor="requestType" className={styles.requestLabel}>Tipo de Solicitud:</label> <select id="requestType" value={requestType} onChange={handleRequestTypeChange} className={styles.requestSelect} required > <option value="" disabled>Seleccione...</option> <option value="part">Pieza Adicional</option> <option value="labor">Mano de Obra Adicional</option> </select> </div> <div className={styles.requestFormGroup}> <label htmlFor="requestDescription" className={styles.requestLabel}>Descripción / Justificación:</label> <textarea id="requestDescription" value={requestDescription} onChange={handleRequestDescriptionChange} className={styles.requestTextarea} placeholder="Detalle la pieza o mano de obra requerida y por qué..." rows={4} required /> </div> <div className={styles.buttonContainer}> <button type="submit" className={`${styles.actionButtonBase} ${styles.primaryButton}`}> Enviar Solicitud </button> </div> </form>
               <div className={styles.attachmentSection}> <h3 className={styles.sectionSubTitle}>Adjuntar Imágenes</h3> <div className={styles.receptionFormGroup}> <label htmlFor="imageUpload" className={styles.fileInputLabel}> Seleccionar Imágenes </label> <input type="file" id="imageUpload" multiple accept="image/*" onChange={handleFileChange} className={styles.fileInput} /> {selectedFiles && selectedFiles.length > 0 && ( <span className={styles.fileName}> {selectedFiles.length} archivo(s) seleccionado(s): {Array.from(selectedFiles).map(f => f.name).join(', ')} </span> )} </div> <div className={styles.buttonContainer} style={{marginTop: '5px'}}> <button onClick={handleUploadImages} className={`${styles.actionButtonBase} ${styles.primaryButton}`} disabled={!selectedFiles || selectedFiles.length === 0 || isUploading} > {isUploading ? 'Subiendo...' : 'Subir Imágenes'} </button> </div> </div>
               <div className={styles.buttonContainer} style={{marginTop: '30px', borderTop: '1px solid #f3f4f6', paddingTop: '15px'}}> <button onClick={handleFinishAndBill} className={`${styles.actionButtonBase} ${styles.primaryButton}`}> Finalizar Reparación y Facturar </button> </div>
           </section>
       )}

       {/* --- Sección Facturación (Condicional BILLING) --- */}
       {orderDetail.status === OrderStatus.BILLING && (
           <section className={styles.billingSection}>
                <h2 className={styles.sectionTitle}>Facturación</h2>
                {!orderDetail.invoiceUrl ? (
                    <div> <h3 className={styles.sectionSubTitle}>Cargar Factura</h3> <div className={styles.receptionFormGroup}> <label htmlFor="invoiceUpload" className={styles.fileInputLabel}> Seleccionar Factura (.pdf, .xml, .jpg) </label> <input type="file" id="invoiceUpload" accept=".pdf,.xml,.jpg,.jpeg,.png" onChange={handleInvoiceFileChange} className={styles.fileInput} /> {selectedInvoiceFile && ( <span className={styles.fileName}> Archivo: {selectedInvoiceFile.name} </span> )} </div> <div className={styles.buttonContainer}> <button onClick={handleUploadInvoice} className={`${styles.actionButtonBase} ${styles.primaryButton}`} disabled={!selectedInvoiceFile || isUploadingInvoice} > {isUploadingInvoice ? 'Subiendo...' : 'Subir Factura'} </button> </div> </div>
                ) : (
                    <div> <h3 className={styles.sectionSubTitle}>Información de Factura</h3> <div className={styles.invoiceInfo}> <span className={styles.invoiceLink}> Factura Cargada: <a href={orderDetail.invoiceUrl} target="_blank" rel="noopener noreferrer">Ver Factura</a> </span> <div> <span className={styles.paymentStatusLabel}>Estado Pago:</span> <span className={`${styles.paymentStatusBadge} ${getPaymentStatusBadgeClass(orderDetail.invoicePaymentStatus)}`}> {orderDetail.invoicePaymentStatus || 'N/D'} </span> </div> </div> {orderDetail.invoicePaymentStatus === InvoicePaymentStatus.PENDING_PAYMENT && ( <div className={styles.buttonContainer} style={{marginTop: '20px'}}> <button onClick={handleMarkAsPaid} className={`${styles.actionButtonBase} ${styles.secondaryButton}`} title="Esta acción normalmente la realiza administración" > Marcar como Pagada (Sim) </button> </div> )} </div>
                )}
           </section>
       )}

    </div>
  );
}
