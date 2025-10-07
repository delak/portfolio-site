source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

# This is the default theme for new Jekyll sites. You may change this to anything you like.
# gem "minima", "~> 2.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

gem "bundler", "~> 2.5"
gem "jekyll", "~> 4.3"

# Use the modern Sass stack (avoids native `sassc` build issues)
gem "jekyll-sass-converter", "~> 3.0"
gem "sass-embedded", "~> 1.77"

group :development do
  gem "webrick", "~> 1.8"
end

group :jekyll_plugins do
  # add your plugins here, and also list them in _config.yml under `plugins:`
  # gem "jekyll-seo-tag"
  # gem "jekyll-sitemap"
end

# IMPORTANT: If you previously had `gem "github-pages"`, remove it for Netlify builds.
# It pins older versions and isn’t needed on Netlify.
