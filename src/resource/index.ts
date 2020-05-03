import { APIGatewayProxyResult as Result } from 'aws-lambda';

export {
    APIGatewayProxyEvent as Event,
    APIGatewayEventRequestContext as Context,
    APIGatewayProxyResult as Result,
} from 'aws-lambda';

interface IResult
{
    [key: string]: (body: string) => Result;
}

export function sendResponse(): IResult
{
    const result = (body: string, statusCode: number): Result => { return { body, statusCode }; };

    const ok = (body: string): Result => { return result(body, 200); };

    return { ok };
}
