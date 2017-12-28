
module.exports = {
  "apps": {
    "name": "thankyou-server",
    "script": "./index.js",
    "instances": 1,
    "exec_mode": "cluster",
    "max_memory_restart": "1500M",
    "max_restarts": 5,
    "autorestart": true,
    "restart_delay": 1000,
    "min_uptime": 1000,
    "watch": [
      "index.js",
      "gulpfile.js",
      ".eslintrc",
      ".env",
      "pm2.config.js",
      "router"
    ],
    "watch_options": {
      "awaitWriteFinish": true
    },
    "env": {
      "NODE_ENV": "development",
      "PM2_PROCESS_NAME": "thankyou-server"
    }
  }
};
