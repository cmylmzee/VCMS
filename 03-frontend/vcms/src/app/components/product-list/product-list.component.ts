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
  currentCateogryId: number =1;
  previousCateogryId: number = 1;

  a!: string | null;
  currentCategoryName!: string | null; 
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;


  constructor(private  productListService: ProductService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    debugger;

    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    });
    
  }

  listProducts() {
    debugger;

    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }

    
    

  }

 
  handleSearchProducts(){
    debugger;

    const theKeyword: string  | null = this.route.snapshot.paramMap.get('keyword');

    // now search fot he products using keyword
    this.productListService.searchProducts(theKeyword || '').subscribe(
      data=>{
        this.products = data;
      }
    )
  }


  
  handleListProducts(){
    debugger;
    
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

    //
    // Check if we have a different category than previous
    // Note : Angular will reuse a component if it is currently being viewed
    //
    
    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if(this.previousCateogryId != this.currentCateogryId){
      this.thePageNumber = 1;
    }
     
    this.previousCateogryId = this.currentCateogryId

    console.log(`currentCategoryId=${this.currentCateogryId}, thePageNumber=${this.thePageNumber}`);

    
    //now get the products for the given category id
    this.productListService.getProductListPaginate(this.thePageNumber -1 ,
                                                   this.thePageSize,
                                                   this.currentCateogryId).subscribe(this.processResult()); // BURADA DATA TUTULUYOR UNTUMA DİKKAT ET
      

   //this.productListService.getProductList(this.currentCateogryId).subscribe(
   /*   data =>{
        this.products = data;
      }
    )*/
  }


  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number +1 ; // dikkat
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }; 
  }
}
