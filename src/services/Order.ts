import { getProductById } from "./Menu";

export async function addToCart(id: number) {
  const product = await getProductById(id);
  if (product) {
    const results = app.store.cart.filter((prodInCart) => prodInCart.product.id == id);
    if (results.length == 1) {
      app.store.cart = app.store.cart.map((p) => (p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      app.store.cart = [...app.store.cart, { product, quantity: 1 }];
    }
  }
}

export function removeFromCart(id: number) {
  app.store.cart = app.store.cart.filter((prodInCart) => prodInCart.product.id != id);
}
