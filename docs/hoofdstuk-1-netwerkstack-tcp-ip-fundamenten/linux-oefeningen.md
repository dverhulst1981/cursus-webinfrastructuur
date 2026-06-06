---
title: "Oefeningen: Linux-basiscommando's"
---

# Oefeningen: Linux-basiscommando's

> Werk deze oefeningen uit op een **Linux-systeem** (lokaal of in WSL) - een server is niet nodig. Elke oefening maakt zelf de bestanden aan die ze gebruikt, zodat je alles meteen kunt uittesten. Zoek bij elke stap zelf het juiste commando (gebruik de [Linux-basiscommando's](./linux-commandos.md) als naslag) en voer de stappen in volgorde uit. De uitgewerkte oplossingen vind je bij de [Oplossingen](./oplossingen.md#oplossingen-linux-basiscommandos).
>
> Het **deployen van een statische webpagina** (webserver installeren, pagina online zetten) oefen je apart op de pagina [Een statische webpagina](./statische-pagina.md).

## Oefening 1 - Navigatie en verkenning

1. Toon je huidige map.
2. Ga naar de root `/` en lijst de inhoud op.
3. Ga naar de map `/etc` en toon de inhoud als **gedetailleerde lijst** (met rechten, eigenaar en grootte).
4. Spring in **één** commando terug naar je home-map.
5. Lijst je home-map op **inclusief de verborgen bestanden**.
6. Spring met **één** commando terug naar de vorige map (`/etc`) en weer terug.
7. Geef voor je home-map zowel het **absolute** als een **relatief** pad (vanuit `/etc`).

## Oefening 2 - Bestanden en mappen beheren

1. Ga naar je home-map en maak in **één** commando de mappenstructuur `project/src` aan.
2. Maak in `project` een leeg bestand `README.md` aan.
3. Maak in `project/src` twee lege bestanden: `app.js` en `helper.js`.
4. Kopieer `README.md` naar `project/LEESMIJ.md`.
5. Hernoem `project/src/helper.js` naar `project/src/utils.js`.
6. Kopieer de hele map `project` naar `project-backup`.
7. Verwijder het bestand `project/LEESMIJ.md`.
8. Toon de volledige inhoud van `project` (inclusief submappen) als **gedetailleerde lijst** en controleer het resultaat.

## Oefening 3 - Rechten met `chmod` en `chown`

1. Maak in je home-map een bestand `script.sh` aan met als inhoud de regel `echo "Hallo"`.
2. Bekijk de huidige rechten met een **gedetailleerde lijst**.
3. Geef met **cijfernotatie** de eigenaar `rwx` en de groep en overige gebruikers `r-x`. Controleer het resultaat.
4. Geef met **cijfernotatie** de rechten `rw-r--r--`. Controleer opnieuw.
5. Voeg met **letternotatie** in één commando uitvoerrecht toe voor de eigenaar en haal schrijfrecht weg bij de groep. Controleer.
6. *(Uitdaging)* Verander met `sudo` de **groep** van `script.sh` naar `root` en zet daarna de eigenaar terug naar jezelf. Bekijk telkens het resultaat.

## Oefening 4 - Tekst filteren met `grep`, `sort` en pipes

1. Maak een bestand `log.txt` aan met onderstaande regels (gebruik `echo` met `>` en `>>`, of `nano`):

   ```text
   INFO  start
   ERROR  schijf vol
   info  herstart
   WARNING  trage respons
   ERROR  netwerk weg
   INFO  klaar
   ```

2. Toon het bestand met **genummerde** regels.
3. Toon enkel de regels die `ERROR` bevatten.
4. Toon alle regels met `info` **ongeacht hoofdletters** (zowel `INFO` als `info`).
5. Toon de regels die **geen** `INFO` bevatten.
6. Tel hoeveel regels het bestand telt.
7. Sorteer de regels alfabetisch en stuur het resultaat naar een nieuw bestand `gesorteerd.txt` (gebruik een **pipe** en **redirection**).
8. Tel met één pijplijn hoe vaak elk **eerste woord** (`INFO`, `ERROR`, …) voorkomt. *Tip:* combineer `cut`, `sort` en `uniq -c`.

## Oefening 5 - Processen en gebruikers

1. Toon als welke gebruiker je bent ingelogd.
2. Toon je user-id, group-id en groepen.
3. Start een commando dat 300 seconden wacht **in de achtergrond** (zodat je shell vrij blijft).
4. Toon de actieve/gepauzeerde taken in deze shell.
5. Zoek de **PID** van dat wachtcommando op.
6. Stop het proces via zijn PID en controleer dat het weg is.
7. Toon de actieve processen als een **boom met PID's**.
