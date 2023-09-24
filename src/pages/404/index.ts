import CustomElement from "src/customElement";
import template from "./notfound.html?raw";

@CustomElement({
  selector: "app-not-found",
  template,
})
export default class NotFound extends HTMLElement {}
