import { Link } from 'react-router-dom'
import { ButtonNavigate } from '../Button'
import './index.module.scss'
import { getAllPostsRoute, getMyProfileRoute } from '../../lib/routes'

export const Navigation = () => {
    return (
        <>
            <Link to={getMyProfileRoute()}><ButtonNavigate>Мой профиль</ButtonNavigate></Link>
            <Link to={getAllPostsRoute()}><ButtonNavigate>Посты</ButtonNavigate></Link>
        </>
    )
}