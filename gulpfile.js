const {get_classes} = require('./nodesrc/wavenloader.js');
const path = require('path');
const gulp = require('gulp');
const del = require('del');


const PUBLIC_DIR_PATH = path.join(__dirname, './public');
const LIB_PATH = path.join(__dirname, './src/data', 'lib.json');
const CHARACTERS_URL = 'https://www.waven-game.com/fr/heros';

const classes = [
  {url: 'https://www.waven-game.com/fr/heros/7-xelor/945-aiguille-pikuxala', name: 'xelor'},
  {url: 'https://www.waven-game.com/fr/heros/1-iop/534-flamboyante-kasai', name: 'iop'},
  {url: 'https://www.waven-game.com/fr/heros/2-cra/191-shiru-shaden', name: 'cra'},
  {url: 'https://www.waven-game.com/fr/heros/3-eniripsa/141-gemme-dephasante', name: 'eniripsa'},
  {url: 'https://www.waven-game.com/fr/heros/6-sram/182-ken-kartana', name: 'sram'},
  {url: 'https://www.waven-game.com/fr/heros/8-sacrieur/381-darde-kan', name: 'sacrieur'},
  {url: 'https://www.waven-game.com/fr/heros/11-osamodas/196-baton-de-berger', name: 'osamodas'}
];

gulp.task('generate', function() {
  return get_classes(classes, CHARACTERS_URL, PUBLIC_DIR_PATH, LIB_PATH);
});

gulp.task('clean', async function() {
  await del(['./src/data/lib.json']);
  await del(['./public/assets/**']);
  await del(['./dist/**']);
});

gulp.task('test', async function() {
  return console.log('test');
});
