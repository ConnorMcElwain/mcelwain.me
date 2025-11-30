import { promises as fs } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const CONTENT_DIR = path.resolve('content')

const MDX_INDEX_TEMPLATE = (title) => `---
title: "${title.replace(/"/g, '\\"')}"
---

{/* Landing page for this section. Add an overview here if you like. */}
`

async function exists(p) {
  try { await fs.access(p); return true } catch { return false }
}

async function rmIfExists(p) {
  if (await exists(p)) await fs.rm(p, { recursive: true, force: true })
}

async function readDirSafe(dir) {
  try { return await fs.readdir(dir, { withFileTypes: true }) }
  catch { return [] }
}

async function loadMetaObject(metaJsPath) {
  const url = pathToFileURL(metaJsPath).href
  const mod = await import(url)
  const meta = mod?.default ?? {}
  if (meta && typeof meta === 'object') return meta
  return {}
}

function stringifyMetaJs(obj) {
  const ordered = {}
  Object.keys(obj).sort().forEach(k => { ordered[k] = obj[k] })
  return `export default ${JSON.stringify(ordered, null, 2)}\n`
}

async function ensureIndexPageForFolder(folderAbs, title) {
  const idx = path.join(folderAbs, 'index.mdx')
  if (!(await exists(idx))) {
    await fs.writeFile(idx, MDX_INDEX_TEMPLATE(title), 'utf8')
  }
}

async function processFolder(dirAbs) {
  const entries = await readDirSafe(dirAbs)

  const metaJs = path.join(dirAbs, '_meta.js')
  const metaJson = path.join(dirAbs, '_meta.json')
  if (await exists(metaJson)) await rmIfExists(metaJson)

  let meta = {}
  if (await exists(metaJs)) {
    meta = await loadMetaObject(metaJs)
  }

  const outMeta = {}
  for (const [key, value] of Object.entries(meta)) {
    if (key === '*') {
      outMeta[key] = value
      continue
    }
    const fileMdx = path.join(dirAbs, `${key}.mdx`)
    const fileMd = path.join(dirAbs, `${key}.md`)
    const folder = path.join(dirAbs, key)
    const isFolder = await exists(folder) && (await fs.stat(folder)).isDirectory()

    const title =
      typeof value === 'string'
        ? value
        : (typeof value?.title === 'string' ? value.title : key)

    const base = typeof value === 'string' ? { title, type: 'page' } : { ...value }
    if (!base.type) base.type = 'page'
    if (!base.title) base.title = title

    if (isFolder) {
      await ensureIndexPageForFolder(folder, base.title)
    } else {
      const fileExists = await exists(fileMdx) || await exists(fileMd)
      if (!fileExists) {
        continue
      }
    }
    outMeta[key] = base
  }

  if (Object.keys(outMeta).length > 0) {
    await fs.writeFile(metaJs, stringifyMetaJs(outMeta), 'utf8')
  } else if (await exists(metaJs)) {
    await fs.rm(metaJs)
  }

  for (const e of entries) {
    if (e.isDirectory()) {
      await processFolder(path.join(dirAbs, e.name))
    }
  }
}

async function ensureRootIndex() {
  const idx = path.join(CONTENT_DIR, 'index.mdx')
  if (!(await exists(idx))) {
    await fs.writeFile(
      idx,
      MDX_INDEX_TEMPLATE('Home'),
      'utf8'
    )
  }
}

async function main() {
  await ensureRootIndex()
  await processFolder(CONTENT_DIR)
  console.log('✅ Nextra v4 meta & index pages normalized.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
