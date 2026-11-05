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

## Running Docker
1. Install Docker and leave it open in the background (skip sign up, no extra steps needed)
2. Run `npx supabase start` in `/backend` and copy the key starting with `sb_secret_`
3. Run `scripts/demo.sh` OR: run `npm run dev` in both the `/frontend` and `/backend` (one terminal each)
4. Set the following in the `.env` files:

Backend
```bash
SUPABASE_URL=http://127.0.0.1:54321 
SUPABASE_SERVICE_KEY=sb_secret_(...) #  paste the key that was printed in step 2
FRONTEND_URL=http://localhost:3000
PORT=4000
```

Frontend
```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321 
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_secret_(...) #  paste the key that was printed in step 2
NEXT_PUBLIC_API_URL=http://localhost:4000
```
