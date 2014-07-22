Package.describe({
  summary: "A reactive wrapper for Yandex Metrika"
});

Package.on_use(function(api) {
  api.use([
    'underscore',
    'deps'
  ], 'client');

  api.add_files(['lib/metrika.js'], 'client');
  api.export(['Metrika'], 'client');
});