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
  currentCategoryName!: string | null; 
  searchMode!: boolean;

  constructor(private  productListService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts()
    });
    
  }

  listProducts() {
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }

    
    

  }

  handleListProducts(){
    // check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the id param string. convert string to a number usin the + symbol
     
      this.a= this.route.snapshot.paramMap.get('id');
     
      this.currentCateogryId  = Number(this.a);
      this.currentCategoryName = this.route.snapshot.paramMap.get('name'); // <!--Bu kısımı kategori ismini dinamik bir şekilde almak için yazdım-->
    }else{
      // no category id avaliable default the category id 1
       this.currentCateogryId = 1;
       this.currentCategoryName = 'Ana Yemekler'; // <!--Bu kısımı kategori ismini dinamik bir şekilde almak için yazdım-->

    }
    
    // now get the products for the given category id
    this.productListService.getProductList(this.currentCateogryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleSearchProducts(){
    const theKeyword: string  | null = this.route.snapshot.paramMap.get('keyword');

    // now search fot he products using keyword
    this.productListService.searchProducts(theKeyword || '').subscribe(
      data=>{
        this.products = data;
      }
    )
  }
}
