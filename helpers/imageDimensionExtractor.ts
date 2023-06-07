export const imageDimensionExtractor = (id: string) => {
    const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/
    const match = pattern.exec(id);

    if (!match) {
        console.warn(`Cannot decode asset id: ${id}`);
        return {width: 0, height: 0};
    }

    const [width, height] = match[2].split("x").map(v => parseInt(v, 10));

    return {width, height};
};
