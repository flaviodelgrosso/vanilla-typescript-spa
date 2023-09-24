import type { Cart, Menu } from "src/types";

export type Store = {
  menu: Menu | null;
  cart: Cart;
};

const Store: Store = {
  menu: null,
  cart: [],
};

const ProxiedStore = new Proxy<Store>(Store, {
  set(target, property, value) {
    target[property as keyof Store] = value;
    if (property === "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if (property === "cart") {
      window.dispatchEvent(new Event("appcartchange"));
    }
    return true;
  },
  get(target, property) {
    return target[property as keyof Store];
  },
});

export default ProxiedStore;
