import { PipelineCreateSchemaValidator } from './schema';
import { sendResponse } from '../';
import { MongoDb } from '../../db';
import { Event, Context, Result, IResourceHandler } from '../../lib/types';

export function PipelineHandler(db: MongoDb): IResourceHandler
{
    const send = sendResponse();

    const get = async (event: Event, context: Context): Promise<Result> => {
        return send.success();
    };

    const post = async (event: Event, context: Context): Promise<Result> => {
        const body = event.body;
        if (body === undefined || body === null)
            return send.malformed();

        return send.success();
    };

    return { get, post };
}
