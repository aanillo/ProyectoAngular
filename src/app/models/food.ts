export interface Food {
    id: number,
    nombre: string,
    categoria: 'pizza' | 'pasta' | 'entrante' | 'postre';
    foto: string,
    descripcion: string,
    ingredientes: string
}