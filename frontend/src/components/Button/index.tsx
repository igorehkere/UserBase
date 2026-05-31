import cn from 'classnames'
import css from './index.module.scss'

type props = {
  children: React.ReactNode
  loading?: boolean
}

export function Button({ children, loading = false }: props) {
    return (
        <button className={cn({[css.button]: true, [css.disabled]: loading})} type='submit' disabled={loading}>
            {loading ? 'Submitting...' : children}
        </button>
    )
}