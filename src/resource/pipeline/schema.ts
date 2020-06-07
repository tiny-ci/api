import { Schema } from 'jsonschema';
import { GenericSchema } from '../../schema';

const pipelineDataSchema = {
    type: 'object',
    required: ['commit', 'repository', 'sender', 'owner'],
    additionalProperties: false,
    properties: {
        commit: {
            type: 'object',
            required: ['hash', 'ts', 'message', 'ref', 'web'],
            additionalProperties: false,
            properties: {
                hash: { type: 'string' },
                ts: { type: 'string' },
                message: { type: 'string' },

                ref: {
                    type: 'object',
                    required: ['name', 'type'],
                    additionalProperties: false,
                    properties: {
                        type: { type: 'string' },
                        name: { type: 'string' },
                    },
                },

                web: {
                    type: 'object',
                    required: ['url', 'compare'],
                    additionalProperties: false,
                    properties: {
                        url: { type: 'string' },
                        compare: { type: 'string' },
                    },
                },
            },
        },

        repository: {
            type: 'object',
            required: ['id', 'name', 'web'],
            additionalProperties: false,
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },

                web: {
                    type: 'object',
                    required: ['url'],
                    additionalproperties: false,
                    properties: {
                        url: { type: 'string' },
                    },
                },
            },
        },

        sender: {
            type: 'object',
            required: ['id', 'login', 'web'],
            additionalProperties: false,
            properties: {
                id: { type: 'string' },
                login: { type: 'string' },

                web: {
                    type: 'object',
                    required: ['url', 'avatar'],
                    additionalproperties: false,
                    properties: {
                        url: { type: 'string' },
                        avatar: { type: 'string' },
                    },
                },
            },
        },

        owner: {
            type: 'object',
            required: ['id', 'login', 'web'],
            additionalProperties: false,
            properties: {
                id: { type: 'string' },
                login: { type: 'string' },

                web: {
                    type: 'object',
                    required: ['url', 'avatar'],
                    additionalproperties: false,
                    properties: {
                        url: { type: 'string' },
                        avatar: { type: 'string' },
                    },
                },
            },
        },
    },
};

export class PipelineCreateSchemaValidator extends GenericSchema
{
    protected getValidationSchema(): Schema { return pipelineDataSchema; }
}
