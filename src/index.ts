import { Environment, RequiredEnv } from './environment';
import { MongoDb } from './db';
import { lambdaHandler } from './handler';

const db  = new MongoDb();
const env = new Environment();

(async (): Promise<void> => {
    const dbConfig = {
        host: env.get(RequiredEnv.MongoHost) as string,
        user: env.get(RequiredEnv.MongoUser) as string,
        pass: env.get(RequiredEnv.MongoPass) as string,
        isClustered: Boolean(env.get(RequiredEnv.MongoIsClustered)),
    };

    if (!db.isConnected()) {
        db.setConfig(dbConfig);

        await db.connect();
    }
})();

export const handler = lambdaHandler(db);
