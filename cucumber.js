module.exports = {
    default: {
      require: ['./src/steps/**/*.ts'],
      format: ['progress'],
      paths: ['./src/features/**/*.feature'],
      publishQuiet: true
    }
  };
  
  