import { MongoDb } from '../MongoDb';

export function PipelineModel(db: MongoDb): any
{
    const collection = db.getCollection('pipeline');

    async function create(): Promise<void>
    {

    }

    return { create };
}
