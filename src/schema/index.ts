import { Validator, Schema, ValidationError } from 'jsonschema';

export abstract class GenericSchema
{
    private valid: boolean;
    private errors: string[];

    public constructor(data: any)
    {
        const validator = new Validator();
        const result = validator.validate(data, this.getValidationSchema());

        this.valid  = result.valid;
        this.errors = result.errors.map((err: ValidationError): string => {
            return err.message;
        });
    }

    protected abstract getValidationSchema(): Schema;
    public isValid(): boolean { return this.valid; }
    public getErrors(): string[] { return this.errors; }
}
