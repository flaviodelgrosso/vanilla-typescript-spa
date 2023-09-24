import routes from "./routes";
import "src/pages/404";

export default class Router {
  public init() {
    const navLinks = document.querySelectorAll<HTMLAnchorElement>("a.navlink");
    navLinks.forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = (event.target as HTMLAnchorElement).href;
        this.go(href);
      });
    });

    // It listen for history changes
    window.addEventListener("popstate", (event) => {
      this.go(event.state.route, false);
    });

    // Process initial URL
    this.go(location.pathname);
  }

  public go(pathname: string, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ pathname }, "", pathname);
    }

    const route = routes[location.pathname];

    if (route) {
      window.scrollX = 0;
      document.title = "Coffee Masters | " + route.title;

      const main = document.querySelector("#app") as HTMLElement;
      const currentPage = main.firstElementChild;

      if (currentPage) {
        currentPage.remove();
      }

      const element = document.createElement(route.component);
      main.appendChild(element);
    }
  }
}
