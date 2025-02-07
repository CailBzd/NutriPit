# NutriPit

NutriPit est une solution numérique complète destinée aux établissements où la nutrition des personnes doit être strictement contrôlée. Initialement conçue pour les EHPAD, l'application se généralise à tout établissement (hôpitaux, centres de rééducation, etc.) nécessitant une gestion personnalisée des repas.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
  - [Monorepo Structure](#monorepo-structure)
  - [API (Next.js)](#api-nextjs)
  - [Interface Web](#interface-web)
  - [Application Mobile](#application-mobile)
- [Environnements et Déploiement](#environnements-et-déploiement)
- [Contribution](#contribution)
- [Licence](#licence)

## Fonctionnalités

- **Gestion personnalisée des repas** : Création de régimes, planification de menus adaptés et suivi nutritionnel.
- **Interface sécurisée** : Authentification robuste via Supabase, gestion des sessions et des données sensibles.
- **Notifications** : Envoi de notifications par email (EmailJS) et push.
- **Multi-plateforme** : Application mobile/tablette (React Native) et interface web responsive.

## Architecture

Le projet se décompose en trois volets interconnectés :

1. **API sécurisée**  
   - Développée en Next.js, hébergée sur `api.nutripit.pitlab.fr` (et `api.staging.nutripit.pitlab.fr` en staging).  
   - Gère la logique métier, les endpoints sécurisés et la communication via HTTPS.

2. **Interface Web**  
   - Accessible via `nutriPit.pitlab.fr` (production) et `staging.nutripit.pitlab.fr` (staging).
   - Construite en Next.js ou via React Native Web pour partager des composants avec l’application mobile.

3. **Application Mobile/Tablette**  
   - Développée en React Native (Expo ou React Native CLI).  
   - Communique avec l’API via HTTPS et utilise Supabase pour l’authentification.

## Prérequis

- [Node.js](https://nodejs.org) (version LTS recommandée)
- Un compte [GitHub](https://github.com)
- Compte Supabase pour la gestion de la base de données et l’authentification
- Compte sur [Scaleway](https://www.scaleway.com) pour la gestion DNS
- Outils comme EmailJS pour les notifications par email

## Installation

### Monorepo Structure

Le repository est organisé en monorepo afin de centraliser les trois volets du projet :

```bash
nutripit/
├── api/         # Projet Next.js pour l'API
├── mobile/      # Projet React Native pour l'application mobile/tablette
└── web/         # Projet Next.js ou React Native Web pour l'interface web
