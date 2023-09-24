import "src/pages/home";
import "src/pages/order";
import "src/pages/product";
import "src/pages/404";

export type Route = {
  [key: string]: {
    title: string;
    component: string;
  };
};

const routes = {
  "/": { title: "Home", component: "app-home" },
  "/product": { title: "Product", component: "app-product" },
  "/order": { title: "Order", component: "app-order" },
  "*": { title: "404 | Not Found", component: "app-not-found" },
} as Route;

export default routes;
