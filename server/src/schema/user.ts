import Joi from "joi";

export const todoParamsSchema = Joi.object({
    id: Joi.string().regex(/^\d+$/).required().messages({
        "any.required": "Id is required!",
        "string.pattern.base": "Id must be a number",
    }),
}).options({
    stripUnknown: true,
});

// Schema for adding user
export const addUserBodySchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
    }),

    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid format",
    }),

    password: Joi.string()
        .required()
        .min(8)
        .messages({
            "any.required": "Password is required",
            "string.min": "Password must be at least 8 character",
            "password.uppercase": "Pasword must contain atleast one uppercase letter",
            "password.lowercase": "Pasword must contain atleast one lowecase letter",
            "password.special": "Pasword must contain atleast one special charater",
        })
        .custom((value, helpers) => {
            if (!/[A-Z]/.test(value)) {
                return helpers.error("password.uppercase");
            }
            if (!/[a-z]/.test(value)) {
                return helpers.error("password.lowercase");
            }
            if (!/[!@#$%]/.test(value)) {
                return helpers.error("password.special");
            }

            return value;
        }),
}).options({
    stripUnknown: true,
});

// Schema for updating an existing user
export const updateTodoBodySchema = Joi.object({
    title: Joi.string().optional().messages({
        "any.required": "name is required",
    }),
    description: Joi.string().optional().messages({
        "any.required": "email is required",
    }),
}).options({
    stripUnknown: true,
});
