import { Usuario } from "./usuario.model";
import { Estado } from "./estado.model";

export interface Tarea {
    id: string;
    titulo: string;
    descripcion: string;
    fechaLimite: Date;
    prioridad: 'alta' | 'media' | 'baja'; 
    etiquetas: string[];
    usuarioAsignado?: Usuario; 
    estado: Estado;       
    tiempoDedicado?: string;
}