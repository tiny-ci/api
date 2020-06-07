import { PipelineCreateSchemaValidator } from './schema';
import { Event, Context, Result, sendResponse } from '../';
import { IResourceHandler } from '../../types';
import { MongoDb } from '../../db';

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
