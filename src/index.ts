import { Environment, RequiredEnv as ReqEnv } from './lib/environment';
import { MongoDb } from './db';
import { lambdaHandler } from './handler';

const db  = new MongoDb();
const env = new Environment();

(async (): Promise<void> => {
    const dbConfig = {
        host:   env.get(ReqEnv.MongoHost) as string,
        user:   env.get(ReqEnv.MongoUser) as string,
        pass:   env.get(ReqEnv.MongoPass) as string,
        dbName: env.get(ReqEnv.MongoDbName) as string,
        isClustered: Boolean(env.get(ReqEnv.MongoIsClustered)),
    };

    if (!db.isConnected()) {
        db.setConfig(dbConfig);

        await db.connect();
    }
})();

export const handler = lambdaHandler(db);
