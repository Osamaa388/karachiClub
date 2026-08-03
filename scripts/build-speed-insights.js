const esbuild = require('esbuild');
const path = require('path');

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['js/speed-insights.js'],
      bundle: true,
      minify: true,
      format: 'iife',
      outfile: 'js/speed-insights.bundle.js',
      platform: 'browser',
      target: ['es2015'],
    });
    console.log('✓ Speed Insights bundled successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
