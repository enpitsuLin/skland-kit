# skland-kit

[![npm version](https://img.shields.io/npm/v/skland-kit.svg)](https://www.npmjs.com/package/skland-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.18.0-green.svg)](https://nodejs.org/)

为森空岛一些可用的 API 封装的客户端. 偷偷摸摸地用😎

## 安装

```bash
pnpm add skland-kit
```

## 快速开始

创建客户端实例，然后就可以用了

```typescript
import { createClient } from 'skland-kit'

const client = createClient({
  baseURL: 'https://zonai.skland.com',
  timeout: 30000,
  driver: yourStorageDriver
})
```

## 开发

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建项目
pnpm build

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 环境变量（开发/测试）

开发中测试用的环境变量有

```bash
VITE_SKLAND_TOKEN=your_hypergryph_token
VITE_SKLAND_UID=your_uid
```

## 许可证

MIT License
