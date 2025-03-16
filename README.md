# dylanz.one site

This is the code base for dylan.AI. 

Built with React + TypeScript + Vite.
```bash
npm create vite@latest my-vue-app -- --template react-ts
```

Also used https://v0.dev/ generated the structure.

## Build and Deploy 
Setup GitHub pages to with `github_pages` branch and: 

- Setup A record in GoDaddy point to the IP 
- On GitHub pages setting, registered zyen.ai as the custom domain 

Build & deploy:
```bash
git checkout main
git pull
npm run build
git checkout github_pages
rm -rf assets/ *.md *.svg *.png *.html
cp -r dist/* .
git add .
git commit -a -m "release v..."
git push
```

Now clean browser buffer, dylanz.one should be updated.