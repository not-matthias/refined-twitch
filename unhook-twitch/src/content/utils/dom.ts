import $ from 'jquery';

// Source: https://paul.kinlan.me/waiting-for-an-element-to-be-created/
export function waitForElement(selector: string): Promise<Element> {
    return new Promise(resolve => {
        const element = document.querySelector(selector);

        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const nodes = Array.from(mutation.addedNodes);
                for (const node of nodes) {
                    const element = node as Element;

                    if (element.matches && element.matches(selector)) {
                        observer.disconnect();
                        resolve(element);
                        return;
                    }
                }
            });
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
    });
}

export function waitForElements(selector: string): Promise<Element[]> {
    return new Promise(resolve => {
        const elements = [...document.querySelectorAll(selector)];
        if (elements) {
            resolve(elements);
            return;
        }

        const observer = new MutationObserver((mutations) => {
            const elements: Element[] = [];

            mutations.forEach((mutation) => {
                const nodes = Array.from(mutation.addedNodes);
                for (const node of nodes) {
                    const element = node as Element;

                    if (element.matches && element.matches(selector)) {
                        elements.push(element);
                    }
                }
            });

            resolve(elements);
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
    });
}

export function listenForElement(selector: string, callback: (element: Element) => void) {
    // TODO: Create single observer with a map of selectors and callbacks (Map<selector, callback>)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const nodes = Array.from(mutation.addedNodes);
            for (const node of nodes) {
                const element = node as Element;

                if (element.matches && element.matches(selector)) {
                    callback(element);
                }
            }
        });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    
    // return new Promise(resolve => {
    //     const elements = [...document.querySelectorAll(selector)];
    //     if (elements) {
    //         resolve(elements);
    //         return;
    //     }

    //     const observer = new MutationObserver((mutations) => {
    //         const elements: Element[] = [];

    //         mutations.forEach((mutation) => {
    //             const nodes = Array.from(mutation.addedNodes);
    //             for (const node of nodes) {
    //                 const element = node as Element;

    //                 if (element.matches && element.matches(selector)) {
    //                     elements.push(element);
    //                 }
    //             }
    //         });

    //         resolve(elements);
    //     });

    //     observer.observe(document.documentElement, { childList: true, subtree: true });
    // });
}

export function useClass(class_name: string, should_show: boolean) {
    const body = $("body");

    if (!should_show) {
        body.removeClass(class_name);
    } else {
        body.addClass(class_name);
    }
}