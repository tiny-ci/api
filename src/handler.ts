import { Router } from './router';
import { MongoDb } from './db';
import { PipelineHandler } from './resource/pipeline';

export function lambdaHandler(db: MongoDb): any
{
    const router = new Router();

    const pipeline = PipelineHandler(db);
    router.get('/pipeline/:id', pipeline.get);

    return router.handle();
}
