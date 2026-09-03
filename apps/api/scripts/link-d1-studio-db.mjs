import fs from "node:fs"
import path from "node:path"

const rootDir = process.cwd()
const sourceDir = path.join(rootDir, ".wrangler/state/v3/d1/miniflare-D1DatabaseObject")
const targetDir = path.join(rootDir, ".wrangler/state/v3/d1/miniflare-D1Database")
const targetDatabase = path.join(targetDir, "db.sqlite")

const databaseFiles = fs
  .readdirSync(sourceDir)
  .filter((fileName) => fileName.endsWith(".sqlite") && fileName !== "metadata.sqlite")
  .map((fileName) => {
    const fullPath = path.join(sourceDir, fileName)
    return {
      fileName,
      fullPath,
      mtimeMs: fs.statSync(fullPath).mtimeMs,
    }
  })
  .sort((left, right) => right.mtimeMs - left.mtimeMs)

if (databaseFiles.length === 0) {
  throw new Error(`No D1 SQLite file found in ${sourceDir}`)
}

const sourceDatabase = databaseFiles[0].fullPath
const sourceWal = `${sourceDatabase}-wal`
const sourceShm = `${sourceDatabase}-shm`

fs.mkdirSync(targetDir, { recursive: true })

for (const filePath of [targetDatabase, `${targetDatabase}-wal`, `${targetDatabase}-shm`]) {
  fs.rmSync(filePath, { force: true })
}

fs.symlinkSync(path.relative(targetDir, sourceDatabase), targetDatabase)

for (const [sourcePath, targetPath] of [
  [sourceWal, `${targetDatabase}-wal`],
  [sourceShm, `${targetDatabase}-shm`],
]) {
  if (fs.existsSync(sourcePath)) {
    fs.symlinkSync(path.relative(targetDir, sourcePath), targetPath)
  }
}

console.log(`Linked Drizzle Studio database to ${path.relative(rootDir, sourceDatabase)}`)