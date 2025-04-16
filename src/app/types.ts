
export enum UserRole {
  ADMIN = 'Administrador',
  ORDERS = 'Encargado de Órdenes',
  BILLING = 'Encargado de Facturación',
  VIEWER = 'Solo Lectura',
}

/**
 * Define la estructura de un objeto Usuario.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Activo' | 'Inactivo';
}

/**
 * Define los posibles estados de una orden.
 */
export enum OrderStatus {
  PENDING = 'En espera',
  IN_PROGRESS = 'En ejecución',
  BILLING = 'Facturación',
  PAID = 'Pagado',
  CANCELLED = 'Cancelada',
}

/**
 * Define los posibles tipos de orden.
 */
export enum OrderType {
  REPAIR = 'Reparación Taller',
  SPARE_PART = 'Casa de Repuestos',
  INSPECTION = 'Inspección',
}

/**
 * Define la estructura básica de un objeto Orden (para listados).
 */
export interface Order {
  id: string;
  orderNumber: string;
  claimNumber: string;
  clientName: string;
  status: OrderStatus;
  orderType: OrderType;
  creationDate: string; // YYYY-MM-DD
}

/**
 * Define la estructura detallada de un objeto Orden.
 */
export interface OrderDetail extends Order {
  adjuster?: string; // Perito
  analyst?: string; // Analista
  // Datos Cliente
  insuredName: string; // Asegurado
  contractingParty?: string; // Contratante (opcional)
  clientIdNumber: string; // Cédula/RNC
  contactPhone: string;
  policyNumber: string;
  // Datos Vehículo
  vehicleMake: string; // Marca
  vehicleModel: string; // Modelo
  vehicleYear: number;
  vehicleVin: string; // Chasis
  vehiclePlate: string; // Placa
  vehicleVersion?: string; // Versión (opcional)
  vehicleColor?: string; // Color (opcional)
  // Historial
  history: HistoryEvent[];
  // Podrían añadirse datos de peritación aquí o cargarse por separado
}

/**
 * Define la estructura de un evento en el historial de la orden.
 */
export interface HistoryEvent {
  timestamp: string; // Fecha y hora del evento (ISO 8601)
  status?: OrderStatus; // Estado al que cambió (opcional)
  description: string; // Descripción del evento o nota
  user?: string; // Usuario que realizó la acción (opcional)
}

/**
 * Define la estructura del objeto de filtros para órdenes.
 */
export interface OrderFilters {
  searchTerm: string;
  status: OrderStatus | '';
  orderType: OrderType | '';
  startDate: string;
  endDate: string;
}