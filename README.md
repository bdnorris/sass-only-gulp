# sass-only-gulp
Basic Gulp setup that just compiles, auto-prefixes, and minifies Sass files.

## Run

If you've never ran gulp before...
`yarn global add gulp-cli`
`yarn global add gulp`

`yarn` to install dependencies.

`gulp` (default task)

compiles Sass files, then watches Sass files for changes and re-compiles, creating a __Sourcemap__.

`gulp dev`

compiles Sass files with Sourcemaps, then stops.

`gulp build`

compiles Sass files with Auto-prefixing and Minifying, then stops.


## Also

This is meant as a base setup for using Sass with a CMS, where the templates and javascript files could be setup any number of ways.

I've also got some Normalize from https://necolas.github.io/normalize.css/,
many utilities from Foundation for Sites https://github.com/zurb/foundation-sites,
and a lot of my own stuff.

JS tasks could be extended onto this gulp file if needed.
