# Render the whole site into docs/ , which is what GitHub Pages serves.
# In RStudio you can also just press "Build Website" on the Build tab.

if (!requireNamespace("rmarkdown", quietly = TRUE)) {
  install.packages("rmarkdown")
}

rmarkdown::render_site(encoding = "UTF-8")

# GitHub Pages runs Jekyll by default, which ignores folders beginning with an
# underscore. This empty file turns that off so every asset is published.
file.create(file.path("docs", ".nojekyll"))

# The custom domain. GitHub writes this file itself when you save the domain
# under Settings > Pages, but render_site() rewrites docs/ on every build and
# would drop it, which quietly detaches the domain. Writing it here means it
# survives every render.
writeLines("tortssimplified.com", file.path("docs", "CNAME"))

message("Done. Commit the docs/ folder and push.")
