import CustomElement from "src/customElement.js";
import template from "./order.html?raw";
import style from "./order.css?raw";
import "src/components/cart";

@CustomElement({
  selector: "app-order",
  template,
  style,
  shadow: true,
})
export default class OrderPage extends HTMLElement {
  public connectedCallback() {
    window.addEventListener("appcartchange", () => {
      if (this.isConnected) this.render();
    });
    this.render();
  }

  private render() {
    const section = this.shadowRoot?.querySelector("section") as HTMLElement;

    if (app.store.cart.length) {
      section.innerHTML = `
        <h2>Your Order</h2>
        <ul id="order-list"></ul>
        <button>Place Order</button>
      `;

      const list = this.shadowRoot?.querySelector("#order-list") as HTMLElement;

      list.innerHTML = "";

      let total = 0;
      for (const prodInCart of app.store.cart) {
        const item = document.createElement("app-cart");
        item.dataset.item = JSON.stringify(prodInCart);
        list.appendChild(item);

        total += prodInCart.quantity * prodInCart.product.price;
      }

      list.innerHTML += `
        <li>
          <p class='total'>Total</p>
          <p class='price-total'>$${total.toFixed(2)}</p>
        </li>
    `;
    } else {
      section.innerHTML = '<p class="empty">Your order is empty</p>';
    }
  }
}
