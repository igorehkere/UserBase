import cn from 'classnames'
import css from './index.module.scss'
import type React from 'react'

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

export function ButtonNavigate({children}: {children: React.ReactNode}) {
    return (
        <button className={css.buttonNavi}>{children}</button>
    )
}