import cn from "classnames";
import css from './index.module.scss'


type ButtonUploadImageProps = {
  children: React.ReactNode
  loading?: boolean
  color?: 'red' | 'green',
  type?: 'button',
  disabled?: boolean,
  onClick?: () => void
}

export function ButtonUploadImage({ children, loading = false, color = 'green', type = 'button',  disabled, onClick}: ButtonUploadImageProps) {
    return (
        <button className={cn({[css.button]: true, [css.disabled]: loading, [css.loading]: loading, [css[`color-${color}`]]: true})} type={type} disabled={disabled || loading} onClick={onClick}>
            <span className={css.text}>{children}</span>
        </button>
    )
}