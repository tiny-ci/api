import * as router from 'aws-lambda-router';
import {
    APIGatewayProxyEvent as Event,
    APIGatewayEventRequestContext as Context,
    APIGatewayProxyResult as Result,
} from 'aws-lambda';

export type LambdaHandler = (event: Event, context: Context) => Promise<Result>

interface IProxyIntegrationRoute
{
    path: string;
    method: string;
    action: LambdaHandler;
}

enum HttpMethod
{
    Get  = 'GET',
    Post = 'POST',
    Put  = 'PUT',
}

export class Router
{
    private routes: IProxyIntegrationRoute[];

    public constructor()
    {
        this.routes = [];
    }

    private add(path: string, method: HttpMethod, action: LambdaHandler): void
    {
        this.routes.push({ path, method, action });
    }

    public get(path: string, action: LambdaHandler): void
    {
        this.add(path, HttpMethod.Get, action);
    }

    public post(path: string, action: LambdaHandler): void
    {
        this.add(path, HttpMethod.Post, action);
    }

    public put(path: string, action: LambdaHandler): void
    {
        this.add(path, HttpMethod.Put, action);
    }

    public handle(): any
    {
        return router.handler({
            //@ts-ignore
            proxyIntegration: { routes: this.routes },
        });
    }
}
