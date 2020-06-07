import { MongoDb } from '../MongoDb';

export function RepositoryModel(db: MongoDb): any
{
    const collection = db.getCollection('repository');

    const create = () => {

    };

    return { create };
}

