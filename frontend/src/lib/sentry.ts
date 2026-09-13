import * as Sentry from '@sentry/react';
import { env } from './env';
import { useMe } from './ctx';
import { useEffect } from 'react';

if (env.VITE_FRONTEND_SENTRY_DSN) {
  Sentry.init({
    dsn: env.VITE_FRONTEND_SENTRY_DSN,
    environment: env.HOST_ENV,
    normalizeDepth: 10,
  });
}

export const sentryCaptureException = (error: Error) => {
  if (env.VITE_FRONTEND_SENTRY_DSN) {
    Sentry.captureException(error);
  }
};

export const SentryUser = () => {
  const me = useMe();
  useEffect(() => {
    if (env.VITE_FRONTEND_SENTRY_DSN) {
      if (me) {
        Sentry.setUser({
          id: me.id,
          firstName: me.firstname,
          lastName: me.lastname,
          ip_address: `{{auto}}`,
          username: me.nick,
        });
      } else {
        Sentry.setUser(null);
      }
    }
  }, [me]);
  return null;
};
