export interface CartItem {
  CartId: number,
  image: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartResponse {
  productId: number,
  quantity: number;
}

export function constructorCartResponse(): CartResponse {
  return {
    productId: 0,
    quantity: 0
  }
}

export function constructorCartItem(): CartItem {
  return {
    CartId: 0, // or assign a specific ID
    image: '', // provide a default image path or leave as empty string
    name: '', // default name or empty
    price: 0, // default price
    quantity: 1, // default quantity
    totalPrice: 0 // calculated total price based on quantity * price
  }
}

