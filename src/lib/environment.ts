import { IHash } from './types';

export enum RequiredEnv
{
    IsDebug     = 'IS_DEBUG',
    MongoHost   = 'MONGO_HOST',
    MongoUser   = 'MONGO_USER',
    MongoPass   = 'MONGO_PASS',
    MongoDbName = 'MONGO_DB_NAME',
    MongoIsClustered = 'MONGO_IS_CLUSTERED',
}

type SupportedDataTypes = string | string[] | number | boolean;

enum EnvDataType
{
    Boolean = 'boolean',
    String  = 'string',
    Number  = 'number',
    List    = 'list',
}

interface IRequiredEnvironmentVariable
{
    name: string;
    type: EnvDataType;
    optional?: boolean;
}

export class Environment
{
    private envs: IHash;

    public constructor()
    {
        this.envs = this.fetch([
            this.addEnv(RequiredEnv.MongoHost,   EnvDataType.String),
            this.addEnv(RequiredEnv.MongoUser,   EnvDataType.Number),
            this.addEnv(RequiredEnv.MongoPass,   EnvDataType.Number),
            this.addEnv(RequiredEnv.MongoDbName, EnvDataType.Number),
            this.addEnv(RequiredEnv.MongoIsClustered, EnvDataType.String, false),
            this.addEnv(RequiredEnv.IsDebug, EnvDataType.String, false),
        ]);
    }

    private addEnv(name: string, type: EnvDataType, optional?: boolean): IRequiredEnvironmentVariable
    {
        return { name, type, optional };
    }

    private parseData(type: EnvDataType, data: string): SupportedDataTypes | null
    {
        const d = data.toLowerCase();
        switch (type) {
            case EnvDataType.String:
                return data;

            case EnvDataType.Number:
                if (isNaN(parseInt(data)))
                    return null;

                return parseInt(data);

            case EnvDataType.List:
                try { return data.split(','); } catch (e) { return null; }

            case EnvDataType.Boolean:
                if (d === 'true') return true;
                if (d === 'false') return false;
                return null;

            default:
                return null;
        }
    }

    private fetch(envs: IRequiredEnvironmentVariable[]): IHash
    {
        const envValues: IHash = {};
        const missing: string[] = [];

        for (let i = 0; i < envs.length; i++) {
            const optional = Boolean(envs[i].optional);
            const envName  = envs[i].name;
            const envType  = envs[i].type;
            const value    = process.env[envName];

            if (typeof(value) === 'undefined' || value === '') {
                if (optional) {
                    envValues[envName] = '';
                }
                else {
                    missing.push(envName);
                }

                continue;
            }

            envValues[envName] = ((): SupportedDataTypes => {
                const val = this.parseData(envType, value);
                if (val === null)
                    throw new Error(`environment variable ${envName} is not of type ${envType}`);

                return val as SupportedDataTypes;
            })();
        }

        if (missing.length > 0) {
            throw new Error(`the following required environment variables are missing: ${missing.join(', ')}`);
        }

        return envValues;
    }

    public get(name: string): SupportedDataTypes
    {
        const env = this.envs[name];
        if (typeof(env) === undefined)
            throw new Error(`unknown environment variable ${name}`);

        return env;
    }
}
