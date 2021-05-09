import joi from 'joi';

const getUserByIdSchema = joi.object({
  userId: joi.string().guid().required(),
});

export default {
  getUserByIdSchema,
};
