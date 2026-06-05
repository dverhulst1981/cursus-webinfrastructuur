---
title: "1. Netwerk fundamentals"
---

# Netwerk fundamentals

In dit hoofdstuk frissen we de **netwerkbasis** op en zetten we de eerste stap richting deployment. Wat je doet:

- het **TCP/IP-model** herhalen
- leren wat een **server** en de **cloud** zijn
- zelf een **cloud server (VPS)** opzetten
- veilig inloggen via **SSH**
- enkele **Linux-basiscommando's** opfrissen
- als eindopdracht een **statische webpagina deployen** (met `webfsd`, **Apache** of **nginx**)

Dit is het fundament voor de rest van de cursus: DNS ([hoofdstuk 2](../hoofdstuk-2-dns.md)) en HTTP(S) ([hoofdstuk 3](../hoofdstuk-3-http.md)-[4](../hoofdstuk-4-https.md)) bouwen rechtstreeks verder op wat je hier opzet.

## Leerdoelen

Na dit hoofdstuk kan je:

- **het TCP/IP-model** beschrijven en de rol van elke laag uitleggen (*OLR 04*, *OLR 12*)
- **uitleggen** wat een server is en hoe een client met een server communiceert (*OLR 04*)
- **de cloud** situeren en het verschil tussen IaaS, PaaS en SaaS benoemen, en een **VPS** binnen dat geheel plaatsen (*OLR 04*, *OLR 12*)
- **een cloud server (VPS)** aanmaken bij een cloudprovider en de basisconfiguratie uitvoeren (*OLR 04*)
- **via SSH** veilig inloggen op een Linux-server en uitleggen waarom sleutelauthenticatie te verkiezen is boven wachtwoorden (*OLR 04*, *OLR 13*)
- **Linux-basiscommando's** correct toepassen om te navigeren en bestanden te beheren (`pwd`, `ls`, `cd`, `cat`, `mkdir`, `nano`, …) (*OLR 04*)
- **een statische webpagina deployen** op de VPS met `webfsd`, Apache of nginx en de bereikbaarheid verifiëren (*OLR 03*, *OLR 04*, *OLR 07*)
- **de stappen documenteren** zodat de deployment herhaalbaar is (*OLR 06*)

:::info[OLR-koppeling]

Dit hoofdstuk koppelt aan meerdere leerdoelen:

- **OLR 04** - inloggen via SSH, een Linux-server klaarmaken en deployen via een VPS
- **OLR 13** - SSH veilig configureren
- **OLR 06** - een herhaalbare deployment documenteren
- **OLR 12** - soorten cloud-diensten afwegen

:::

## Samenvatting

- Netwerken werken in **lagen**. Het **TCP/IP-model (5 lagen)** bestaat uit applicatie, transport, netwerk, datalink en fysiek. **TCP** is betrouwbaar, **UDP** is snel.
- Een **server** beantwoordt verzoeken van **clients**. Een **webserver** levert pagina's via poort 80/443.
- De **cloud** is gehuurde infrastructuur. Een **VPS** (IaaS) geeft je volledige controle over een eigen virtuele server.
- Via **SSH** (poort 22) log je veilig in. **Sleutelauthenticatie** is veiliger dan een wachtwoord.
- Met enkele **Linux-basiscommando's** beheer je bestanden, en met `webfsd`, **nginx** of **Apache** deploy je je eerste **statische webpagina**.

## Oefeningen

> Documenteer elke stap die je zet (commando + verwacht resultaat) in een eigen tekstbestand. Zo bouw je een **herhaalbare procedure** op (*OLR 06*) en kan je later troubleshooten.

### Oefening 1 - TCP/IP in kaart

1. Teken (op papier of digitaal) het TCP/IP-model met de vijf lagen en plaats bij elke laag minstens één protocol (of, voor de fysieke laag, een voorbeeld van een medium).
2. Beschrijf in eigen woorden wat er met een HTTP-verzoek gebeurt op weg van browser naar webserver (encapsulatie).
3. Leg uit waarom SSH en HTTP op de **transportlaag** TCP gebruiken en niet UDP.

### Oefening 2 - Linux-basis opfrissen

Voer op een Linux-terminal (lokaal of op je VPS) uit:

1. Toon je huidige map met `pwd`.
2. Maak een map `oefening` aan en ga erin.
3. Maak met `nano` een bestand `notities.txt` met daarin drie commando's die je vandaag geleerd hebt. Sla op en sluit af.
4. Toon de inhoud met `cat`.
5. Lijst de map op met `ls -la` en verklaar wat je ziet.

### Oefening 3 - VPS en SSH

1. Maak een VPS aan met **Ubuntu LTS** bij een cloudprovider naar keuze.
2. Genereer (indien nodig) een SSH-sleutelpaar met `ssh-keygen` en voeg je publieke sleutel toe.
3. Log in met `ssh ... @JOUW-IP`.
4. Werk de pakketlijst bij met `sudo apt update`.
5. *(Uitdaging, OLR 13)* Schakel wachtwoordlogin uit en test dat sleutellogin nog werkt.

### Oefening 4 - Deploy een statische pagina

1. Kies één webserver: `webfsd`, **nginx** of **Apache**.
2. Installeer hem en plaats een eigen `index.html` met je naam als titel.
3. Open poort 80 in de firewall.
4. Verifieer de bereikbaarheid met `curl` én in je browser via `http://JOUW-IP`.
5. Schrijf een korte procedure (5-8 stappen) waarmee een klasgenoot dezelfde deployment kan reproduceren (*OLR 06*).

---

## Commandoreferentie

Naslagwerk bij dit hoofdstuk.

### Navigeren en bestanden

| Commando | Beschrijving |
|----------|--------------|
| `pwd` | Toon de huidige map |
| `ls` / `ls -l` / `ls -la` | Lijst inhoud (kort / lang / met verborgen) |
| `cd map` / `cd ..` | Ga naar map / één omhoog |
| `mkdir naam` | Maak een map |
| `touch bestand` | Maak een leeg bestand |
| `cat bestand` | Toon bestandsinhoud |
| `nano bestand` | Bewerk in editor (`Ctrl+O` opslaan, `Ctrl+X` afsluiten) |
| `cp bron doel` | Kopieer |
| `mv bron doel` | Verplaats / hernoem |
| `rm bestand` | Verwijder |

### Systeem en pakketten

| Commando | Beschrijving |
|----------|--------------|
| `sudo apt update` | Pakketlijst verversen |
| `sudo apt install pakket` | Software installeren |
| `sudo systemctl status dienst` | Status van een service |
| `sudo systemctl restart dienst` | Service herstarten |
| `sudo ufw allow 80/tcp` | Poort openen in firewall |

### SSH

| Commando | Beschrijving |
|----------|--------------|
| `ssh-keygen -t ed25519 -C "mail"` | SSH-sleutelpaar aanmaken |
| `ssh gebruiker@IP` | Inloggen op de server |
| `ssh-copy-id gebruiker@IP` | Publieke sleutel naar server kopiëren |

### Webserver

| Commando | Beschrijving |
|----------|--------------|
| `webfsd -p 80 -r MAP -f index.html` | Lichtgewicht server starten |
| `sudo apt install nginx` | nginx installeren |
| `sudo apt install apache2` | Apache installeren |
| `curl http://localhost` | Bereikbaarheid testen vanaf de server |
