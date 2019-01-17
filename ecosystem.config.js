module.exports = {
  apps : [{
    name: 'blogger',
    script: './node_modules/nuxt/bin/nuxt',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '119.27.178.158',
      ref  : 'origin/master',
      repo : 'git@github.com:qq865738120/blogger.git',
      path : '/root/deploy/blogger',
      'post-deploy' : 'npm install && npm run build && npm run start && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
