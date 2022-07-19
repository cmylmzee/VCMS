import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  currentCateogryId!: number | null;
  a!: string | null;

  constructor(private  productListService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts()
    });
    
  }

  listProducts() {
    // check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the id param string. convert string to a number usin the + symbol
     
      this.a= this.route.snapshot.paramMap.get('id');
     
      this.currentCateogryId  = Number(this.a);
    }else{
      // no category id avaliable default the category id 1
       this.currentCateogryId = 1;
    }
    
    // now get the products for the given category id
    this.productListService.getProductList(this.currentCateogryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
