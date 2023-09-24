import CustomElement from "src/customElement";
import template from "./home.html?raw";
import style from "./home.css?raw";

import "src/components/product";

@CustomElement({
  selector: "app-home",
  template,
  style,
  shadow: true,
})
export default class Home extends HTMLElement {
  public connectedCallback() {
    this.render();
    window.addEventListener("appmenuchange", () => {
      this.render();
    });
  }

  private render() {
    const menuElement = this.shadowRoot?.querySelector("#menu") as HTMLElement;

    if (!app.store.menu) return (menuElement.innerHTML = "Loading...");

    menuElement.innerHTML = "";
    for (let category of app.store.menu) {
      const liCategory = document.createElement("li");
      liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class='category'>
                </ul>`;

      menuElement.appendChild(liCategory);
      category.products.map((product) => {
        const item = document.createElement("product-item");
        item.dataset.product = JSON.stringify(product);
        const list = liCategory.querySelector("ul") as HTMLUListElement;
        list.appendChild(item);
      });
    }
  }
}
