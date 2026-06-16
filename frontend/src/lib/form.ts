import { useFormik, type FormikHelpers } from 'formik';
import { useMemo, useState } from 'react';
import type z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import type { AlertProps } from '../components/Alert';
import type { ButtonProps } from '../components/Button';

export const useForm = <TZodSchema extends z.ZodObject>({
  successMessage = false,
  resetOnSuccess = true,
  showValidationAlert = false,
  initialValues = {} as z.infer<TZodSchema>,
  validationSchema,
  onSubmit,
}: {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues?: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit?: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<any> | any;
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<Error | null>(null);

  const formik = useFormik({
    initialValues,
    ...(validationSchema && { validationSchema: toFormikValidationSchema(validationSchema) }),
    onSubmit: async (validateYupSchema, formikHelpers) => {
      if (!onSubmit) {
        return;
      }
      try {
        setSubmittingError(null);
        await onSubmit(validateYupSchema, formikHelpers);
        if (resetOnSuccess) {
          formik.resetForm();
        }
        setSuccessMessageVisible(true);
      } catch (e: any) {
        setSubmittingError(e);
      }
    },
  });

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        children: submittingError.message,
        color: 'red',
      };
    }
    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: 'В некоторых полях допущена ошибка!',
        color: 'red',
      };
    }
    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        color: 'green',
      };
    }
    return {
      color: 'green',
      hidden: true,
      children: null,
    };
  }, [submittingError, formik.isValid, formik.submitCount, successMessage, successMessageVisible, showValidationAlert]);
  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
    return {
      loading: formik.isSubmitting,
    };
  }, [formik.isSubmitting]);

  return {
    formik,
    alertProps,
    buttonProps,
  };
};
