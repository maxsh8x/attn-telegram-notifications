module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'rabbitmq-telegram-notifications',
      script    : 'src/index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'deploy',
      host : '10.147.18.75',
      port: "22",
      ref  : 'origin/master',
      repo : 'git@gitlab.com:thesalt-common-projects/rabbitmq-telegram-notifications.git',
      path : '/home/deploy/projects/rabbitmq-telegram-notifications',
      'post-deploy' : 'yarn install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'deploy',
      host : '10.147.18.75',
      port: "22",
      ref  : 'origin/master',
      repo : 'git@gitlab.com:thesalt-common-projects/rabbitmq-telegram-notifications.git',
      path : '/home/deploy/projects/rabbitmq-telegram-notifications',
      'post-deploy' : 'yarn install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
