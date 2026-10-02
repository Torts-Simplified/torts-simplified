# Render the whole site into docs/ , which is what GitHub Pages serves.
# In RStudio you can also just press "Build Website" on the Build tab.

if (!requireNamespace("rmarkdown", quietly = TRUE)) {
  install.packages("rmarkdown")
}

rmarkdown::render_site(encoding = "UTF-8")

# GitHub Pages runs Jekyll by default, which ignores folders beginning with an
# underscore. This empty file turns that off so every asset is published.
file.create(file.path("docs", ".nojekyll"))

# The custom domain. GitHub writes this file itself when the domain is saved
# under Settings > Pages, but render_site() rewrites docs/ on every build and
# would drop it, which silently detaches the domain. Writing it here means the
# file survives every render and www.tortssimplified.com keeps serving the site.
#
# The value must match exactly what is set under Settings > Pages. It is the
# www form, not the bare domain; writing the bare domain here would change the
# setting on the next build.
#
# Leave this line active for as long as the site uses the custom domain. To go
# back to torts-simplified.github.io/torts-simplified/, comment it out AND
# remove the domain under Settings > Pages.
writeLines("www.tortssimplified.com", file.path("docs", "CNAME"))

message("Done. Commit the docs/ folder and push.")
