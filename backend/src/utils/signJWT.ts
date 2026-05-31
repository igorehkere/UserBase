import jwt from 'jsonwebtoken'

export function signJWT(userId: string) {
    return jwt.sign(userId, 'secret_jwt_key')
}