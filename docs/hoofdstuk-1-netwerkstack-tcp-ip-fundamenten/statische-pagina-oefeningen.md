---
title: "Oefeningen: een statische webpagina deployen"
---

# Oefeningen: een statische webpagina deployen

> We gaan ervan uit dat je in de vorige stap een **VPS op Azure** hebt aangemaakt. Je voert deze oefeningen dus uit **op die server**: daarom log je eerst via **SSH** in (oefening 1). Ze vormen samen één verhaal: je logt in, **bouwt een pagina**, **installeert nginx** en zet je pagina ten slotte **online**. Achtergrond over de webservers vind je op [Een statische webpagina](./statische-pagina.md). Zoek de commando's zelf op met de [Linux-basiscommando's](./linux-commandos.md) als naslag; de uitgewerkte oplossingen vind je bij de [Oplossingen](./oplossingen.md#oplossingen-statische-webpagina-deployen).

## Oefening 1 - Log in op je VPS

Eerst maak je verbinding met je Azure-VPS, want al het volgende werk gebeurt op die server.

1. Log via **SSH** in op je server met je gebruiker en het **publieke IP-adres** van de VPS (zie [SSH](./ssh.md) en [Virtual Private Server](./vps.md)).
2. Controleer met `whoami` en `pwd` dat je effectief op de server zit en in je home-map staat.

## Oefening 2 - Bouw je webpagina

Je maakt eerst de HTML-pagina die je daarna online zet.

1. Ga naar je home-map, maak er de map `mijnsite` aan en navigeer in de map.
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

## Oefening 3 - Installeer nginx

1. Ververs eerst de pakketlijst.
2. Installeer **nginx**.
3. Controleer of de `nginx`-service actief is.

:::tip[Waarom eerst apt update?]

`apt update` haalt de **actuele lijst** van beschikbare pakketten en versies op. Sla je dit over, dan installeer je mogelijk een verouderde versie of vindt `apt` een recent pakket niet. `apt update` wijzigt zelf nog niets aan je systeem - dat doen pas `apt install` of `apt upgrade`.

:::

## Oefening 4 - Zet je pagina online

nginx serveert de bestanden uit de webroot `/var/www/html`.

1. Kopieer met beheerdersrechten je bestand `~/mijnsite/index.html` naar de webroot `/var/www/html/`, zodat het de standaardpagina vervangt.
2. Geef het bestand **lees- en schrijfrecht voor de eigenaar** en **enkel leesrecht voor de groep en de overige gebruikers**.
3. Toon de inhoud van de webroot als **gedetailleerde lijst** en controleer dat je `index.html` er staat met de rechten die je in stap 2 instelde.

## Oefening 5 - Verifieer dat je pagina online staat

Verifiëren dat je pagina bereikbaar is, hoort bij *OLR 07*.

1. Test vanaf de server zelf met `curl http://localhost` en controleer dat je je eigen tekst uit oefening 2 terugziet.
2. Surf in de webbrowser naar `http://<public ip>` (het publieke IP van je VPS).
3. Krijg je geen antwoord? Bekijk de [Veelgemaakte fouten](#veelgemaakte-fouten) hieronder.

:::warning[Firewall en poort 80]

Op de **Azure-VPS uit deze cursus staat poort 80 al open** - die heb je bij het [aanmaken van de VM](./azure-vps.md) zelf opengezet via de *inbound port rules* (SSH 22, HTTP 80, HTTPS 443). Deze waarschuwing geldt enkel als je een **andere provider** gebruikt.

Als je server dan niet bereikbaar is van buitenaf, staat poort **80** mogelijk dicht. Open hem in de firewall van je provider én lokaal:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 22/tcp      # sluit jezelf niet buiten!
```

Op een verse Ubuntu-server staat `ufw` vaak nog **uit**. Open dan éérst poort 22 (SSH) en activeer pas daarna de firewall met `sudo ufw enable` - anders sluit je je eigen SSH-verbinding af.

:::

## Oefening 6 - Deploy een volledige website met `scp`

Tot nu plaatste je één pagina die je zelf typte. In de praktijk krijg je vaak een **kant-en-klare website** (meerdere HTML-bestanden, CSS, afbeeldingen). Hieronder deploy je zo'n website: je downloadt ze als zip, kopieert ze met **`scp`** naar je VPS en pakt ze uit in de webroot.

Met **`scp`** (*secure copy*) kopieer je bestanden over **SSH**: `scp [opties] bron doel`, waarbij een pad op de server de vorm `gebruiker@<public ip>:/pad` heeft.

1. Download de website: **[statische-website.zip](pathname:///downloads/statische-website.zip)**. Onthoud in welke map op je **eigen computer** ze terechtkomt.
2. Kopieer de zip vanaf je eigen computer naar je VPS met `scp` (gebruik je private key, net als bij het inloggen). Plaats ze bijvoorbeeld in je home-map (`:~`).
3. Log in op je VPS en installeer indien nodig het hulpprogramma `unzip`.
4. Pak de zip met beheerdersrechten uit in de webroot `/var/www/html/`, zodat de bestanden de bestaande pagina vervangen. *(Tip: `unzip -o` overschrijft zonder te vragen.)*
5. Surf naar `http://<public ip>` en controleer dat de nieuwe website verschijnt. Klik door naar de pagina's **Menu** en **Contact** via de navigatie.

## Veelgemaakte fouten

Loopt er iets mis tijdens het inloggen of deployen? Onderstaande tabel helpt je de oorzaak snel te vinden.

| Symptoom | Mogelijke oorzaak | Wat te doen |
|----------|-------------------|-------------|
| `Connection refused` bij SSH | Verkeerd IP, server uit, poort 22 dicht | IP controleren, firewall poort 22 openen |
| `Permission denied (publickey)` | Verkeerde of ontbrekende SSH-sleutel | Juiste sleutel toevoegen bij provider |
| Pagina onbereikbaar in browser | Poort 80 dicht of webserver gestopt | `sudo systemctl status nginx`, firewall poort 80 |
| `403 Forbidden` | Rechten op bestand/map verkeerd | Eigenaarschap/rechten van `/var/www/html` nakijken |
| Oude pagina blijft tonen | Browsercache | Hard refresh (`Ctrl + F5`) of test met `curl` |
