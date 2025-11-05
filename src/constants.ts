export const SERVER_TIMESTAMP_OFFSET = -2 * 1000

/**
 * 森空岛访问 token
 * @description 没下面的重要，会过期，类似 `accessToken`
 */
export const STORAGE_OAUTH_TOKEN_KEY = 'skland:token'

/**
 * 森空岛应用授权凭证
 * @description 用于获取权限的主要凭证，类似 `refreshToken`
 */
export const STORAGE_CREDENTIAL_KEY = 'skland:cred'

/**
 * 森空岛用户 ID
 */
export const STORAGE_USER_ID_KEY = 'skland:userId'
