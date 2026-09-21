import type { TrpcRouterOutput } from '@authwithback/backend/src/router'
import css from './index.module.scss'
import { getAvatarUrl } from '@authwithback/shared/src/cloudinary'
import { Link } from 'react-router-dom'
import { getSignOutRoute } from '../../lib/routes'

export const UpperInfoWindow = ({me}: {me: NonNullable<TrpcRouterOutput>['getMe']['me']}) => {
    return (
        <div className={css.upperWindow}>
            <img className={css.avatar} alt="" src={getAvatarUrl(me?.avatar, 'small')} />
            <p className={css.nick}>{me?.nick}</p>
            <p className={css.name}>{`${me?.firstname} ${me?.lastname}`}</p>
            <button className={css.buttonExit}>
                <Link to={getSignOutRoute()}>
                    Выйти
                </Link>
            </button>
        </div>
    )
}
