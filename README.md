# dylanz.one site

This is the code base for [dylanz.one](https://dylanz.one)

## Simple Customiztion

Git clone to a dev folder, then modify.

### Change existing content pages
Edit the Markdown files under `public` folder. Such as edit the Markdown content in `quizbowl-fun.md`

### Change existing Item Cards
Edit content in `src/ProductList.tsx` file. 
```js
  {
    "title": "Quizbowl Fun",
    "summary": "Notes and resources for quizbowl",
    "image": "01_quizbowl.jpg",
    "description": "Notes and resources for quizbowl",
    "learnMore": "quizbowl-fun"
  },
``` 
Defines the "Quizbowl Fun" card. Can change title, summary, description. 
If change `image`, need to replace the image file under `src/assets/products`. 
If change `learnMore` value, need to update the Markdown file's name accordingly. For example, if change the value tp `quizbowl`, 
need to change the file name under `public` to `quizbowl.md` also.

### Deleting exting Card
Remove the section with in `src/ProductList.tsx`. Remove Markdown file under `public` and image file under `src/assets/products`.

### Adding new Card
Adding a section to the same file, the Markdown file and the image file. File names need to match.

## Test

This project is built with React + TypeScript + Vite.
```bash
npm create vite@latest my-vue-app -- --template react-ts
```

So to test it need to follow `npm`'s way like below:
Install nodejs:
```bash
npm install
```
You just need to run this once.

Test:
```bash
npm run dev
```
Console will display things like:
```
  VITE v6.2.1  ready in 112 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
So you can open above link on browser to see result.

## Commit & Push Main
After save all changes:

```bash
git add .
git commit -a -m "some comments"
git push
```

## Build and Deploy 

**NOTE:** steps here are automated when `main` branch checked in to remote.

What has been done by the automation (defined in `.github/workflows/dyploy-pages.yml`)

Steps:

- `npm run build` - this will create a deploiable package under `dist` folder
- Copy content in `dist` folder to the root of the project under `gh-pages` branch
- Commit & push `gh-pages 

We setup GitHub pages to with `gh-pages` branch and pointed `dylanz.one` domain to that:

- Setup A record in GoDaddy point to the IP 
- On GitHub pages setting, registered dylanz.one as the custom domain 

Typical commands for build & deploy:
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
