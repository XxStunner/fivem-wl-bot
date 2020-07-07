module.exports = {
    apps : [
        {
            name: "app",
            script: "./index.js",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
            instances  : 8,
            exec_mode  : "cluster"
        }
    ]
  }