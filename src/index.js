const garie_plugin = require('garie-plugin')
const path = require('path');
const config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');

const myGetData = async (item) => {
    const { url } = item.url_settings;
    return new Promise(async (resolve, reject) => {
        try {
            console.log("here");
            data = {}
            resolve(data);
        } catch (err) {
            console.log(`Failed to get data for ${url}`, err);
            reject(`Failed to get data for ${url}`);
        }
    });
};



console.log("Start");


const app = express();
app.use('/reports', express.static('reports'), serveIndex('reports', { icons: true }));

const main = async () => {
  garie_plugin.init({
    getData:myGetData,
    db_name:'webbkoll',
    plugin_name:'webbkoll',
    report_folder_name:'webbkoll-results',
    app_root: path.join(__dirname, '..'),
    config:config
  });
}

if (process.env.ENV !== 'test') {
  app.listen(3000, async () => {
    console.log('Application listening on port 3000');
    await main();
  });
}
