/**
 * Define los posibles roles de usuario.
 */
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
    PENDING = 'En espera de piezas',
    PENDINGCAR = 'En espera de entrada al taller',
    IN_PROGRESS = 'En ejecución',
    BILLING = 'Facturación', // Estado para cargar factura
    PAID = 'Pagado', // Estado final después del pago
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
   * Define los posibles estados de pago de una factura.
   */
  export enum InvoicePaymentStatus {
      PENDING_PAYMENT = 'Pendiente de Pago',
      PAID = 'Pagada',
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
   * Define la calidad de una pieza.
   */
  export enum PartQuality {
      NO = 'NO', // Nuevo Original
      OU = 'OU', // Original Usado
      NR = 'NR', // Nuevo Reemplazo
  }
  
  /**
   * Define la estructura de una Pieza asociada a una orden.
   */
  export interface Part {
      id: string; // ID único de la pieza en esta orden
      name: string; // Nombre o descripción de la pieza
      quantity: number;
      supplier?: string; // Proveedor de la pieza (opcional)
      quality?: PartQuality; // Calidad de la pieza (opcional)
      deliveryDays?: number; // Días de entrega estimados (opcional)
      receptionDate?: string | null; // Fecha de recepción (YYYY-MM-DD), opcional
  }
  
  /**
   * Define la estructura detallada de un objeto Orden.
   */
  export interface OrderDetail extends Order {
    adjuster?: string;
    analyst?: string;
    insuredName: string;
    contractingParty?: string;
    clientIdNumber: string;
    contactPhone: string;
    policyNumber: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: number;
    vehicleVin: string;
    vehiclePlate: string;
    vehicleVersion?: string;
    vehicleColor?: string;
    history: HistoryEvent[];
    parts?: Part[];
    vehicleReceptionDate?: string | null; // YYYY-MM-DD
    receptionComment?: string | null;
    invoiceUrl?: string | null;
    invoicePaymentStatus?: InvoicePaymentStatus | null;
    subStatus?: RepairSubStatus | null;
    // Nuevos campos para info de factura
    invoiceNcf?: string | null;
    invoiceDueDate?: string | null; // YYYY-MM-DD
    invoiceAmount?: number | null;
  }

  export enum RepairSubStatus {
    DISASSEMBLY = 'En Desarme',
    BODYWORK = 'En Desabolladura',
    PREP_PAINT = 'En preparación para pintura',
    PAINTING = 'En proceso de pintura',
    FINISHING = 'En proceso de acabado',
    ASSEMBLY = 'En proceso de armado',
    POLISHING = 'En proceso de Brillado',
    WASHING = 'En proceso de Lavado',
    READY_DELIVERY = 'Listo para la entrega',
}
  
  /**
   * Define la estructura de un evento en el historial de la orden.
   */
  export interface HistoryEvent {
    timestamp: string; // ISO 8601
    status?: OrderStatus;
    description: string;
    user?: string;
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