import { MongoClient } from 'mongodb';

export interface IMongoDbConfig
{
    host: string;
    user: string;
    pass: string;
    isClustered: boolean;
}

export class MongoDb
{
    private config?: IMongoDbConfig;
    private client?: MongoClient;

    private newConnectionString(): string
    {
        if (!this.config)
            throw new Error();

        const c = this.config!;
        const protocol = ((): string => {
            if (c.isClustered)
                return 'mongodb+srv';

            return 'mongodb';
        })();

        return `${protocol}://${c.user}:${c.pass}@${c.host}`;
    }

    private throwIfNotConnected(): void
    {
        if (!this.client)
            throw new Error('');
    }

    public setConfig(config: IMongoDbConfig): void
    {
        this.config = config;
    }

    public async connect(): Promise<void>
    {
        this.client = await MongoClient.connect(
            this.newConnectionString(), { useNewUrlParser: true });

        this.throwIfNotConnected();
    }

    public isConnected(): boolean
    {
        return Boolean(this.client);
    }
}
