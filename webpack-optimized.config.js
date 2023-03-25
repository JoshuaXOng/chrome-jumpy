'use strict';

const wpDebugConfig = require('./webpack-debug.config');

let wpOptimizedConfig = wpDebugConfig

wpOptimizedConfig.mode = 'production'

module.exports = wpOptimizedConfig
