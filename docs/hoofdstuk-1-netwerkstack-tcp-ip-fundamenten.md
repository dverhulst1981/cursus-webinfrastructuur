---
title: "1. Netwerk fundamentals"
---

# Netwerk fundamentals

In dit hoofdstuk frissen we de **netwerkbasis** op en zetten we de eerste stap richting deployment. Je herhaalt het **TCP/IP-model**, leert wat een **server** en de **cloud** precies zijn, en zet zelf een **cloud server (VPS)** op. Via **SSH** log je veilig in, je frist enkele **Linux-basiscommando's** op, en als eindopdracht **deploy** je een **statische webpagina** met een webserver naar keuze (`webfsd`, **Apache** of **nginx**).

Dit is het fundament voor de rest van de cursus: DNS ([hoofdstuk 2](./hoofdstuk-2-dns.md)) en HTTP(S) ([hoofdstuk 3](./hoofdstuk-3-http.md)-[4](./hoofdstuk-4-https.md)) bouwen rechtstreeks verder op wat je hier opzet.

## Leerdoelen

Na dit hoofdstuk kan je:

- **het TCP/IP-model** beschrijven en de rol van elke laag uitleggen (*OLR 04*, *OLR 12*);
- **uitleggen** wat een server is en hoe een client met een server communiceert (*OLR 04*);
- **de cloud** situeren en het verschil tussen IaaS, PaaS en SaaS benoemen; een **VPS** plaatsen binnen dat geheel (*OLR 04*, *OLR 12*);
- **een cloud server (VPS)** aanmaken bij een cloudprovider en de basisconfiguratie uitvoeren (*OLR 04*);
- **via SSH** veilig inloggen op een Linux-server en uitleggen waarom sleutelauthenticatie te verkiezen is boven wachtwoorden (*OLR 04*, *OLR 13*);
- **Linux-basiscommando's** correct toepassen om te navigeren en bestanden te beheren (`pwd`, `ls`, `cd`, `cat`, `mkdir`, `nano`, …) (*OLR 04*);
- **een statische webpagina deployen** op de VPS met `webfsd`, Apache of nginx en de bereikbaarheid verifiëren (*OLR 03*, *OLR 04*, *OLR 07*);
- **de stappen documenteren** zodat de deployment herhaalbaar is (*OLR 06*).

:::info[OLR-koppeling]

Dit hoofdstuk legt de basis voor *OLR 04* (inloggen via SSH en een webapplicatie draaibaar maken op een Linux-server, deployen via een VPS). Het veilig configureren van SSH sluit aan op *OLR 13*. Het documenteren van een herhaalbare deployment hoort bij *OLR 06*. De afweging tussen verschillende soorten cloud-diensten raakt *OLR 12*.

:::

## Theorie

### Het TCP/IP-model (herhaling)

Wanneer twee computers over een netwerk praten, gebeurt dat niet in één grote stap maar in **lagen**. Elke laag heeft een eigen verantwoordelijkheid en praat enkel met de laag erboven en eronder. Dit **gelaagde model** maakt netwerken beheersbaar: je kunt één laag aanpassen (bv. van wifi naar kabel) zonder de rest te herschrijven.

In deze cursus gebruiken we het **TCP/IP-model in vijf lagen**. Dit is een veelgebruikte onderwijsvariant die de onderste laag opsplitst in een **datalink-** en een **fysieke** laag - handig omdat MAC-adressering (datalink) en het effectieve signaal op de kabel (fysiek) duidelijk gescheiden worden. Het oudere **OSI-model** (zeven lagen) zie je vooral in theorie; de mapping staat in de laatste kolom.

| # | TCP/IP-laag (5) | Taak | Protocollen | Adressering (bron → bestemming) | Eenheid | OSI |
|---|-----------------|------|-------------|---------------------------------|---------|-----|
| 1 | **Fysiek** | Bits als signaal versturen (spanning, licht, radio) | kabel, glasvezel, radiogolven | - (geen adressering) | bits | 1 |
| 2 | **Datalink** | Fysieke adressering (MAC), frames over de link | Ethernet, wifi (802.11) | bron-**MAC** → bestemmings-**MAC** | frame | 2 |
| 3 | **Netwerk** | Logische adressering en routering tussen netwerken | **IP** (IPv4/IPv6), ICMP | bron-**IP** → bestemmings-**IP** | pakket | 3 |
| 4 | **Transport** | Betrouwbaarheid, poorten, segmentatie | **TCP**, **UDP** | bron**poort** → bestemmings**poort** | segment | 4 |
| 5 | **Applicatie** | Communicatie tussen programma's | HTTP, HTTPS, DNS, SSH, FTP | - | data / bericht | 5-7 |

Hieronder kort wat elke laag doet, van onder (de fysieke verbinding) naar boven (dichtst bij de gebruiker).

#### Fysieke laag (laag 1)

De onderste laag verstuurt de **bits** (enen en nullen) als een echt **signaal** over een fysiek medium. Hoe dat signaal eruitziet, hangt af van het medium:

- **koperkabel** (UTP, Ethernet) - als elektrische spanning;
- **glasvezel** - als lichtpulsen;
- **wifi** - als radiogolven door de lucht.

Hier horen ook de tastbare zaken thuis: kabels, connectoren en de netwerkkaart die het signaal verstuurt en ontvangt. De fysieke laag **begrijpt niet** wat de bits betekenen; ze zorgt enkel dat ze van het ene punt naar het andere geraken. Eigenschappen als **bandbreedte** (hoeveel bits per seconde) spelen op dit niveau.

#### Datalinklaag (laag 2)

Deze laag verzorgt het transport over **één lokale verbinding** (LAN), bijvoorbeeld alle toestellen op hetzelfde wifi-netwerk of dezelfde switch. Ze groepeert de bits in **frames** en gebruikt **MAC-adressen** om binnen dat lokale netwerk de juiste **netwerkkaart** aan te spreken.

- Een **MAC-adres** (bv. `00:1A:2B:3C:4D:5E`) is een uniek, in de netwerkkaart ingebakken hardware-adres. Het wordt **hexadecimaal** geschreven: 6 groepjes van 2 tekens (0-9 en A-F), samen 48 bits.
- Een **switch** werkt op deze laag: hij stuurt frames door naar de juiste poort op basis van het MAC-adres.

Belangrijk: de datalinklaag raakt **niet voorbij het lokale netwerk**. Om een ander netwerk te bereiken, is de netwerklaag nodig.

#### Netwerklaag (laag 3)

Terwijl de datalinklaag binnen één netwerk blijft, zorgt de netwerklaag dat data **over de grenzen van netwerken heen** raakt - dwars door het internet. Ze werkt met **IP-adressen** (logische adressen) en met **routering**.

- Een **IP-adres** (bv. `93.184.216.34` in IPv4, of een langer IPv6-adres) identificeert een **machine** waar ook ter wereld.
- **Routers** geven een **pakket** stap voor stap (hop per hop) door, telkens een stukje dichter bij de bestemming. Elke router kiest de volgende stap op basis van het bestemmings-IP.
- **DNS** vertaalt een leesbare domeinnaam (`example.com`) naar een IP-adres (zie [hoofdstuk 2](./hoofdstuk-2-dns.md)).

De netwerklaag biedt **geen garanties** dat alles aankomt - dat is net de taak van de transportlaag erboven. Samen bepalen **IP-adres + poort** aan beide kanten precies één verbinding.

#### Transportlaag (laag 4)

De netwerklaag eronder bezorgt data bij de juiste **machine**. De transportlaag gaat een stap verder: ze zorgt dat de data bij het juiste **programma** op die machine raakt, en - afhankelijk van het protocol - dat ze ook **volledig en correct** aankomt. Ze knipt grote data in kleinere **segmenten** en zet die aan de andere kant weer in de juiste volgorde.

**Waarom heb je een poort nodig?** Een **IP-adres** brengt data tot bij de juiste **machine**, maar daar draaien meestal **meerdere programma's tegelijk**: bijvoorbeeld een webserver, een SSH-dienst en een database op één en dezelfde server. Met alleen een IP-adres zou het besturingssysteem niet weten **welk** van die programma's een binnenkomend segment moet krijgen. De **poort** lost dat op: ze is het "huisnummer" binnen de machine waarmee je een specifiek programma aanspreekt.

> Vergelijking: het **IP-adres** is het adres van het *gebouw*, de **poort** is het *bureau- of busnummer* binnen dat gebouw. Zonder busnummer weet de postbode niet bij wie de brief moet.

Een **poortnummer** (16 bits, 0-65535) zegt dus voor welk programma een segment bedoeld is. Bij een verbinding spelen er altijd twee poorten mee:

- de **bestemmingspoort** = de dienst die je aanspreekt. Die ligt vast per protocol (een *well-known port*, bv. 443 voor HTTPS);
- de **bronpoort** = een willekeurig, tijdelijk nummer dat jouw toestel kiest (een *ephemeral port*, bv. 54123). Zo weet de server naar welke poort hij zijn antwoord moet terugsturen.

| Poort | Dienst |
|-------|--------|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 53 | DNS |

Een webserver luistert dus standaard op **poort 80** (HTTP) of **443** (HTTPS); via **poort 22** (SSH) log je in op de server.

**Twee protocollen: TCP en UDP.** Het grote verschil is *betrouwbaarheid versus snelheid*.

| | **TCP** | **UDP** |
|--|---------|---------|
| Verbinding | verbindingsgericht (eerst opzetten) | verbindingsloos (direct versturen) |
| Garanties | volledig, in volgorde, foutcontrole | geen - segmenten kunnen verdwijnen of door elkaar komen |
| Snelheid | iets trager (overhead) | sneller, weinig overhead |
| Typisch voor | HTTP(S), SSH, e-mail | streaming, gaming, DNS-queries, VoIP |

- **TCP** (*Transmission Control Protocol*) is **betrouwbaar**. Voor elk segment verwacht de zender een **bevestiging** (*ACK*); blijft die uit, dan wordt het segment **opnieuw verstuurd**. Verkeerd aangekomen segmenten worden via een volgnummer weer **op volgorde** gezet. Een TCP-verbinding wordt eerst opgezet met een **three-way handshake**: de client stuurt `SYN`, de server antwoordt met `SYN-ACK`, de client bevestigt met `ACK`. Pas daarna begint de eigenlijke datastroom.
- **UDP** (*User Datagram Protocol*) is **snel** maar zonder garanties: er is geen handshake en geen hertransmissie. Dat is prima wanneer een verloren stukje niet erg is en snelheid primeert (bij live video is een gemiste frame minder erg dan vertraging).

In deze cursus werk je vooral met **TCP**: zowel het opvragen van een webpagina (HTTP/HTTPS) als het inloggen via SSH gebeurt erover, omdat je daar élk byte correct wil ontvangen.

#### Applicatielaag (laag 5)

De laag waar **programma's** met elkaar communiceren. Hier leeft het eigenlijke bericht - bijvoorbeeld een **HTTP-verzoek** van je browser. Typische protocollen: **HTTP(S)**, **DNS**, **SSH**, **FTP** en e-mailprotocollen. Deze laag bepaalt het *formaat* van de data, niet hoe ze fysiek op de bestemming raakt.

#### Encapsulatie en decapsulatie

Bij het versturen voegt elke laag van boven naar beneden zijn eigen **header** toe (je HTTP-bericht wordt verpakt in een TCP-segment, dat in een IP-pakket, dat in een frame, dat als bits over de fysieke link gaat); dit heet **encapsulatie**. Aan de ontvangerkant wordt elke laag van onder naar boven weer **uitgepakt** (**decapsulatie**). Zo komt je oorspronkelijke verzoek bovenaan terug uit.

Belangrijk: elke laag voegt zowel een **bron-** als een **bestemmingsadres** toe - telkens op zijn eigen niveau (zie de kolom *Adressering* in de tabel hierboven). Zo weet de ontvanger niet alleen wáár het naartoe moet, maar ook waarnaar het antwoord teruggestuurd kan worden:

- **Transport** - bronpoort (bv. 54123) → bestemmingspoort (bv. 443): identificeert het **programma / de dienst**.
- **Netwerk** - bron-IP (jouw toestel) → bestemmings-IP (de server): identificeert de **machine** (logisch adres).
- **Datalink** - bron-MAC → bestemmings-MAC: identificeert de **netwerkkaart** (fysiek adres).
- **Fysiek** - géén adressering; enkel de **bits** als signaal op de kabel of in de lucht.

#### Encapsulatie: header toevoegen (verzender)

De "Bericht" (rechts, groen) blijft ongewijzigd; elke laag **plakt er links een eigen header-blok bij**, telkens met een **bron- en bestemmingsadres** op zijn niveau. Zo groeit de data-eenheid van **bericht → segment → packet → frame → bits**:

<div class="enc">
  <div class="enc-layer">
    <div class="enc-title">5 · Applicatie - Bericht</div>
    <div class="enc-row">
      <span class="enc-block enc-msg">Bericht: "download webpagina van 192.168.1.102"</span>
    </div>
  </div>
  <div class="enc-arrow">↓ <span>voeg poort-header toe</span></div>
  <div class="enc-layer">
    <div class="enc-title">4 · Transport - Segment</div>
    <div class="enc-row">
      <span class="enc-block enc-port">Bronpoort = 31244 · Bestemmingspoort = 80</span>
      <span class="enc-block enc-msg">Bericht</span>
    </div>
  </div>
  <div class="enc-arrow">↓ <span>voeg IP-header toe</span></div>
  <div class="enc-layer">
    <div class="enc-title">3 · Netwerk - Packet</div>
    <div class="enc-row">
      <span class="enc-block enc-ip">Bron-IP = 192.168.1.101 · Bestemmings-IP = 192.168.1.102</span>
      <span class="enc-block enc-port">Poorten</span>
      <span class="enc-block enc-msg">Bericht</span>
    </div>
  </div>
  <div class="enc-arrow">↓ <span>voeg MAC-header toe</span></div>
  <div class="enc-layer">
    <div class="enc-title">2 · Datalink - Frame</div>
    <div class="enc-row">
      <span class="enc-block enc-mac">Bron-MAC = 00:12:F1:1E:E8:93 · Bestemmings-MAC = 00:04:A3:4D:1C:73</span>
      <span class="enc-block enc-ip">IP-adressen</span>
      <span class="enc-block enc-port">Poorten</span>
      <span class="enc-block enc-msg">Bericht</span>
    </div>
  </div>
  <div class="enc-arrow">↓ <span>zet om in bits</span></div>
  <div class="enc-layer">
    <div class="enc-title">1 · Fysiek - Bits</div>
    <div class="enc-row">
      <span class="enc-block enc-bits">0101 1010 0110 … (signaal op de link)</span>
    </div>
  </div>
</div>

#### Decapsulatie: header verwijderen (ontvanger)

De webserver doet exact het omgekeerde: elke laag **leest zijn eigen header-blok uit en verwijdert het**, tot enkel de oorspronkelijke "Bericht" overblijft:

<div class="enc">
  <div class="enc-layer">
    <div class="enc-title">1 · Fysiek - Bits ontvangen</div>
    <div class="enc-row">
      <span class="enc-block enc-bits">0101 1010 0110 … (signaal van de link)</span>
    </div>
  </div>
  <div class="enc-arrow">↓ <span>bits → frame</span></div>
  <div class="enc-layer">
    <div class="enc-title">2 · Datalink - Frame ontvangen</div>
    <div class="enc-row">
      <span class="enc-block enc-mac">lees + verwijder bron/bestemmings-MAC</span>
      <span class="enc-block enc-ip">IP-adressen</span>
      <span class="enc-block enc-port">Poorten</span>
      <span class="enc-block enc-msg">Bericht</span>
    </div>
  </div>
  <div class="enc-arrow">↓ <span>MAC-header verwijderd</span></div>
  <div class="enc-layer">
    <div class="enc-title">3 · Netwerk - Packet</div>
    <div class="enc-row">
      <span class="enc-block enc-ip">lees + verwijder bron/bestemmings-IP</span>
      <span class="enc-block enc-port">Poorten</span>
      <span class="enc-block enc-msg">Bericht</span>
    </div>
  </div>
  <div class="enc-arrow">↓ <span>IP-header verwijderd</span></div>
  <div class="enc-layer">
    <div class="enc-title">4 · Transport - Segment</div>
    <div class="enc-row">
      <span class="enc-block enc-port">lees + verwijder bron/bestemmingspoort</span>
      <span class="enc-block enc-msg">Bericht</span>
    </div>
  </div>
  <div class="enc-arrow">↓ <span>poort-header verwijderd</span></div>
  <div class="enc-layer">
    <div class="enc-title">5 · Applicatie</div>
    <div class="enc-row">
      <span class="enc-block enc-msg">Bericht - afgeleverd aan de webserver</span>
    </div>
  </div>
</div>

:::info[MAC-adres = datalink, niet de fysieke laag]

Een **MAC-adres** (*Media Access Control*, bv. `a4:5e:60:1f:23:8b`) is een **fysiek vastliggend adres** in de netwerkkaart, maar het werkt op de **datalink-laag (laag 2)** - *niet* op de **fysieke laag (laag 1)**. Net daarom gebruiken we het 5-lagenmodel: zo staan deze twee rollen apart.

- De **datalink-laag** bouwt **frames** en gebruikt **MAC-adressen** om de juiste netwerkkaart op het lokale netwerk aan te spreken.
- De **fysieke laag** kent géén adressen: ze zet de bits enkel om in een **signaal** (spanning, licht, radio) over de kabel of de lucht.

**IP vs MAC:** het **IP-adres** (netwerklaag) is een **logisch** adres dat onderweg blijft tot bij de eindbestemming (gebruikt voor **routering** tussen netwerken). Het **MAC-adres** (datalink) is **lokaal**: bij elke router-hop wordt het bron- en bestemmings-MAC **vervangen** door dat van de volgende schakel, terwijl de IP-adressen hetzelfde blijven.

:::

### Wat is een server?

Een **server** is een computer (of programma) die **diensten aanbiedt** aan andere computers, de **clients**. De client stuurt een **verzoek** (request), de server stuurt een **antwoord** (response). Dit heet het **client-servermodel**.

```mermaid
flowchart LR
  Client["Client<br/>(browser, app)"] -->|"request"| Server["Server<br/>(webserver)"]
  Server -->|"response"| Client
```

Het woord "server" heeft twee betekenissen:

- **Hardware** - de fysieke (of virtuele) machine die altijd aanstaat en bereikbaar is.
- **Software** - het programma dat op die machine draait en verzoeken beantwoordt (bv. **nginx** of **Apache** als webserver).

Veelvoorkomende soorten servers:

| Type server | Rol | Voorbeeld-software |
|-------------|-----|--------------------|
| **Webserver** | Levert webpagina's via HTTP(S) | nginx, Apache, Caddy |
| **Databaseserver** | Slaat data op en bevraagt ze | PostgreSQL, MySQL |
| **DNS-server** | Vertaalt domeinnamen naar IP | BIND, dnsmasq |
| **Mailserver** | Verstuurt en ontvangt e-mail | Postfix, Dovecot |

Een server verschilt van een gewone pc vooral in **gebruik**: hij is bedoeld om **continu** beschikbaar te zijn, vaak zonder beeldscherm, en je beheert hem op afstand via **SSH**.

### Wat is de cloud?

De **cloud** is in essentie: **de servers van iemand anders**, die je over het internet huurt en betaalt naar gebruik. In plaats van zelf hardware te kopen en in een serverruimte te plaatsen, gebruik je de infrastructuur van een **cloudprovider** (AWS, Microsoft Azure, Google Cloud, DigitalOcean, Hetzner, …).

Cloud-diensten worden meestal ingedeeld in drie niveaus, naargelang **hoeveel** de provider voor jou beheert:

| Model | Jij beheert | Provider beheert | Voorbeeld |
|-------|-------------|------------------|-----------|
| **IaaS** (*Infrastructure as a Service*) | OS, software, applicatie | Hardware, netwerk, virtualisatie | **VPS**, AWS EC2 |
| **PaaS** (*Platform as a Service*) | Enkel je applicatiecode | OS, runtime, schaalbaarheid | Heroku, Vercel |
| **SaaS** (*Software as a Service*) | Niets (je gebruikt enkel) | Alles | Gmail, Microsoft 365 |

```mermaid
flowchart LR
  IaaS["IaaS<br/>meer controle"] --> PaaS["PaaS"] --> SaaS["SaaS<br/>meer gemak"]
```

In deze cursus werken we met **IaaS** in de vorm van een **VPS** (*Virtual Private Server*): een **virtuele machine** die je volledig zelf beheert. Je hebt root-toegang, kiest het besturingssysteem en installeert wat je wilt. Dat is ideaal om te leren hoe deployment écht werkt.

:::tip[Afweging - OLR 12]

Een VPS geeft je **maximale controle** maar ook **maximale verantwoordelijkheid** (updates, beveiliging, back-ups). PaaS-platformen nemen veel werk uit handen, maar geven minder vrijheid en zijn vaak duurder bij schaal. Welke aanpak past, hangt af van je tech-stack, budget en team. We komen hierop terug bij de vergelijking van deployment-methodes.

:::

### Een cloud server (VPS) opzetten

De concrete stappen verschillen lichtjes per provider, maar het **patroon** is overal hetzelfde:

1. **Account aanmaken** bij een cloudprovider (bv. DigitalOcean, Hetzner Cloud, Azure). Voor de cursus kies je een goedkope instance (vaak een "droplet", "cloud server" of "VM" genoemd).
2. **Een instance aanmaken**:
   - **Besturingssysteem** - kies **Ubuntu Server** (een recente LTS-versie, bv. 24.04). LTS = *Long Term Support*, dus lang ondersteund en stabiel.
   - **Grootte** - voor een statische pagina volstaat de kleinste optie (1 vCPU, 1 GB RAM).
   - **Regio** - kies een datacenter dicht bij je gebruikers (bv. Frankfurt of Amsterdam voor België).
3. **Authenticatie instellen** - voeg je **publieke SSH-sleutel** toe (zie de sectie hieronder). Dit is veiliger dan een wachtwoord.
4. **IP-adres noteren** - na het aanmaken krijgt je server een **publiek IPv4-adres** (bv. `203.0.113.10`). Via dat adres bereik je de server.

```mermaid
flowchart LR
  A["1. Account"] --> B["2. Instance<br/>(Ubuntu LTS)"]
  B --> C["3. SSH-sleutel"]
  C --> D["4. Publiek IP"]
  D --> E["SSH-login"]
```

:::warning[Kosten en beveiliging]

Een VPS kost geld zolang hij bestaat - ook als je hem niet gebruikt. **Verwijder** je instance na de oefening of pauzeer hem als je provider dat toelaat. Zet bovendien meteen een **firewall** op (enkel poort 22, 80 en 443 open) en gebruik **sleutelauthenticatie** (*OLR 13*).

:::

### SSH: veilig inloggen op je server

**SSH** (*Secure Shell*) is het protocol om **versleuteld** in te loggen op een server op afstand en daar commando's uit te voeren. Het draait standaard op **poort 22**. Alles wat je typt en wat de server terugstuurt, is versleuteld - niemand op het netwerk kan meelezen.

Inloggen kan op twee manieren:

- **Met wachtwoord** - eenvoudig, maar kwetsbaar voor brute-force-aanvallen.
- **Met een SSH-sleutelpaar** - een **publieke** sleutel (op de server) en een **private** sleutel (op jouw computer, geheim). Veel veiliger en de aanbevolen methode.

```mermaid
flowchart LR
  subgraph laptop["Jouw computer"]
    Priv["Private sleutel<br/>(geheim houden!)"]
  end
  subgraph vps["VPS"]
    Pub["Publieke sleutel"]
  end
  Priv -.->|"bewijst identiteit"| Pub
```

Een sleutelpaar maak je éénmalig aan op je eigen computer:

```bash
ssh-keygen -t ed25519 -C "jouw.naam@school.be"
```

Dit maakt twee bestanden aan: `~/.ssh/id_ed25519` (private - **nooit delen**) en `~/.ssh/id_ed25519.pub` (publiek - deze geef je aan de provider). Daarna log je in:

```bash
ssh root@203.0.113.10
```

Bij de eerste verbinding vraagt SSH of je de server vertrouwt (de *host key fingerprint*). Bevestig met `yes`. Daarna zit je in de **shell** van de server.

:::warning[Beveiliging - OLR 13]

Schakel **wachtwoordlogin uit** zodra sleutelauthenticatie werkt (`PasswordAuthentication no` in `/etc/ssh/sshd_config`). Log in productie niet rechtstreeks in als `root`, maar maak een aparte gebruiker met `sudo`-rechten. Onversleutelde toegang (zoals het oude Telnet) is in een productieomgeving onaanvaardbaar.

:::

### Linux-basiscommando's (herhaling)

Op de VPS werk je in een **terminal** zonder grafische interface. Een korte opfrissing van de commando's die je nodig hebt. Het bestandssysteem is een **boom** die begint bij de root `/`; je "huidige map" is je werkmap.

#### Navigeren

| Commando | Betekenis |
|----------|-----------|
| `pwd` | *print working directory* - toon de huidige map |
| `ls` | *list* - toon de inhoud van de map |
| `ls -l` | uitgebreide lijst (rechten, grootte, datum) |
| `ls -la` | inclusief verborgen bestanden (beginnen met `.`) |
| `cd map` | *change directory* - ga naar een map |
| `cd ..` | ga één map omhoog |

#### Bestanden en mappen beheren

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

#### Systeem en pakketten

Op Ubuntu installeer je software met **`apt`**. Veel beheertaken vereisen **`sudo`** (*superuser do*, tijdelijke beheerdersrechten):

```bash
sudo apt update            # pakketlijst verversen
sudo apt install nginx     # software installeren
```

### Een statische webpagina deployen

Een **statische webpagina** is een vast bestand (HTML, CSS, afbeeldingen) dat de server ongewijzigd terugstuurt - geen databank of servercode nodig. Dat maakt het de ideale eerste deployment. Je hebt drie eenvoudige opties; kies er één.

```mermaid
flowchart LR
  HTML["index.html"] --> WS["Webserver<br/>(webfsd / Apache / nginx)"]
  WS -->|"poort 80"| Browser["Browser<br/>http://JOUW-IP"]
```

#### Optie A - `webfsd` (lichtgewicht, snel testen)

`webfsd` is een minimale webserver, ideaal om snel iets te tonen:

```bash
sudo apt update
sudo apt install webfs                 # levert het commando 'webfsd'
mkdir ~/site
echo "<h1>Hallo vanaf mijn VPS</h1>" > ~/site/index.html
webfsd -p 80 -r ~/site -f index.html   # -p poort, -r root-map, -f standaardbestand
```

Open in je browser `http://JOUW-IP`. Stop de server met `Ctrl + C`.

#### Optie B - nginx

**nginx** is een veelgebruikte productie-webserver. Na installatie draait hij meteen en serveert hij bestanden uit `/var/www/html`:

```bash
sudo apt update
sudo apt install nginx
# Vervang de standaardpagina:
sudo nano /var/www/html/index.html
```

Typ je eigen HTML, sla op (`Ctrl + O`, Enter) en sluit af (`Ctrl + X`). nginx draait als **service**:

```bash
sudo systemctl status nginx     # draait hij?
sudo systemctl restart nginx    # herstart na configuratiewijziging
```

#### Optie C - Apache

**Apache** (`apache2` op Ubuntu) werkt volgens hetzelfde principe; ook hier staat de webroot in `/var/www/html`:

```bash
sudo apt update
sudo apt install apache2
sudo nano /var/www/html/index.html
sudo systemctl restart apache2
```

#### Verifiëren

Controleer of je pagina bereikbaar is - dit hoort bij *OLR 07*:

```bash
curl http://localhost          # vanaf de server zelf
curl http://JOUW-IP            # of open het IP in je browser
```

Krijg je geen antwoord? Doorloop de troubleshooting hieronder.

:::warning[Firewall en poort 80]

Als je server niet bereikbaar is van buitenaf, staat poort **80** mogelijk dicht. Open hem in de firewall van je provider én lokaal:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 22/tcp      # sluit jezelf niet buiten!
```

Op een verse Ubuntu-server staat `ufw` vaak nog **uit**. Open dan éérst poort 22 (SSH) en activeer pas daarna de firewall met `sudo ufw enable` - anders sluit je je eigen SSH-verbinding af.

:::

### Veelgemaakte fouten (troubleshooting)

| Symptoom | Mogelijke oorzaak | Wat te doen |
|----------|-------------------|-------------|
| `Connection refused` bij SSH | Verkeerd IP, server uit, poort 22 dicht | IP controleren; firewall poort 22 openen |
| `Permission denied (publickey)` | Verkeerde of ontbrekende SSH-sleutel | Juiste sleutel toevoegen bij provider |
| Pagina onbereikbaar in browser | Poort 80 dicht of webserver gestopt | `sudo systemctl status nginx`; firewall poort 80 |
| `403 Forbidden` | Rechten op bestand/map verkeerd | Eigenaarschap/rechten van `/var/www/html` nakijken |
| Oude pagina blijft tonen | Browsercache | Hard refresh (`Ctrl + F5`) of test met `curl` |

### Samenvatting

- Netwerken werken in **lagen**; het **TCP/IP-model (5 lagen)** bestaat uit applicatie, transport, netwerk, datalink en fysiek. **TCP** is betrouwbaar, **UDP** is snel.
- Een **server** beantwoordt verzoeken van **clients**; een **webserver** levert pagina's via poort 80/443.
- De **cloud** is gehuurde infrastructuur; een **VPS** (IaaS) geeft je volledige controle over een eigen virtuele server.
- Via **SSH** (poort 22) log je veilig in; **sleutelauthenticatie** is veiliger dan een wachtwoord.
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
