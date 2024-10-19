import { Routes } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'home',pathMatch:'full'
    },
    {
        path:'home', component : ListProductComponent
    },
    {
        path:'product/detail/:id',component:ProductDetailComponent
    }
];
