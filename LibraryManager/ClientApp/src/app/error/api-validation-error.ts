export class ApiValidationError extends Error {
    public readonly errors: Record<string, string>;

    public constructor(errors: Record<string, string>) {
        super('Validation errors were returned from the API.');
        this.name = 'ApiValidationError';
        this.errors = errors;
    }
}
