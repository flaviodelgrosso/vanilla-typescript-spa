import { getProductById } from "src/services/Menu";
import { addToCart } from "src/services/Order";
import template from "./details.html?raw";
import style from "./details.css?raw";
import CustomElement from "src/customElement";

@CustomElement({
  selector: "app-product",
  template,
  style,
  shadow: true,
})
export default class DetailsPage extends HTMLElement {
  public connectedCallback() {
    this.render();
  }

  private async render() {
    const productID = new URLSearchParams(location.search).get("id");
    if (!productID) return alert("Invalid Product ID");

    const product = await getProductById(parseInt(productID));
    if (product) {
      const h2 = this.shadowRoot?.querySelector("h2");
      if (h2) h2.textContent = product.name;

      const img = this.shadowRoot?.querySelector("img");
      if (img) img.src = `/data/images/${product.image}`;

      const description = this.shadowRoot?.querySelector(".description");
      if (description) description.textContent = product.description;

      const price = this.shadowRoot?.querySelector(".price");
      if (price) price.textContent = `$ ${product.price.toFixed(2)} ea`;

      const button = this.shadowRoot?.querySelector("button");
      if (button) {
        button.addEventListener("click", () => {
          addToCart(product.id);
          app.router.go("/order");
        });
      }
    }
  }
}
