import { Pipe, PipeTransform } from "@angular/core";
import {ProductInterface} from './produkty/productInterface';

@Pipe({name: 'productFilter'})
export class ProductFilterPipe implements PipeTransform {
    transform(product : ProductInterface, min : number, max : number){
        if(product.price >= min && product.price <= max){
            
        }
    }
}