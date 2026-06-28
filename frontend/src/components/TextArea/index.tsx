import type { FormikProps } from 'formik'
import cn from 'classnames'
import css from './index.module.scss'
import { useAutoResize } from '../../hooks/useAutoResize'

type props = {
  name: string
  label: string
  formik: FormikProps<any>
}

export function TextArea({ name, label, formik }: props) {
  const value = formik.values[name]
  const error = formik.errors[name] as string | null
  const touched = formik.touched[name]
  const disabled = formik.isSubmitting
  const invalid = !!error && !!touched
  const textareaRef = useAutoResize<HTMLTextAreaElement>(formik.values[name])

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>{label}</label>
      <textarea
        ref={textareaRef}
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        disabled={formik.isSubmitting}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        value={value}
        id={name}
        name={name}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
