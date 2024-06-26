// Component de bas extends de tout les component
import { diff, patch, render } from '../framework/engine.js';

/**
 * Represents a component in the mini-framework.
 */
export default class Component {
    /**
     * Creates a new instance of the Component class.
     * @param {string} tag - The HTML tag name for the component.
     * @param {Object} props - The properties of the component.
     * @param {Array} children - The child components of the component.
     */
    constructor(tag, props = {}, children = []) {
        this.tag = tag;
        this.props = props;
        this.children = children;
        this.domNode = render(this);
    }

    /**
     * Adds CSS class names to the component's props.
     * @param {...string} classList - The CSS class names to add.
     */
    className(...classList) {
        this.props.className += ' ' + classList.join(" ")
    }

    /**
     * Adds child components to the component.
     * @param {...Component} children - The child components to add.
     */
    addElement(...children) {
        this.children.push(...children);
    }

    /**
     * Renders the component.
     * Override this method in subclasses to define what the component renders.
     * @returns {Promise<string>} A promise that resolves to the rendered HTML string.
     */
    async render() {
        return '';
    }

    /**
     * Updates the component with new data.
     * @param {any} data - The new data to update the component with.
     * @returns {Promise<void>} A promise that resolves when the update is complete.
     */
    async update(data) {
        const oldVNode = this.vNode;
        this.vNode = await this.render();
        const patches = diff(oldVNode, this.vNode);
        await patch(this.domNode, patches);
    }

    /**
     * Sets an event listener for the specified event type.
     * @param {string} eventType - The type of event to listen for.
     * @param {Function} func - The event listener function.
     */
    actionListener(eventType, func) {
        this.props[`on${eventType}`] = (event) => {
            event.preventDefault();
            func(event.target);
            if (eventType === 'submit') {
                event.target.reset();
            }
        };
    }
}

