const rp = require('request-promise');
const $ = require('cheerio');
const h2p = require('html2plaintext')
const path = require('path');
const _cliProgress = require('cli-progress');
const {checkCreateDir} = require('./dirsutil.js');
const fs = require('fs');
const request = require('request');

const WAVEN_BASE_URL = 'https://www.waven-game.com';

function detectClass(classes, url) {
  for(let key in classes) {
    if (url.includes(classes[key].name+'/')) {
      return classes[key].name;
    }
  }
}

function checker(object, ...args) {
  let cur = object;
  let count = 0;
  for (let key in args) {
    if (cur[args[key]] !== undefined) {
      cur = cur[args[key]];
    } else {
      return false;
    }
  }
  return true;
}

function download(uri, filename){
  request.head(uri, function(err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename))
    .on('error', (error) => {
      console.log(`\nERROR DOWNLOAD\n`)
      console.log(error);
    });
  });
};

async function parseEmblem(emblem, global_class_folder, local_class_folder) {
  if (!checker(emblem, '0', 'attribs', 'src')) {
    return;
  }
  let class_image_url = WAVEN_BASE_URL + emblem[0].attribs.src;
  let img_name = class_image_url.substring(class_image_url.lastIndexOf('/')+1,class_image_url.length);

  await download(class_image_url, path.join(global_class_folder, img_name));

  return path.join(local_class_folder, img_name);
}

async function parseSpell(spell, global_class_folder, local_class_folder) {
  if (!checker(spell, 'attribs', 'data-content')) {
    return;
  }

  let data_content = spell['attribs']['data-content'];

  let spell_img_url = data_content.substring(data_content.indexOf('<img class="img-fluid" src="') + 28, data_content.indexOf(`.png"`) + 4);
  let img_name = spell_img_url.substring(spell_img_url.lastIndexOf('/')+1,spell_img_url.length);

  await download(spell_img_url, path.join(global_class_folder, img_name));

  let part = data_content.substring(data_content.indexOf('<div class="ak-name">') + 21, data_content.length);
  let spell_name = part.substring(0, part.indexOf('</div>'));
  let info = h2p(data_content).replace(spell_name, '').trim();

  return {
    image: path.join(local_class_folder, img_name),
    name: {
      fr: spell_name
    },
    info: {
      fr: info
    }
  }
}

async function parseSpecialty(char_spec, global_class_folder, local_class_folder) {
  if (!checker(char_spec, '0', 'attribs', 'data-content')) {
    console.log(`\nERROR\n`);
    console.log(`No data content for character ${characters[key].children[3].children[0].data}`);
    return;
  }

  let data_content = char_spec[0]['attribs']['data-content'];
  let spec_info = h2p(data_content).split('      ');

  let active_data = data_content.split('<div class="row">')[2];
  let active_name = active_data.substring(active_data.indexOf('<div class="ak-name">') + 21, active_data.length);
  active_name = active_name.substring(0, active_name.indexOf('</div>'));

  let spec_image_url = data_content.substring(data_content.indexOf('src="') + 5, data_content.length);
  spec_image_url = spec_image_url.substring(0, spec_image_url.indexOf('"'));

  let img_name = spec_image_url.substring(spec_image_url.lastIndexOf('/')+1,spec_image_url.length);

  await download(spec_image_url, path.join(global_class_folder, img_name));
  return {
    passive: {
      fr: spec_info[0].replace('Passif : ', '')
    },
    active_name: {
      fr: active_name
    },
    active_info: {
      fr: spec_info[1].replace(active_name + ' ', '')
    },
    image: path.join(local_class_folder, img_name)
  }
}

module.exports.get_classes = async function (classes, characters_url, public_dir_path, lib_path) {
  let bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);

  let dir_classes = path.join(public_dir_path, 'assets', 'classes');
  checkCreateDir(dir_classes);

  let json_object = {
    classes: {}
  };

  bar1.start(classes.length + 1, 0);

  for (let c = 0; c < classes.length; c++) {
    await rp(classes[c].url).then(async function(html) {

      json_object.classes[classes[c].name] = {
        spells: [],
        description: {
          fr: ''
        }
      };

      // folder

      let global_class_folder = path.join(dir_classes, classes[c].name);
      checkCreateDir(global_class_folder);
      let local_class_folder = path.join('assets', 'classes', classes[c].name);


      // class info

      let class_description = h2p($('div.ak-block-text > div.ak-text', html));
      json_object.classes[classes[c].name].description.fr = class_description;

      let class_image_item = $('img.ak-img-big', html);
      parseEmblem(class_image_item, global_class_folder, local_class_folder).then(imagepath => json_object.classes[classes[c].name].emblem_image = imagepath);

      // class spells

      let spells = $('.ak-list > div.ak-list-spells > div > a', html);
      Object.keys(spells).forEach(key => parseSpell(spells[key], global_class_folder, local_class_folder).then(
        result => {if (result) json_object.classes[classes[c].name].spells.push(result)}
      ));

      // characters
      json_object.classes[classes[c].name].characters = [];

      let characters = $('div.ak-picto-breed > a', html);

      Object.keys(characters).forEach(key => {
        if (checker(characters[key], 'attribs', 'title')) {
          delete characters[key];
        }
      });

      for (let key in characters) {

        if (!checker(characters[key], 'children', '1', 'name')
        || !characters[key].children[1].name === 'img'
        || !checker(characters[key].children[1], 'attribs', 'src')) {
          continue;
        }
        let char_image_url = WAVEN_BASE_URL + characters[key].children[1].attribs.src;
        let img_name = char_image_url.substring(char_image_url.lastIndexOf('/')+1,char_image_url.length);

        await download(char_image_url, path.join(global_class_folder, img_name));

        let character = {
          name: characters[key].children[3].children[0].data,
          image: path.join(local_class_folder, img_name)
        }

        if (!checker(characters[key], 'attribs', 'href')) {
          console.log(`\nNO LINK FOR ${characters[key].children[3].children[0].data}\n`);
          continue;
        }

        let character_url = WAVEN_BASE_URL + characters[key].attribs.href;
        await rp(character_url).then(async function(html) {
          let char_spec = $('div.ak-illu > a', html);
          //parseSpecialty(char_spec, global_class_folder, local_class_folder).then((result) => {character.specialty = result})
        });

        json_object.classes[classes[c].name].characters.push(character);
      }
    })
    .catch(function(err){
      console.log(`\nERROR HTML PARSE\n`);
      //console.log(err);
    });
    bar1.increment();
  }

  for (let c in classes) {
    json_object.classes[classes[c].name].characters = [];
  }

  await rp(characters_url).then(async function(html) {
    let characters_a = $('div.d-flex > div > a', html);
    for (let key in characters_a) {
      if (checker(characters_a[key], 'attribs', 'href')) {
        let char_class = detectClass(classes, characters_a[key].attribs.href);

        let global_class_folder = path.join(dir_classes, char_class);
        checkCreateDir(global_class_folder);
        let local_class_folder = path.join('assets', 'classes', char_class);

        if (!char_class) {
          console.log('ERROR\nCan\'t detect class\n');
        }

        let char_obj = {};

        let character_url = WAVEN_BASE_URL + characters_a[key].attribs.href;
        await rp(character_url).then(async function(html) {
          let char_spec = $('div.ak-illu > a', html);
          parseSpecialty(char_spec, global_class_folder, local_class_folder).then((result) => {
            char_obj.specialty = result;
          });
        });

        if (checker(characters_a[key], 'children', '3', 'children', '0', 'data')) {
          char_obj.name = {
            fr: characters_a[key].children[3].children[0].data
          };
        }

        if (checker(characters_a[key], 'children', '1', 'attribs', 'src')) {
          let img_url = WAVEN_BASE_URL + characters_a[key].children[1].attribs.src;
          let img_name = img_url.substring(img_url.lastIndexOf('/')+1, img_url.length);
          await download(img_url, path.join(global_class_folder, img_name));
          char_obj.image = path.join(local_class_folder, img_name);
        }

        json_object.classes[char_class].characters.push(char_obj);

      }
    }
  });

  if (fs.existsSync(lib_path)){
    await fs.unlink(lib_path, (err) => {
      if (err) {
        console.log('Can\'t delete');
        //console.log(err);
      }
    });
  }

  await fs.writeFile(lib_path, JSON.stringify(json_object, null, 4), 'utf8', (err, data) => {
    if (err) {
      console.log(`\nERROR WRITE FILE\n`)
      //console.log(err);
    }
  });

  bar1.increment();
  bar1.stop();
}
