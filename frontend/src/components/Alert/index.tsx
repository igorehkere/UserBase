import cn from 'classnames'
import css from './index.module.scss'

type props = {
  color: 'green' | 'red'
  children: React.ReactNode
}

export function Alert({ color, children }: props) {
    return (
        <div className={cn({[css.alert]: true, [css[color]]: true})}>{children}</div>
    )
}
