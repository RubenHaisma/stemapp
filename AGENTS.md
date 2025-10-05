# Repository Guidelines

## Project Structure & Module Organization
- `app/` bevat Expo Router schermen; houd routes in `app/(tabs)` modulair en lichtgewicht.
- `contexts/` en `hooks/` centraliseren gedeelde status; de `QuestionnaireProvider` verzorgt elke datastroom.
- `lib/` bundelt hulplagen zoals `lib/dataSource.ts` en `lib/types.ts`; importeer ze via de `@/` alias.
- `data/questionnaire.ts` levert één bron voor dataset én Prisma seed; pas wijzigingen daar toe.
- `server/` bevat een Express + Prisma API (`server/index.ts`) voor vragenlijstdata en het bewaren van antwoorden.
- `prisma/` bevat `schema.prisma` en `seed.ts`; koppel schema-updates aan een migratie en vernieuwde seed.

## Build, Test, and Development Commands
- `pnpm install` synchroniseert dependencies voor Expo, Prisma en de API.
- `pnpm dev` start de Expo bundler; combineer met `pnpm server:dev` om de API lokaal te draaien.
- `pnpm build:web` maakt een statische export.
- `pnpm lint` en `pnpm typecheck` houden stijl en types strak.
- `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:seed` beheren Prisma client, migraties en seeddata.

## Coding Style & Naming Conventions
- Gebruik twee spaties, trailing commas en double quotes conform de bestaande codebase.
- Componenten leven in `.tsx`, gedeelde utiliteiten in `.ts`; houd businesslogica buiten UI-componenten.
- PascalCase voor componenten, camelCase voor functies/variabelen, SCREAMING_SNAKE_CASE voor environmentvariabelen.
- Houd Prisma-modellen enkelvoudig en beschrijf relaties expliciet in `schema.prisma`.

## Testing Guidelines
- Voeg logica-intensieve component- of hooktests toe in `__tests__/` met React Native Testing Library + Jest.
- Noem tests naar het doelbestand (`QuestionnaireContext.test.tsx`) en focus op gebruikersgedrag en edge cases.
- Draai minimaal `pnpm lint` en `pnpm typecheck` vóór elke pull request; breid later uit met API-integratietests.

## Commit & Pull Request Guidelines
- Hanteer Conventional Commits (`feat:`, `fix:`, `chore:`) met beknopte, gebiedende beschrijvingen en optionele scopes.
- Koppel relevante issues en verwijs naar Prisma-migraties plus seed-wijzigingen in de PR-body.
- Voeg screenshots of video’s toe bij UI-wijzigingen en beschrijf verificatiestappen (Expo run, API, lint, typecheck, seed).

## Environment & Configuration Tips
- Stel `DATABASE_URL` in voor Postgres; gebruik `.env.local` voor lokale waarden.
- `EXPO_PUBLIC_API_BASE_URL` moet wijzen naar de Express-API (standaard `http://localhost:3333`).
- Prisma seed synchroniseert met `data/questionnaire.ts`; wijzig data één keer en voer vervolgens `pnpm db:seed` uit.
