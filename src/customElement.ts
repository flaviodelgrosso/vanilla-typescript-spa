interface CustomElementConfig {
  selector: string;
  template?: string;
  style?: string;
  shadow?: boolean;
  extends?: keyof HTMLElementTagNameMap;
}

const validateSelector = (selector: string) => {
  if (selector.indexOf("-") <= 0) {
    throw new Error("The selector must contain a hyphen (-)");
  }
};

export default function CustomElement(config: CustomElementConfig) {
  validateSelector(config.selector);

  return (ClassTarget: CustomElementConstructor): any => {
    const customElement = class extends ClassTarget {
      private __connected: boolean = false;
      private __isShadowRoot: boolean;

      constructor() {
        super();
        this.__isShadowRoot = config.shadow || false;
        if (!this.shadowRoot && this.__isShadowRoot) {
          this.attachShadow({ mode: "open" });
        }
      }

      public connectedCallback() {
        this.__render();
        super.connectedCallback?.();
        this.__connected = true;
      }

      private __render() {
        if (this.__connected) return;
        const template = document.createElement("template");
        const style = `${config.style ? `<style>${config.style}</style>` : ""}`;
        template.innerHTML = `${style}${config.template ? config.template : ""}`;
        const root = this.__isShadowRoot ? this.shadowRoot : this;
        const clone = document.importNode(template.content, true);
        root?.appendChild(clone);
      }
    };

    if (!customElements.get(config.selector)) {
      customElements.define(config.selector, customElement, { extends: config.extends });
    }

    return customElement;
  };
}
