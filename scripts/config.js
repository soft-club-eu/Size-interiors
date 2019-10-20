function config(value) {
    console.log(value);
    const config = {
        blocks: {
            maxContent: 12,
            maxRow: 4
        }
    };
    return [config[value].maxContent, config[value].maxRow];
}