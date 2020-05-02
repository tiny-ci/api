import { Event, Context, Result } from '../';
import { IResourceHandler } from '../../types';
import { MongoDb } from '../../db';

export function PipelineHandler(db: MongoDb): IResourceHandler
{
    const get = async (event: Event, context: Context): Promise<Result> => {
        console.log(event);
        console.log(context);
        console.log(db.isConnected());

        return { statusCode: 200, body: '' };
    };

    return { get };
}
