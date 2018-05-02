import 'babel-polyfill';

import gulp from 'gulp';
import fs from 'fs';
import pug from 'pug';
import { exec } from 'child_process';
import json5 from 'json5';
import glob from 'glob';
import path from 'path';

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


