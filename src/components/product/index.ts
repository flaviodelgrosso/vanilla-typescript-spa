import CustomElement from "src/customElement";
import { addToCart } from "src/services/Order";
import template from "./product.html?raw";
import type { Product as TProduct } from "src/types";

@CustomElement({
  selector: "product-item",
  template,
})
export default class Product extends HTMLElement {
  connectedCallback() {
    const product = JSON.parse(this.dataset.product as string) as TProduct;
    const heading = this.querySelector("h4") as HTMLHeadingElement;
    const price = this.querySelector("p.price") as HTMLParagraphElement;
    const image = this.querySelector("img") as HTMLImageElement;
    const link = this.querySelector("a") as HTMLAnchorElement;
    heading.textContent = product.name;
    price.textContent = `$${product.price.toFixed(2)}`;
    image.src = `data/images/${product.image}`;
    link.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).tagName.toLowerCase() === "button") {
        addToCart(product.id);
      } else {
        app.router.go(`/product?id=${product.id}`);
      }
      event.preventDefault();
    });
  }
}
