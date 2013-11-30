module.exports = function (broccoli) {
  var assetsPackage = new broccoli.readers.Package('assets', new broccoli.transformers.preprocessors.PreprocessorPipeline([
    new broccoli.transformers.preprocessors.ES6TemplatePreprocessor({
      extensions: ['hbs', 'handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    }),
    new broccoli.transformers.preprocessors.CoffeeScriptPreprocessor({
      options: {
        bare: true
      }
    }),
    new broccoli.transformers.preprocessors.ES6TranspilerPreprocessor
  ]))

  var bowerPackages = broccoli.readers.bowerPackages()

  var packages = [assetsPackage].concat(bowerPackages)
  var packageReader = new broccoli.readers.PackageReader(packages)

  var compilerCollection = new broccoli.transformers.compilers.CompilerCollection([
    new broccoli.transformers.compilers.JavaScriptConcatenatorCompiler({
      files: [
        'jquery.js',
        'almond.js',
        'handlebars.js',
        'ember.js',
        'ember-data.js',
        'ember-resolver.js',
        'appkit/**/*.js']
    }),
    new broccoli.transformers.compilers.StaticFileCompiler({
      files: ['index.html']
    })
  ])
  var builder = new broccoli.Builder({
    reader: packageReader,
    transformer: compilerCollection
  })

  return builder
}
