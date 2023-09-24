import CustomElement from "src/customElement";
import { removeFromCart } from "src/services/Order";
import type { CartItem } from "src/types";

@CustomElement({
  selector: "app-cart",
})
export default class Cart extends HTMLElement {
  public connectedCallback() {
    const item = JSON.parse(this.dataset.item as string) as CartItem;

    this.innerHTML = `
      <li>
        <p class="qty"></p>
        <p class="name"></p>
        <p class="price"></p>
        <p class="toolbar">
          <a href="#" class="delete-button">🗑️</a>
        </p>
      </li>
    `;

    const qty = this.querySelector(".qty") as HTMLElement;
    const name = this.querySelector(".name") as HTMLElement;
    const price = this.querySelector(".price") as HTMLElement;
    const deleteButton = this.querySelector(".delete-button") as HTMLElement;

    qty.textContent = `${item.quantity}x`;
    name.textContent = item.product.name;
    price.textContent = `$${item.product.price.toFixed(2)}`;
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      removeFromCart(item.product.id);
    });
  }
}
