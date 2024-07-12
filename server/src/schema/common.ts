import Joi from "joi";

export const paramsSchema = Joi.object({
    id: Joi.string().regex(/^\d+$/).required().messages({
        "any.required": "Id is required!",
        "string.pattern.base": "Id must be a number",
    }),
}).options({
    stripUnknown: true,
});
