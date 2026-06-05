---
title: "Linux-basiscommando's"
---

# Linux-basiscommando's (herhaling)

Op de VPS werk je in een **terminal** zonder grafische interface. Een korte opfrissing van de commando's die je nodig hebt. Het bestandssysteem is een **boom** die begint bij de root `/`. Je "huidige map" is je werkmap.

## Navigeren

| Commando | Betekenis |
|----------|-----------|
| `pwd` | *print working directory* - toon de huidige map |
| `ls` | *list* - toon de inhoud van de map |
| `ls -l` | uitgebreide lijst (rechten, grootte, datum) |
| `ls -la` | inclusief verborgen bestanden (beginnen met `.`) |
| `cd map` | *change directory* - ga naar een map |
| `cd ..` | ga één map omhoog |

## Bestanden en mappen beheren

| Commando | Betekenis |
|----------|-----------|
| `mkdir naam` | *make directory* - maak een nieuwe map |
| `touch bestand.txt` | maak een leeg bestand aan |
| `cat bestand.txt` | toon de inhoud van een bestand |
| `nano bestand.txt` | bewerk een bestand in de teksteditor `nano` |
| `cp bron doel` | *copy* - kopieer een bestand |
| `mv bron doel` | *move* - verplaats of hernoem |
| `rm bestand` | *remove* - verwijder een bestand |

:::tip[Werken met `nano`]

`nano` is een eenvoudige teksteditor in de terminal. Onderaan zie je de sneltoetsen: **`Ctrl + O`** om op te slaan (*write Out*, bevestig met Enter) en **`Ctrl + X`** om af te sluiten. Het `^`-teken in `nano` staat voor de `Ctrl`-toets.

:::

## Systeem en pakketten

Op Ubuntu installeer je software met **`apt`**. Veel beheertaken vereisen **`sudo`** (*superuser do*, tijdelijke beheerdersrechten):

```bash
sudo apt update            # pakketlijst verversen
sudo apt install nginx     # software installeren
```
