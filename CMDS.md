## Docs

To compile DOC.tex to pdf:

**Windows**
```powershell
winget install TectonicProject.Tectonic
tectonic DOC.tex
```

**macOS**
```bash
brew install tectonic
tectonic DOC.tex
```

## Diagrams ([D2](https://d2lang.com/))

To rebuild the diagrams:

**Windows**
```powershell
winget install terrastruct.d2
Get-ChildItem diagrams -Recurse -Filter *.d2 | ForEach-Object { d2 $_.FullName ($_.FullName -replace '\.d2$', '.png') }
```

**macOS**
```bash
brew install d2
for f in diagrams/*/*.d2; do d2 "$f" "${f%.d2}.png"; done
```