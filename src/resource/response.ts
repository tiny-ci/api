import { Result } from '../lib/types';

export enum ExErr
{
    UnparsableEventBody = 'could not parse event body',
    InvalidEventBody    = 'event body does not match expected schema',
}

interface IResult
{
    [key: string]: (body?: string) => Result;
}

function ResponseSender(): IResult
{
    const result = (body: string, statusCode: number): Result => { return { body, statusCode }; };

    const ok = (body: string): Result => { return result(body, 200); };
    const badRequest = (body: string): Result => { return result(body, 400); };

    /* ----- */
    const malformed = (): Result => {
        return badRequest(JSON.stringify({ message: ExErr.InvalidEventBody }));
    };

    /* ----- */
    const success = (body?: string): Result => {
        return ok(body || '');
    };

    return { success, malformed };
}

export const send = ResponseSender();
