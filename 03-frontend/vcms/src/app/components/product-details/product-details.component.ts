import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  a!: string | null;
  theProductId!: number;
  product: Product = new Product();


  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    
    this.a= this.route.snapshot.paramMap.get('id');
    this.theProductId  = Number(this.a);
    
    this.productService.getProduct(this.theProductId).subscribe(
      (      data: any) => {
          this.product = data;
      }
    )
  }

}
