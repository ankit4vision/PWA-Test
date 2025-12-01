/**
 * Component Loader - Loads common components into pages
 */

class ComponentLoader {
    constructor() {
        this.components = {};
    }

    /**
     * Load a component and insert it into the target element
     */
    async loadComponent(componentName, targetSelector) {
        try {
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }
            
            const html = await response.text();
            const target = document.querySelector(targetSelector);
            
            if (target) {
                target.innerHTML = html;
                this.components[componentName] = html;
                
                // Dispatch event that component is loaded
                document.dispatchEvent(new CustomEvent('componentLoaded', {
                    detail: { componentName, target }
                }));
                
                return true;
            } else {
                console.error(`Target selector not found: ${targetSelector}`);
                return false;
            }
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            return false;
        }
    }

    /**
     * Load multiple components
     */
    async loadComponents(components) {
        const promises = components.map(comp => 
            this.loadComponent(comp.name, comp.target)
        );
        return Promise.all(promises);
    }

    /**
     * Get cached component HTML
     */
    getComponent(componentName) {
        return this.components[componentName] || null;
    }
}

// Create global instance
const componentLoader = new ComponentLoader();

// Make available on window
if (typeof window !== 'undefined') {
    window.componentLoader = componentLoader;
}

