import { Link } from 'react-router-dom'
import { ButtonNavigate } from '../Button'
import './index.module.scss'
import { getAllPostsRoute, getMyProfileRoute } from '../../lib/routes'
import { Icon } from '../Icon'
import css from './index.module.scss'

export const Navigation = () => {
    return (
        <>
            <Link to={getMyProfileRoute()}>
                <ButtonNavigate>
                    <div className={css.buttonNav}>
                        <Icon size={24} className={css.buttonIcon} name='userIcon' />
                        <p>Мой профиль</p>
                    </div> 
                </ButtonNavigate>
            </Link>
            <Link to={getAllPostsRoute()}>
                <ButtonNavigate>
                    <div className={css.buttonNav}>
                        <Icon size={24} className={css.buttonIcon} name='postsIcon' />
                        <p>Посты</p>
                    </div>
                </ButtonNavigate>
            </Link>
        </>
    )
}