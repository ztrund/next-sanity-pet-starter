import {JSDOM} from "jsdom";
import DOMPurify from "dompurify";
import {toHTML} from "@portabletext/to-html";
import {PortableTextBlock} from "@portabletext/types";

export const sanitizeHTML = (htmlContent: PortableTextBlock[]) => {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    return purify.sanitize(toHTML(htmlContent));
};