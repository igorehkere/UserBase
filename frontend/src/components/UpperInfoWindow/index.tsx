import type { TrpcRouterOutput } from '@authwithback/backend/src/router';
import css from './index.module.scss';
import { getAvatarUrl } from '@authwithback/shared/src/cloudinary';
import { Link } from 'react-router-dom';
import { getSignOutRoute } from '../../lib/routes';
import { Icon } from '../Icon';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

export const UpperInfoWindow = ({ me }: { me: NonNullable<TrpcRouterOutput>['getMe']['me'] }) => {
  return createPortal(
    <motion.div className={css.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className={css.upperWindow}
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0,
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
          ease: 'easeOut',
        }}
        style={{
          transformOrigin: 'top right',
        }}
      >
        <img className={css.avatar} alt="" src={getAvatarUrl(me?.avatar, 'small')} />
        <p className={css.nick}>{me?.nick}</p>
        <p className={css.name}>{`${me?.firstname} ${me?.lastname}`}</p>
        <Link to={getSignOutRoute()}>
          <button className={css.buttonExit}>
            <div className={css.textButton}>
              <Icon className={css.iconExit} name="exitIcon" />
              <p>Выйти</p>
            </div>
          </button>
        </Link>
      </motion.div>
    </motion.div>,
    document.body
  );
};
