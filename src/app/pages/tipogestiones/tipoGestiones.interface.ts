export enum Estado {
    Activo = "Activo",
    Inactivo = "Inactivo",
  }
  
export interface Tipogestiones {
    id: number;
    description: string;
    status: Estado;
}
  