import esbuild from 'esbuild'

esbuild
  .build({
    entryPoints: ["src/index.js"],
    bundle: true,
    outfile: "dist/asset-sdk.js",
    format: 'esm'
  })
  .catch(() => process.exit(1))