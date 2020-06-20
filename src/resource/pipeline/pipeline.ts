import { log } from '../../';

import { Event, Context, Result, IResourceHandler } from '../../lib/types';
import { MongoDb } from '../../db/MongoDb';
import { PipelineModel } from '../../db/models/pipeline';
import { ExErr, send } from '../response';

import { PipelineCreateSchemaValidator } from './schema';

export function PipelineHandler(db: MongoDb): IResourceHandler
{
    const model = PipelineModel(db);

    async function get(event: Event, context: Context): Promise<Result>
    {
        log.info(`body (${typeof(event.body)}): ${event.body}`);
        const pipelinePayload = new PipelineCreateSchemaValidator(event.body);

        if (!pipelinePayload.isValid()) {
            log.error(ExErr.InvalidEventBody);

            pipelinePayload.getErrors().forEach((error: string): void => {
                log.error(`- ${error}`);
            });

            return send.malformed();
        }

        return send.success();
    }

    const post = async (event: Event, context: Context): Promise<Result> => {
        const body = event.body;
        if (body === undefined || body === null)
            return send.malformed();

        return send.success();
    };

    return { get, post };
}
