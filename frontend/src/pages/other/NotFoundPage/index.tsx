import css from './index.module.scss'
import image404 from '../../../images/404-not-found.png'
import { Helmet } from 'react-helmet-async'

export const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <div className={css.container}>
                <div className={css.image4042}>
                    <img src={image404} alt='Not found' width={800} height={600}/>
                </div>
            </div>
        </>
        
    )
}