const fs    = require('fs')
const fsx   = require('fs-extra')
const path  = require('path')
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { build, context }  = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');
// const esbuildEnv = require('esbuild-envfile-plugin');
// const vuePlugin = require("esbuild-plugin-vue3");

// コマンドライン引数を解析
const argv = yargs(hideBin(process.argv))
  .option('watch', {
    alias: 'w',
    describe: 'Devモード',
    type: 'boolean',
    demandOption: true,
    default: false
  })
  .option('port', {
    alias: 'p',
    describe: 'Watcherモード ポート番号',
    type: 'number',
    demandOption: true,
    default: 3000
  })
  .option('env-file', {
    alias: 'e',
    describe: '.envファイルのパス',
    type: 'string',
    demandOption: true,
    default: '.env'
  })
  .option('file-name', {
    alias: 'f',
    describe: 'ビルドファイル名',
    type: 'string',
    demandOption: true,
    default: 'dist'
  })
  .help()
  .alias('help', 'h')
  .argv;


const outdir  = 'dist'
const outfile = `${outdir}/${argv['file-name']}${(argv.watch ? '' : '.min')}.js`
const fileExists = (filePath = '') => fs.existsSync(path.resolve(filePath))
const env = fileExists('.env') ? require('dotenv').config({path: path.resolve(argv['env-file'])}).parsed : {}

const _builder = {
  entryPoints: [path.resolve('./src/index.js')],
  bundle: true,
  minify: !argv.watch,
  sourcemap: argv.watch,
  outfile,
  define: {
    'process.env': JSON.stringify(env),
    'process.env.NODE_ENV': process.env.NODE_ENV || '"development"',
  },
  plugins: [
    sassPlugin(),
    // vuePlugin(),
    // esbuildEnv,
  ],
}

run().then(async _ => {
  if (argv.watch) {
    // パッケージビルド
    const ctx = await context(_builder)

    // watchモード準備
    await ctx.watch()
    console.log('watching...')

    // SSLでローカルサーバ起動
    await ctx.serve({
      port: argv.port,
      host: 'localhost',
      servedir: "./",
    })
  } else {
    // パッケージビルド
    console.log('🔨 Building...')
    await build(_builder)
  }
}).catch(e => {
  console.log('🚫 Error!')
  console.log(JSON.stringify(e))
  process.exit(1)
})

function run() {
  return new Promise((resolve) => {
    if (fs.existsSync(outdir)) {
      fsx.remove(outdir)
      resolve(true)
    } else {
      resolve(false)
    }
  })
}