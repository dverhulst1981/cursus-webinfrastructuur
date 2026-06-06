---
title: "Oefeningen: Linux-basiscommando's"
---

# Oefeningen: Linux-basiscommando's

> Werk deze oefeningen uit op een **Linux-systeem** (lokaal of in WSL). Ze vormen samen één verhaal: je **bouwt een webpagina**, **installeert een webserver** en zet je pagina ten slotte **online**. Zoek bij elke stap zelf het juiste commando (gebruik de [Linux-basiscommando's](./linux-commandos.md) als naslagwerk) en voer de stappen in volgorde uit.

## Oefening 1 - Verken het bestandssysteem

1. Toon je huidige map.
2. Ga naar de root `/` en lijst de inhoud op.
3. Ga naar de map `/var` en toon de inhoud als **gedetailleerde lijst** (met rechten, eigenaar en grootte).
4. Spring in **één** commando terug naar je home-map.
5. Lijst je home-map op **inclusief de verborgen bestanden**.

## Oefening 2 - Bouw je webpagina

Je maakt de HTML-pagina die je later online zet.

1. Ga naar je home-map, maak er de map `mijnsite` aan en ga erin.
2. Open `index.html` in `nano`, typ onderstaande inhoud en sla op (`Ctrl + O`, Enter; afsluiten met `Ctrl + X`):

   ```html
   <!DOCTYPE html>
   <html lang="nl">
   <head>
     <meta charset="utf-8">
     <title>Mijn eerste server</title>
   </head>
   <body>
     <h1>Hallo vanaf mijn server!</h1>
     <p>Deze pagina draait op mijn eigen webserver.</p>
   </body>
   </html>
   ```

3. Toon de inhoud van `index.html` om te controleren dat ze correct is opgeslagen.

## Oefening 3 - Installeer een webserver

Een webserver is het programma dat je pagina aan bezoekers levert. We gebruiken **nginx**. (De alternatieven **Apache** en **webfsd** komen aan bod in [Een statische webpagina deployen](./statische-pagina.md).)

1. Ververs eerst de pakketlijst.
2. Installeer de webserver `nginx`.
3. Controleer of de `nginx`-service actief is.

## Oefening 4 - Verken de webroot

nginx levert standaard de bestanden uit de map `/var/www/html` (de **webroot**).

1. Ga naar de webroot `/var/www/html` en toon de inhoud als **gedetailleerde lijst**.
2. Toon de inhoud van het standaard HTML-bestand dat daar staat.
3. Spring terug naar je home-map.

## Oefening 5 - Zet je pagina online

1. Kopieer met beheerdersrechten je bestand `~/mijnsite/index.html` naar de webroot `/var/www/html/`, zodat het de standaardpagina vervangt.
2. Geef het bestand **lees- en schrijfrecht voor de eigenaar** en **enkel leesrecht voor de groep en de overige gebruikers**.
3. Toon de inhoud van de webroot als **gedetailleerde lijst** en controleer dat je `index.html` er staat met de rechten die je in stap 2 instelde.

## Oefening 6 - Controleer dat je pagina online staat

1. Surf in de webbrowser naar het adres `http://localhost` en controleer dat je je eigen tekst uit oefening 2 terugziet.


:::tip[Waarom eerst apt update?]

`apt update` haalt de **actuele lijst** van beschikbare pakketten en versies op. Sla je dit over, dan installeer je mogelijk een verouderde versie of vindt `apt` een recent pakket niet. `apt update` wijzigt zelf nog niets aan je systeem - dat doen pas `apt install` of `apt upgrade`.

:::
