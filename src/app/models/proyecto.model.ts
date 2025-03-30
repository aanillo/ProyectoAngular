import { Usuario } from "./usuario.model";
import { Tarea } from "./tarea.model";
import { Estado } from "./estado.model";

export interface Proyecto {
    id: string;
    nombre: string;
    descripcion: string;
    colorIdentificativo: string;
    fechaFin: string;
    usuariosAsignados: Usuario[];
    tareasPorEstado: { [estadoNombre: string]: Tarea[] };
    estados: Estado[];
}