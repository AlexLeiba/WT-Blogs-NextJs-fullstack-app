import zod from 'zod';

export const SignupSchema = zod.object({
  fullName: zod.string().min(2),
  email: zod.string().email(),
  password: zod.string().min(6),
});

export const LoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

export const SendComment = zod.object({
  comment: zod.string().min(2),
});
export const NewArticleSchema = zod.object({
  title: zod.string().min(2),
  articleValue: zod.string().min(2),
});
