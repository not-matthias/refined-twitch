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

export function useClass(class_name: string, should_show: boolean) {
    const body = $("body");

    if (!should_show) {
        body.removeClass(class_name);
    } else {
        body.addClass(class_name);
    }
}