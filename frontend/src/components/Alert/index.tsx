import cn from 'classnames'
import css from './index.module.scss'

export type AlertProps = {
  color: 'green' | 'red'
  children: React.ReactNode
  hidden?: boolean;
}

export function Alert({ color, children, hidden }: AlertProps) {
    if (hidden) {
        return null
    }
    return (
        <div className={cn({[css.alert]: true, [css[color]]: true})}>{children}</div>
    )
}
