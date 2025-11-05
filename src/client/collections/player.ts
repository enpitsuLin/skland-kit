import type { FetchOptions } from 'ofetch'
import type { AppBindingList, ClientPlayer, PlayerInfo, SklandResponse } from '../../types'
import { signRequest } from '../../utils/signature'
import { useClientContext } from '../ctx'

export function buildPlayerCollection(): ClientPlayer {
  const { $fetch, storage } = useClientContext()
  async function fetchPlayer<T = any>(
    url: string,
    options: FetchOptions<'json'>,
    errorMessage: string,
  ): Promise<SklandResponse<T>> {
    const res = await $fetch<SklandResponse<T>>(url, {
      ...options,
      onRequest: ctx => signRequest(ctx, storage),
      onResponseError(ctx) {
        throw new Error(`【skland-kit】${errorMessage}`, { cause: ctx.response._data })
      },
    })

    if (res.code !== 0) {
      throw new Error(`【skland-kit】${errorMessage}`, { cause: res })
    }

    return res
  }
  return {
    async getBinding() {
      const res = await fetchPlayer<AppBindingList>(
        '/api/v1/game/player/binding',
        {},
        '获取游戏绑定信息错误',
      )
      return res.data
    },
    async getInfo(query) {
      const res = await fetchPlayer<PlayerInfo>(
        '/api/v1/game/player/info',
        { query },
        '获取玩家信息错误',
      )
      return res.data
    },
  }
}
