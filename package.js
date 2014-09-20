Package.describe({
  summary: "A reactive wrapper for Yandex Metrika",
  version: "0.1.1",
  git: "https://github.com/datariot/meteor-metrika.git"
});

Package.on_use(function(api) {
  api.versionsFrom("METEOR@0.9.0");
  api.use([
    'underscore',
    'deps'
  ], 'client');

  api.add_files(['lib/metrika.js'], 'client');
  api.export(['Metrika'], 'client');
});