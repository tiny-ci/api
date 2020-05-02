import {
    APIGatewayProxyEvent as Event,
    APIGatewayEventRequestContext as Context,
    APIGatewayProxyResult as Result,
} from 'aws-lambda';

import { MongoDb } from '../../db';

interface IPipelineHandler
{
    [key: string]: (event: Event, context: Context) => Promise<Result>;
}

export function PipelineHandler(db: MongoDb): IPipelineHandler
{
    const get = async (event: Event, context: Context): Promise<Result> => {
        console.log(event);
        console.log(context);
        console.log(db.isConnected());

        return { statusCode: 200, body: '' };
    };

    return { get };
}
