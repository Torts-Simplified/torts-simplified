# Render the whole site into docs/ , which is what GitHub Pages serves.
# In RStudio you can also just press "Build Website" on the Build tab.

if (!requireNamespace("rmarkdown", quietly = TRUE)) {
  install.packages("rmarkdown")
}

rmarkdown::render_site(encoding = "UTF-8")

# GitHub Pages runs Jekyll by default, which ignores folders beginning with an
# underscore. This empty file turns that off so every asset is published.
file.create(file.path("docs", ".nojekyll"))

message("Done. Commit the docs/ folder and push.")
