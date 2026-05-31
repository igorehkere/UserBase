import css from './index.module.scss'

type props = {
    children: React.ReactNode
}

export function FormItems ({children}:props) {
    return <div className={css.formItems}>{children}</div>
}