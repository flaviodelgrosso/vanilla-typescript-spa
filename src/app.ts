import "./styles/index.css";

import Router from "src/router";
import Store from "src/store";
import API from "src/services/API";
import "src/components/shared/header";

window.app = {} as App;

app.store = Store;
app.router = new Router();

window.addEventListener("DOMContentLoaded", async () => {
  app.router.init();
  const data = await API.fetchMenu();
  app.store.menu = data;
});

navigator.serviceWorker.register("/serviceWorker.js");

window.addEventListener("appcartchange", () => {
  const badge = document.getElementById("badge") as HTMLSpanElement;
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty.toString();
  badge.hidden = qty == 0;
});
