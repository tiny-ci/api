import { MongoClient, Db, Collection } from 'mongodb';

export interface IMongoDbConfig
{
    host: string;
    user: string;
    pass: string;
    dbName: string;
    isClustered: boolean;
}

export class MongoDb
{
    private config?: IMongoDbConfig;
    private client?: MongoClient;
    private db?: Db;

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
        if (!this.db)
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

        this.db = this.client.db(this.config!.dbName);
        this.throwIfNotConnected();
    }

    public isConnected(): boolean
    {
        if (typeof(this.client) === 'undefined')
            return false;

        return this.client!.isConnected();
    }

    public getCollection(collection: string): Collection
    {
        this.throwIfNotConnected();

        return this.db!.collection(collection);
    }
}
