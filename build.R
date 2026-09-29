# Render the whole site into docs/ , which is what GitHub Pages serves.
# In RStudio you can also just press "Build Website" on the Build tab.

if (!requireNamespace("rmarkdown", quietly = TRUE)) {
  install.packages("rmarkdown")
}

rmarkdown::render_site(encoding = "UTF-8")

# GitHub Pages runs Jekyll by default, which ignores folders beginning with an
# underscore. This empty file turns that off so every asset is published.
file.create(file.path("docs", ".nojekyll"))

# The custom domain, currently switched OFF. The site serves from
# torts-simplified.github.io/torts-simplified/ while this line stays commented.
#
# To turn the custom domain back on: uncomment the line below, render, commit
# and push, then add tortssimplified.com under Settings > Pages. The DNS records
# at Squarespace are already correct and do not need changing.
#
# Why this lives here at all: GitHub writes this file itself when you save the
# domain in Settings, but render_site() rewrites docs/ on every build and would
# drop it, which silently detaches the domain. Writing it here survives that.
#
# writeLines("tortssimplified.com", file.path("docs", "CNAME"))

message("Done. Commit the docs/ folder and push.")
