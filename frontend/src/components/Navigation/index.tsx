import { Link } from 'react-router-dom'
import { ButtonNavigate } from '../Button'
import './index.module.scss'
import { getAllPostsRoute, getMyProfileRoute } from '../../lib/routes'

export const Navigation = () => {
    return (
        <>
            <ButtonNavigate><Link to={getMyProfileRoute()}>Мой профиль</Link></ButtonNavigate>
            <ButtonNavigate><Link to={getAllPostsRoute()}>Посты</Link></ButtonNavigate>
        </>
    )
}