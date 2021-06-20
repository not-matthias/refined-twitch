import { waitForElement } from "@/utils/dom"

export default async function() {
    const element = await waitForElement("#sideNav .side-nav-section") as HTMLElement;
    
    element.style.cssText = "display: none !important";   
}
