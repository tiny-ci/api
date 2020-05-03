import { Event, Context, Result, sendResponse } from '../';
import { IResourceHandler } from '../../types';
import { MongoDb } from '../../db';

export function PipelineHandler(db: MongoDb): IResourceHandler
{
    const send = sendResponse();

    const get = async (event: Event, context: Context): Promise<Result> => {
        console.log(event);
        console.log(context);
        console.log(db.isConnected());

        return send.ok('');
    };

    return { get };
}
