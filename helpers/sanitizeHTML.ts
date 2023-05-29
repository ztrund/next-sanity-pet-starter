import {JSDOM} from "jsdom";
import DOMPurify from "dompurify";
import {toHTML} from "@portabletext/to-html";

export const sanitizeHTML = (htmlContent: any) => {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    return purify.sanitize(toHTML(htmlContent));
};