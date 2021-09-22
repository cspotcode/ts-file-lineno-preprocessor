const { esbuildPlugin } = require('.');

// ESBuild usage example:
require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'bundle.js',
    plugins: [esbuildPlugin],
}).catch(() => process.exit(1))
