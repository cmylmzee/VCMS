import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: string;


    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
        // BURADA ORDER ITEMS ZATEN CARTTAKİ ITEMLARI ALIYOR O YUZDEN CONSTRUCTORDA EŞLEDİK
    }
}
