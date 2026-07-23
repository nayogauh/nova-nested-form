const mix = require("laravel-mix");
const path = require("path");

/*
 * Register the Mix "nova" extension.
 *
 * Nova 5 ships the extension through the `laravel/nova-devtool` composer
 * package (exposed to npm as `laravel-nova-devtool`). Nova 4 does not, so we
 * fall back to the extension bundled with this package (./mix). This keeps the
 * assets buildable against both Nova 4 and Nova 5.
 */
try {
    require("laravel-nova-devtool");
} catch (e) {
    require("./mix");
}

mix
    .setPublicPath("dist")
    .js("resources/js/field.js", "js")
    .vue({ version: 3 })
    .sass("resources/sass/field.scss", "css")
    .sourceMaps()
    .alias({
        "@": path.join(__dirname, "vendor/laravel/nova/resources/js"),
    })
    .nova("datomatic/nova-nested-form");

module.exports = {};
