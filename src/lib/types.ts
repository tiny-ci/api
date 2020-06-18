import {
    APIGatewayProxyEvent as Event,
    APIGatewayEventRequestContext as Context,
    APIGatewayProxyResult as Result,
} from 'aws-lambda';

export { Event, Context, Result };

type Handler = (event: Event, context: Context) => Promise<Result>

export interface IResourceHandler
{
    [key: string]: Handler;
}

export interface IHash
{
    [key: string]: any;
}
