const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//const dbFile = './.data/sqlite.db';
//const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database(dbFile);
