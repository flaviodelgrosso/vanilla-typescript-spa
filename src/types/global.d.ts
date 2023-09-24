import Router from "src/router";
import type { Store } from "src/store";

declare global {
  interface Window {
    app: App;
  }

  interface App {
    router: Router;
    store: Store;
  }

  declare const app: App;

  interface HTMLElement {
    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
     * @description Useful for running setup code, such as fetching resources or rendering.
     */
    connectedCallback?(): void;
    /**
     * Invoked each time the custom element is disconnected from the document's DOM.
     * @description Useful for running clean up code.
     * For example, if you add an event listener in `connectedCallback`, you can remove it in `disconnectedCallback`.
     * @example
     */
    disconnectedCallback?(): void;
    /**
     * Invoked each time the custom element is moved to a new document.
     */
    adoptedCallback?(): void;
    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     */
    attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;
    /**
     * An array of attribute names whose values should be observed.
     * @description When one of these attributes changes, `attributeChangedCallback` is invoked.
     */
    observedAttributes?: string[];
  }
}
