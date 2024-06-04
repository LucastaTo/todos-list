module.exports = {
  apps: [
    {
      name: "test-pm2",
      append_env_to_name: true,
      script: "dist/server.js",
      instances: 4,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5174,
        MONGO_USERNAME: "spthehung180222",
        MONGO_PASSWORD: "cOhRcSS15eV4UwFO",
      },
    },
  ],

  deploy: {
    production: {
      user: "root", // user để ssh
      host: "178.128.83.251", // IP của server này (theo sơ đồ)
      ref: "origin/master", // branch để pull source
      repo: "https://github.com/LucastaTo/todos-list",
      path: "/var/www/html/todo-list", // sẽ deploy vào thư mục này
      "post-deploy":
        "yarn install && pm2 startOrRestart ecosystem.config.js --env production", // cmd để deploy
    },
  },
};
