import type { FormikProps } from 'formik';
import css from './index.module.scss';
import cn from 'classnames';

type props = {
  name: string;
  label: string;
  formik: FormikProps<any>;
  maxWidth?: string;
  type?: 'text' | 'password';
};

export function Input({ name, label, formik, maxWidth, type = 'text' }: props) {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const disabled = formik.isSubmitting;
  const invalid = !!error && !!touched;

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        style={{ maxWidth }}
        disabled={formik.isSubmitting}
        type={type}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        value={value}
        id={name}
        name={name}
      />
      <div className={cn(css.error, { [css.visible]: invalid })}>{invalid ? error : ''}</div>
    </div>
  );
}
