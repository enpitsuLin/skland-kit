import type { FetchOptions } from 'ofetch'
import type { AttendanceAwards, AttendanceStatus, ClientGame, SklandResponse } from '../../types'
import { signRequest } from '../../utils/signature'
import { useClientContext } from '../ctx'

export function buildGameCollection(): ClientGame {
  const { $fetch, storage } = useClientContext()

  async function fetchGame<T = any>(
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
    async getAttendanceStatus(query) {
      const res = await fetchGame<AttendanceStatus>(
        '/api/v1/game/attendance',
        { query },
        '获取签到状态错误',
      )
      return res.data
    },
    async attendance(body) {
      const res = await fetchGame<AttendanceAwards>(
        '/api/v1/game/attendance',
        { method: 'POST', body },
        '执行签到错误',
      )
      return res.data
    },
  }
}
