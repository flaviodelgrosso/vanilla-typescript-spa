import { Product } from "src/types";
import API from "./API";

export async function loadData() {
  const data = await API.fetchMenu();
  app.store.menu = data;
}

export async function getProductById(id: number): Promise<Product | void> {
  if (!app.store.menu) return await loadData();

  for (let c of app.store.menu) {
    for (let p of c.products) {
      if (p.id == id) {
        return p;
      }
    }
  }
}
