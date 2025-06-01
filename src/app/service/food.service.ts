import { Injectable } from '@angular/core';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foods: Food[] = [
    { 
        id: 1, 
        nombre: 'Carbonara', 
        categoria: 'pizza', 
        foto: 'https://th.bing.com/th/id/OIP.1CuaEW74V6fQWcGFLOIm0gHaE8?rs=1&pid=ImgDetMain', 
        descripcion: 'Pizza clásica con salsa cremosa de huevo, queso parmesano y panceta crujiente.', 
        ingredientes: 'Masa de pizza, huevo, queso parmesano, panceta, crema de leche, pimienta negra.'
    },
    { 
        id: 2, 
        nombre: 'Margherita', 
        categoria: 'pizza', 
        foto: 'https://th.bing.com/th/id/OIP.3vXDgg9sk-gM56OvTqeukgHaEK?rs=1&pid=ImgDetMain', 
        descripcion: 'Pizza tradicional con tomate, mozzarella fresca y albahaca.',
        ingredientes: 'Masa de pizza, tomate, mozzarella fresca, albahaca, aceite de oliva.'
    },
    { 
        id: 3, 
        nombre: 'Bruschetta', 
        categoria: 'entrante', 
        foto: 'https://th.bing.com/th/id/R.e3e68342b530c8ce81eafc5366b5c024?rik=4zAzpgjgqBQNFA&pid=ImgRaw&r=0', 
        descripcion: 'Tostas crujientes con tomate fresco, albahaca, ajo y aceite de oliva.',
        ingredientes: 'Pan, tomate, albahaca, ajo, aceite de oliva, sal, pimienta.'
    },
    { 
        id: 4, 
        nombre: 'Spaguetti boloñesa', 
        categoria: 'pasta', 
        foto: 'https://gourmandiz.dhnet.be/app/uploads/2021/05/spaghettibolo-4096x2731.jpg', 
        descripcion: 'Espaguetis acompañados de una rica salsa boloñesa a base de carne, tomate y especias.', 
        ingredientes: 'Espaguetis, carne molida, cebolla, ajo, tomate, zanahoria, apio, vino tinto, aceite de oliva, laurel.'
    },
    { 
        id: 5, 
        nombre: 'Tiramisu', 
        categoria: 'postre', 
        foto: 'https://www.cooknsoul.de/wp-content/uploads/2021/02/vegane-Tiramisu.jpg', 
        descripcion: 'Delicioso postre italiano con capas de bizcochos empapados en café y mascarpone cremoso.',
        ingredientes: 'Bizcochos de soletilla, café, mascarpone, huevos, azúcar, cacao en polvo.'
    },
    { 
        id: 6, 
        nombre: 'Prosciutto', 
        categoria: 'pizza', 
        foto: 'https://th.bing.com/th/id/OIP.jE1UTWUrtsnM-DGh7ltLdwHaE7?rs=1&pid=ImgDetMain', 
        descripcion: 'Pizza de jamón curado con mozzarella y un toque de aceite de oliva.', 
        ingredientes: 'Masa de pizza, jamón curado, mozzarella, aceite de oliva, albahaca.'
    },
    { 
        id: 7, 
        nombre: 'Ensalada César', 
        categoria: 'entrante', 
        foto: 'https://th.bing.com/th/id/OIP.yNPRCiR-A41-vD-5KL_ZBAHaHa?rs=1&pid=ImgDetMain', 
        descripcion: 'Ensalada fresca con lechuga, pollo a la parrilla, queso parmesano y aderezo César.',
        ingredientes: 'Lechuga romana, pollo a la parrilla, queso parmesano, croutons, aderezo César.'
    },
    { 
        id: 8, 
        nombre: 'Focaccia', 
        categoria: 'entrante', 
        foto: 'https://th.bing.com/th/id/OIP.ogGP6DTI5uszIvLhUrbauQHaE8?rs=1&pid=ImgDetMain', 
        descripcion: 'Pan plano italiano con aceite de oliva, romero y sal.',
        ingredientes: 'Harina, aceite de oliva, agua, levadura, romero, sal, azúcar.'
    },
    { 
        id: 9, 
        nombre: 'Macarrones carbonara', 
        categoria: 'pasta', 
        foto: 'https://imag.bonviveur.com/macarrones-a-la-carbonara.jpg', 
        descripcion: 'Pasta de macarrones con salsa carbonara cremosa, panceta y queso.', 
        ingredientes: 'Macarrones, panceta, crema de leche, queso parmesano, huevo, ajo.'
    },
    { 
        id: 10, 
        nombre: 'Diavola', 
        categoria: 'pizza', 
        foto: 'https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/axcdfcfmyahxjmmj99pe/pizza-diavola', 
        descripcion: 'Pizza picante con salami, tomate, mozzarella y un toque de peperoncino.', 
        ingredientes: 'Masa de pizza, salami, tomate, mozzarella, peperoncino, aceite de oliva.'
    },
    { 
        id: 11, 
        nombre: 'Vegana', 
        categoria: 'pizza', 
        foto: 'https://th.bing.com/th/id/R.6196c5e2303d2118b30e51bba15fdf8c?rik=RErqs2cJuNfVBg&pid=ImgRaw&r=0', 
        descripcion: 'Pizza vegana con verduras frescas, tomate, queso vegano y albahaca.',
        ingredientes: 'Masa de pizza, tomate, pimientos, cebolla, calabacín, queso vegano, albahaca.'
    },
    { 
        id: 12, 
        nombre: 'Crostata', 
        categoria: 'postre', 
        foto: 'https://th.bing.com/th/id/R.dad9715c299f20d60a9edef5825fdcac?rik=iKqVRFRUgASmpQ&pid=ImgRaw&r=0', 
        descripcion: 'Tarta italiana con masa crujiente rellena de mermelada de frutas.', 
        ingredientes: 'Harina, mantequilla, azúcar, huevo, mermelada de frutas (fresas, moras, frambuesas).'
    }, 
    {
        id: 13,
        nombre: 'Spaguetti',
        categoria: 'pasta',
        foto: 'https://i.pinimg.com/originals/c4/78/d7/c478d7fd8e4a54c4546001519291014c.jpg',
        descripcion: 'Clásica pasta italiana servida con una variedad de salsas, ideal para acompañar con carne, verduras o una simple salsa de tomate.', 
        ingredientes: 'Spaghetti, tomate, ajo, albahaca, aceite de oliva, sal, pimienta, queso parmesano (opcional).'
    },
    {
        id: 14,
        nombre: 'Gnocchi pomodoro',
        categoria: 'pasta',
        foto: 'https://th.bing.com/th/id/R.729fff4648a5c01e241c5573cfc975c9?rik=h7uHv3RzJJ7KTA&riu=http%3a%2f%2fwww.gnocchi.restaurant%2fgnocchi%2fimg%2fportfolio-img-1.jpg&ehk=YZZ6nH8glqrKovr9woOAEZ1Ad%2fqSuQDG1MmkMt9jkK0%3d&risl=&pid=ImgRaw&r=0',
        descripcion: 'Deliciosos gnocchis de patata acompañados de una suave salsa de tomate casera, ideal para disfrutar de un plato reconfortante y sabroso.',
        ingredientes: 'Gnocchi de patata, tomate, ajo, albahaca, aceite de oliva, sal, pimienta, queso parmesano (opcional).'
    }
];


  constructor() {}

  getAllFoods(): Food[] {
    return this.foods;
  }

  getFoodById(id: number): Food | undefined {
    return this.foods.find(f => f.id === id);
  }

  getFoodsByCategory(category: string): Food[] {
    return this.foods.filter(f => f.categoria === category);
  }
  
}
