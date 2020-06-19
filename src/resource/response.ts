import { Result } from '../lib/types';

interface IResult
{
    [key: string]: (body?: string) => Result;
}

function sendResponse(): IResult
{
    const result = (body: string, statusCode: number): Result => { return { body, statusCode }; };

    const ok = (body: string): Result => { return result(body, 200); };
    const badRequest = (body: string): Result => { return result(body, 400); };

    const malformed = (): Result => {
        return badRequest(JSON.stringify({
            message: 'received payload is malformed'
        }));
    };

    const success = (body?: string): Result => {
        if (!body) body = '';
        return ok(body);
    };

    return { success, malformed };
}

const send = sendResponse();
export { send };
