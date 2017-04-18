Building the website:

```
  git checkout master
  git push origin --delete gh-pages
  git branch -D gh-pages
  git checkout --orphan gh-pages
  git commit -a -m "gh-pages branch tracks master"
  git push origin gh-pages
```
