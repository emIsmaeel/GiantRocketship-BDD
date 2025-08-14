module.exports = {
    default: `--require-module ts-node/register
              --require ./src/support/world.ts
              --require ./src/steps/**/*.ts
              --format progress
              ./src/features/**/*.feature`
  };
  