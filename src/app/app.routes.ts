import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { BookComponent } from './components/book/book.component';
import { UsComponent } from './components/us/us.component';
import { ItemComponent } from './components/item/item.component';
import { ConfirmComponent } from './components/confirm/confirm.component';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'carta', component: CardComponent },
    { path: 'book', component: BookComponent },
    { path: 'us', component: UsComponent },
    { path: 'item/:id', component: ItemComponent },
    { path: 'confirm', component: ConfirmComponent }
];
