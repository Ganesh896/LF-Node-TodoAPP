import Joi from "joi";

export const paramsSchema = Joi.object({
    id: Joi.string().regex(/^\d+$/).required().messages({
        "any.required": "Id is required!",
        "string.pattern.base": "Id must be a number",
    }),
}).options({
    stripUnknown: true,
});

export const querySchema = Joi.object({
    q: Joi.string().optional(),

    page: Joi.number().min(1).optional().messages({
        "number.base": "Page must be a number",
        "number.min": "Size must be greater than or equal to 1",
    }),

    size: Joi.number()
        .min(1)
        .max(10)
        .optional()
        .messages({
            "number.base": "Size must be a number",
            "number.min": "Size must be greater than or equal to 1",
            "number.max": "Size must be less than or equal to 10",
        })
        .default(10),
}).options({
    stripUnknown: true,
});
