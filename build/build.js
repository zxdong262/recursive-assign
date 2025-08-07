import { build } from 'esbuild'
import { writeFileSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'

async function buildAll () {
  console.log('🧹 Cleaning dist folder...')

  console.log('📝 Generating TypeScript declarations...')
  // Generate TypeScript declarations only
  execSync('tsc', { stdio: 'inherit' })

  console.log('🏗️  Building ESM version...')
  // Build ESM version
  await build({
    entryPoints: ['src/index.ts'],
    bundle: false,
    outdir: 'dist/esm',
    format: 'esm',
    target: 'es2020',
    sourcemap: true,
    platform: 'neutral'
  })

  console.log('🏗️  Building CommonJS version...')
  // Build CommonJS version
  await build({
    entryPoints: ['src/index.ts'],
    bundle: false,
    outdir: 'dist/cjs',
    format: 'cjs',
    target: 'es2020',
    sourcemap: true,
    platform: 'node'
  })

  console.log('📦 Creating package.json files...')
  // Ensure directories exist
  mkdirSync('dist/esm', { recursive: true })
  mkdirSync('dist/cjs', { recursive: true })

  // Create package.json files for proper module resolution
  writeFileSync('dist/esm/package.json', JSON.stringify({ type: 'module' }, null, 2))
  writeFileSync('dist/cjs/package.json', JSON.stringify({ type: 'commonjs' }, null, 2))

  console.log('✅ Build completed successfully!')
  console.log('📁 Generated files:')
  console.log('   - dist/types/index.d.ts (TypeScript declarations)')
  console.log('   - dist/types/index.d.ts.map (Declaration source maps)')
  console.log('   - dist/esm/index.js (ES modules)')
  console.log('   - dist/esm/index.js.map (ESM source maps)')
  console.log('   - dist/cjs/index.js (CommonJS)')
  console.log('   - dist/cjs/index.js.map (CJS source maps)')
}

buildAll().catch(console.error)
