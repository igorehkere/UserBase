export const parsePublicEnv = (env: Record<string, string | undefined>) => 
    Object.entries(env).reduce((acc, [key, value]) => {
        if (key.startsWith('VITE_') || key === 'NODE_ENV') {
            return {
                ...acc,
                [key]: value,
            }
        }
        return acc
    }, {})