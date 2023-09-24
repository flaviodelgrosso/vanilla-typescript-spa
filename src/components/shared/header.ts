import CustomElement from "src/customElement";
import template from "./header.html?raw";

@CustomElement({
  selector: "app-header",
  template,
})
export default class Header extends HTMLElement {}
