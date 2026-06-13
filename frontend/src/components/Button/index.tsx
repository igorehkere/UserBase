import cn from 'classnames'
import css from './index.module.scss'

type props = {
  children: React.ReactNode
  loading?: boolean
}

export function Button({ children, loading = false }: props) {
    return (
        <button className={cn({[css.button]: true, [css.disabled]: loading, [css.loading]: loading})} type='submit' disabled={loading}>
            <span className={css.text}>{children}</span>
        </button>
    )
}