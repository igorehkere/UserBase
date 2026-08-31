import z from "zod";

export const zEnvNonemptyTrimmed = z.string().min(1)
export const zEnvNonemptyTrimmedOnNotLocal = zEnvNonemptyTrimmed.optional().refine(
    (val) => `${process.env.HOST_ENV}` === 'local' || !val,
    'Required on not local host'
)

export const zEnvHost = z.enum(['local', 'production'])

export const zStringRequired = z.string('Заполните поле').min(1)

export const zStringOptional = z.string().optional()

export const zEmailRequired = z.email()

export const zNickRequired = zStringRequired.regex(
    /^[a-z0-9-]+$/,
    'Ник должен состоять только из строчных букв, цифр и символов'
)

export const zPasswordMustBeSame = (passwordFieldName: string, passwordAgainFieldName: string) => (val: any, ctx: z.RefinementCtx) => {
    if (val[passwordFieldName] !== val[passwordAgainFieldName]) {
        ctx.addIssue({
            code: 'custom',
            message: 'Пароли не совпадают',
            path: [passwordAgainFieldName]
        })
    }
}