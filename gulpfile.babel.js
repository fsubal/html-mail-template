import 'babel-polyfill';

import gulp from 'gulp';
import fs from 'fs';
import pug from 'pug';
import { exec } from 'child_process';
import json5 from 'json5';
import glob from 'glob';
import path from 'path';
import minimist from 'minimist';

gulp.task('default', ['compile-mail']);

gulp.task('compile-mail', () => {
  glob.sync('./src/*.pug').forEach(async tpl => {
    const basename = path.basename(tpl, '.pug');

    let model = null;
    try {
      model = fs.readFileSync(`./src/model/${basename}.json5`);
    } catch (e) {
      console.error(`[!] ./src/model/${basename}.json5 was not found`);
      throw e;
    }

    // compile pug
    const compiled = pug.renderFile(tpl, json5.parse(model));

    const _tmp = `./tmp/${basename}.html`;
    fs.writeFileSync(_tmp, compiled);

    // run premailer
    try {
      await execp(`bundle exec premailer ${_tmp} > ./dist/${basename}.html`);
    } catch (e) {
      throw e;
    } finally {
      fs.unlinkSync(_tmp);
    }
  });
});

const createPug = name => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
html
  head
    meta(content='ja', http-equiv='Content-Language')
    meta(content='text/html; charset=utf-8', http-equiv='Content-Type')
    meta(content='text/css', http-equiv='Content-Style-Type')
    link(rel='stylesheet', type='text/css',href='../src/css/reset.css')
    link(rel='stylesheet', type='text/css',href='../src/css/${name}.css')
    title サンプルメールだよ
  body
`

gulp.task('scaffold', () => {
  const argv = minimist(process.argv.slice(2));
  const { name } = argv;

  fs.writeFileSync(`./src/${name}.pug`, createPug(name), { flag: 'wx' });
  fs.writeFileSync(`./src/css/${name}.css`, '@charset "utf-8";', { flag: 'wx' });
  fs.writeFileSync(`./src/model/${name}.json5`, '{}', { flag: 'wx' });
});

const execp = command => new Promise((resolve, reject) => (
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return reject(stderr);
    }
    return resolve(stdout);
  })
));

process.on('unhandledRejection', (err, p) => {
  console.error('Error : ', err);
  console.error('Promise : ', p);
  throw err;
});


