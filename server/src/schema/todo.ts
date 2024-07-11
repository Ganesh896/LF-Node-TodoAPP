import Joi from "joi";

// schema for parameter validation
export const todoParamsSchema = Joi.object({
    id: Joi.string().regex(/^\d+$/).required().messages({
        "any.required": "Id is required!",
        "string.pattern.base": "Id must be a number",
    }),
}).options({
    stripUnknown: true,
});

// schema for adding todo
export const addTodoBodySchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required",
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required",
    }),
}).options({
    stripUnknown: true,
});

// schema for updating an existing todo
export const updateTodoBodySchema = Joi.object({
    title: Joi.string().optional().messages({
        "any.required": "Title is required",
    }),
    description: Joi.string().optional().messages({
        "any.required": "Description is required",
    }),
}).options({
    stripUnknown: true,
});
