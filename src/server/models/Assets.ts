// Interface
interface Assets {
    [chunkName: string]: {
        js?: string;
        jsIntegrity?: string;
        css?: string;
        cssIntegrity?: string;
    };
}

// Export
export default Assets;
