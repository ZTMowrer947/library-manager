// Environment type
export enum EnvType {
    Production = "production",
    Testing = "testing",
    Development = "development",
}

// Export
export default (() => {
    const nodeEnv = process.env.NODE_ENV || "development";

    switch (nodeEnv) {
        case "prod":
        case "production":
            return EnvType.Production;

        case "staging":
        case "testing":
        case "test":
            return EnvType.Testing;

        default:
            return EnvType.Development;
    }
})();
