/// <reference types="vitest/importMeta" />
import { describe, expect, it } from 'vitest'
import { createClient } from '../src'
import { STORAGE_CREDENTIAL_KEY, STORAGE_OAUTH_TOKEN_KEY } from '../src/constants'

describe('skland-kit client', () => {
  it('should have some properties', () => {
    const client = createClient()
    expect(client).toHaveProperty('$fetch')
    expect(client).toHaveProperty('signIn')
    expect(client).toHaveProperty('refresh')
    expect(client).toHaveProperty('collections')

    expect(client.collections).toHaveProperty('hypergryph')
    expect(client.collections).toHaveProperty('score')
    expect(client.collections).toHaveProperty('player')
    expect(client.collections).toHaveProperty('game')

    expect(client.collections.hypergryph).toHaveProperty('grantAuthorizeCode')

    expect(client.collections.player).toHaveProperty('getBinding')
    expect(client.collections.player).toHaveProperty('getInfo')

    expect(client.collections.game).toHaveProperty('getAttendanceStatus')
    expect(client.collections.game).toHaveProperty('attendance')
  })

  it('should authorize hypergryph', async () => {
    const client = createClient()

    const data = await client.collections.hypergryph.grantAuthorizeCode(import.meta.env.VITE_SKLAND_TOKEN!)
    expect(data).toHaveProperty('code')
    expect(data).toHaveProperty('uid')
  })

  it('should sign in skland', async () => {
    const client = createClient()
    const res = await client.collections.hypergryph.grantAuthorizeCode(import.meta.env.VITE_SKLAND_TOKEN!)

    await client.signIn(res.code)

    expect(await client.storage.hasItem(STORAGE_CREDENTIAL_KEY)).toBe(true)
    expect(await client.storage.hasItem(STORAGE_OAUTH_TOKEN_KEY)).toBe(true)
  })

  it('should throw error', async () => {
    const client = createClient()

    await expect(client.collections.player.getBinding)
      .rejects
      .toThrow('【skland-kit】森空岛 cred 未获取')
  })

  it('should refresh token', async () => {
    const client = createClient()

    const res = await client.collections.hypergryph.grantAuthorizeCode(import.meta.env.VITE_SKLAND_TOKEN!)

    await client.signIn(res.code)

    await client.storage.setItem(STORAGE_OAUTH_TOKEN_KEY, '123')

    await client.refresh()

    const tokenNew = await client.storage.getItem(STORAGE_OAUTH_TOKEN_KEY)
    expect(tokenNew).toBeDefined()
    expect(tokenNew).not.toBe('123')
  })

  it('should get player binding', async () => {
    const client = createClient()

    const res = await client.collections.hypergryph.grantAuthorizeCode(import.meta.env.VITE_SKLAND_TOKEN!)

    await client.signIn(res.code)

    const binding = await client.collections.player.getBinding()

    expect(binding).toHaveProperty('list', expect.any(Array))
  })

  it('should get player info', async () => {
    const client = createClient()

    const res = await client.collections.hypergryph.grantAuthorizeCode(import.meta.env.VITE_SKLAND_TOKEN!)

    await client.signIn(res.code)

    const info = await client.collections.player.getInfo({ uid: import.meta.env.VITE_SKLAND_UID! })

    expect(info).toHaveProperty('currentTs')
  })

  it('should get attendance status', async () => {
    const client = createClient()

    const res = await client.collections.hypergryph.grantAuthorizeCode(import.meta.env.VITE_SKLAND_TOKEN!)

    await client.signIn(res.code)

    const data = await client.collections.game.getAttendanceStatus({ uid: import.meta.env.VITE_SKLAND_UID!, gameId: '1' })

    expect(data).toHaveProperty('currentTs')
    expect(data).toHaveProperty('calendar')
    expect(data).toHaveProperty('records')
    expect(data).toHaveProperty('resourceInfoMap')
  })
})
