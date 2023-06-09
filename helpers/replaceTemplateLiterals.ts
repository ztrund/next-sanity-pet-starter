export function replaceTemplateLiterals<T>(description: string, data: T) {
    return description.replace(/\$\{(\w+)}/g, (_, key) => {
        const value = data[key as keyof T];
        return String(value);
    });
}