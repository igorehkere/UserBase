import cn from 'classnames'
import css from './index.module.scss'

export type ButtonProps = {
  children: React.ReactNode
  loading?: boolean
}

export function Button({ children, loading = false }: ButtonProps) {
    return (
        <button className={cn({[css.button]: true, [css.disabled]: loading, [css.loading]: loading})} type='submit' disabled={loading}>
            <span className={css.text}>{children}</span>
        </button>
    )
}