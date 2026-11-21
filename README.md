# COMPLEXE SCOLAIRE NOUVEAU DEPART — site vitrine

Site React + TypeScript (Vite + Tailwind CSS) pour l'école privée de Bacongo, Brazzaville.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173

> Le projet était à l'origine un « artifact » Meta AI : il n'avait ni `package.json`,
> ni `index.html`, et importait `@meta-ai/artifact-maps` + des chemins `container:///`.
> Ces éléments ont été remplacés par des équivalents locaux (voir plus bas).

## Scripts

| Commande            | Rôle                                          |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Serveur de développement (HMR) sur le port 5173 |
| `npm run build`     | Build de production dans `dist/`              |
| `npm run preview`   | Sert le build de production                   |
| `npm run typecheck` | Vérification TypeScript (`tsc --noEmit`)      |

## Structure

```
index.html          point d'entrée HTML
main.tsx            monte <App /> dans #root
App.tsx             toute la page (contenu, formulaire, carte, PDF)
index.css           styles globaux + directives Tailwind
metaMaps.tsx        remplace @meta-ai/artifact-maps (carte OSM + lien itinéraire)
vite.config.ts      Vite + petit serveur `actions` pour les inscriptions en dev
assets/             photos et logo
```

## Différences par rapport à l'export Meta

1. **Images** : les imports `container:///mnt/data/src/assets/...` pointent maintenant
   vers `./assets/...`.
2. **Carte** : `@meta-ai/artifact-maps` (non publié sur npm) est remplacé par
   `metaMaps.tsx`, qui affiche un embed OpenStreetMap et génère le lien Google Maps
   « Itinéraire ».
3. **Enregistrement des inscriptions** : `App.tsx` appelle `fetch("actions", …)`.
   En développement, un middleware Vite (`localRecordsApi`) répond à
   `records.list` / `records.create` et garde les inscriptions **en mémoire**
   (perdues au redémarrage du serveur). En production, il faudra brancher un vrai
   backend : le formulaire continue de fonctionner via WhatsApp même si l'API échoue.

## Personnaliser

- Numéro WhatsApp : chercher `242053916891` dans `App.tsx`.
- Textes / formations / tarifs : tableaux en haut de `App.tsx`
  (`NAV`, `CHIFFRES`, `FORMATIONS`, `GALERIE`, …).
- Couleurs : variables `--primary`, `--accent` dans `index.css`.
