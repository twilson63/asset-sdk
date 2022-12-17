import esbuild from 'esbuild'

esbuild
  .build({
    entryPoints: ["src/index.js"],
    outfile: "dist/asset-sdk.js",
    bundle: true,
    format: 'esm'
  })
  .catch(() => process.exit(1))