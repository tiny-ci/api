import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';

type Handler =
    (event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext) => Promise<APIGatewayProxyResult>

export interface IResourceHandler
{
    [key: string]: Handler;
}

export interface IHash
{
    [key: string]: any;
}
