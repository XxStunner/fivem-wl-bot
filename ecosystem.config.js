module.exports = {
    apps : [
        {
            name: "app",
            script: "./index.js",
            env: {
                NODE_ENV: "DEV",
            },
            env_production: {
                NODE_ENV: "PROD",
            },
            // instances  : 8,
            // exec_mode  : "cluster"
        }
    ]
  }