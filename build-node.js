import esbuild from 'esbuild'

esbuild
  .build({
    entryPoints: ["src/node.js"],
    outfile: "dist/asset-sdk-node.js",
    bundle: false,
    format: 'esm'
  })
  .catch(() => process.exit(1))