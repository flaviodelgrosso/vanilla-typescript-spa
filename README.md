# :coffee: Vanilla TypeScript SPA

This is a simple and improved version of a Vanilla TypeScript project, inspired by Maximiliano Firtman's [Vanilla JS: You Might Not Need a Framework](https://frontendmasters.com/courses/vanilla-js-apps/) course on [Frontend Masters](https://frontendmasters.com/). I highly recommend this course :fire:

The project uses TypeScript and Vite.js to provide a better developer experience.

## Features

The project includes the following features:

- [x] Custom Elements are a web standard that allows developers to create their own HTML elements. This feature is useful for creating reusable components that can be used across different web applications.

- [x] Shadow DOM: a web standard that allows developers to encapsulate the styling and behavior of a web component. This feature is useful for creating components that are independent of the rest of the web page.

- [x] A simple custom router that allows to navigate between different pages of single page application.

- [x] A simple custom proxy store that allows to manage the state of the UI. This feature is useful for creating reactive web applications that respond to user input.

## Plugins

The project includes the following plugins:

- [x] vite-plugin-pwa: This plugin provides support for Progressive Web Apps (PWAs) in Vite.js.

- [x] vite-tsconfig-paths: This plugin provides support for TypeScript path aliases in Vite.js. Path aliases are a way to simplify the import statements in your TypeScript code.

## Basic CustomElement decorator

The project includes a basic `CustomElement` decorator with shadow DOM support that allows developers to define a custom element with a template and style and avoid redundant code. Vite.js provides a useful way to [import assets as strings](https://vitejs.dev/guide/assets.html#importing-asset-as-string), so you can define templates and styles in separate `.html` and `.css` files and import them like `import template from "./template.html?raw"`.

```ts
@CustomElement({
  selector: "app-home",
  template,
  style,
  shadow: true,
})
```

```ts
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
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
