'use strict';

const fs = require('node:fs');
const path = require('node:path');
const Mustache = require('mustache');

const templateDir = path.join(__dirname, './templates/');
const targetDirs = [path.join(__dirname, './docs/de/'), path.join(__dirname, './docs/en/')];

function generateProviders() {
    const MUSTACHE_TEMPLATE = path.join(templateDir, 'providers.mustache');

    const templateData = {};

    try {
        const template = fs.readFileSync(MUSTACHE_TEMPLATE);
        const output = Mustache.render(template.toString(), templateData);

        for (const targetDir of targetDirs) {
            fs.writeFileSync(path.join(targetDir, 'providers.md'), output);
        }

        console.log('generated providers.md');
    } catch (err) {
        console.error(`Unable to render mustache file "${MUSTACHE_TEMPLATE}": ${err}`);
    }
}

generateProviders();
