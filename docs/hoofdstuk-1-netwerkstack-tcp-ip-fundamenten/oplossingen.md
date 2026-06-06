---
title: "Oplossingen oefeningen"
---

# Oplossingen oefeningen

Hieronder staan de uitgewerkte oplossingen van de oefeningen uit dit hoofdstuk. Probeer ze eerst **zelf** op te lossen voor je hier kijkt.

## Oplossingen Linux-basiscommando's

De uitgewerkte oplossingen van de [Oefeningen: Linux-basiscommando's](./linux-oefeningen.md).

### Oefening 1 - Navigatie en verkenning

```bash
pwd                 # 1. huidige map
cd /                # 2. naar de root
ls                  #    inhoud tonen
cd /etc             # 3. naar /etc
ls -l               #    gedetailleerde lijst
cd ~                # 4. terug naar home (cd zonder argument werkt ook)
ls -la              # 5. inclusief verborgen bestanden
cd -                # 6. terug naar de vorige map (/etc)
cd -                #    en weer terug naar home
```

Bij stap 7: het **absolute** pad van je home-map is `/home/<gebruiker>` (bv. `/home/jefke`). Vanuit `/etc` is een **relatief** pad daarnaartoe `../home/jefke`: `..` brengt je van `/etc` naar de root `/`, en van daar daal je af naar `home/jefke`.

### Oefening 2 - Bestanden en mappen beheren

```bash
cd ~
mkdir -p project/src                            # 1. hele structuur in één keer
touch project/README.md                         # 2. leeg bestand
touch project/src/app.js project/src/helper.js  # 3. twee bestanden tegelijk
cp project/README.md project/LEESMIJ.md         # 4. kopiëren
mv project/src/helper.js project/src/utils.js   # 5. hernoemen
cp -r project project-backup                    # 6. map recursief kopiëren
rm project/LEESMIJ.md                           # 7. bestand verwijderen
ls -lR project                                  # 8. volledige inhoud controleren
```

`ls -lR` toont de map en al haar submappen (recursief) als gedetailleerde lijst.

### Oefening 3 - Rechten met `chmod` en `chown`

```bash
cd ~
echo 'echo "Hallo"' > script.sh   # 1. bestand met één regel aanmaken
ls -l script.sh                   # 2. huidige rechten bekijken
chmod 755 script.sh               # 3. rwxr-xr-x (eigenaar 7, groep/overige 5)
ls -l script.sh
chmod 644 script.sh               # 4. rw-r--r-- (eigenaar 6, groep/overige 4)
ls -l script.sh
chmod u+x,g-w script.sh           # 5. eigenaar +x, groep -w (lettervorm)
ls -l script.sh
```

Uitdaging (stap 6) - de groep en eigenaar wijzigen vereist `sudo`:

```bash
sudo chown :root script.sh        # groep -> root
ls -l script.sh
sudo chown $USER script.sh        # eigenaar terug naar jezelf ($USER = je login)
ls -l script.sh
```

### Oefening 4 - Tekst filteren met `grep`, `sort` en pipes

```bash
echo "INFO  start" > log.txt           # 1. eerste regel (> overschrijft)
echo "ERROR  schijf vol" >> log.txt    #    overige regels toevoegen (>>)
echo "info  herstart" >> log.txt
echo "WARNING  trage respons" >> log.txt
echo "ERROR  netwerk weg" >> log.txt
echo "INFO  klaar" >> log.txt
cat -n log.txt                         # 2. genummerde regels
grep "ERROR" log.txt                   # 3. enkel de ERROR-regels
grep -i "info" log.txt                 # 4. INFO én info (hoofdletterongevoelig)
grep -v "INFO" log.txt                 # 5. alles behalve de INFO-regels
wc -l log.txt                          # 6. aantal regels tellen
cat log.txt | sort > gesorteerd.txt    # 7. pipe + redirection naar bestand
cut -d " " -f 1 log.txt | sort | uniq -c   # 8. eerste woord tellen
```

Bij stap 8 haalt `cut -d " " -f 1` het eerste veld (vóór de eerste spatie) uit elke regel, `sort` zet gelijke woorden bij elkaar, en `uniq -c` telt hoe vaak elk woord voorkomt.

### Oefening 5 - Processen en gebruikers

```bash
whoami            # 1. als welke gebruiker ben je ingelogd?
id                # 2. user-id, group-id en groepen
sleep 300 &       # 3. wacht 300 s in de achtergrond (& maakt de shell vrij)
jobs              # 4. taken in deze shell
pgrep sleep       # 5. PID opzoeken (of: ps aux | grep sleep)
kill <PID>        # 6. stoppen met de PID uit stap 5
jobs              #    controleren dat de taak weg is
pstree -p         # 7. processen als boom, met PID
```

Vervang `<PID>` door het getal dat `pgrep sleep` teruggaf. Werkt het proces niet mee, dan forceer je het met `kill -9 <PID>`.

## Oplossingen: statische webpagina deployen

De uitgewerkte oplossingen van de oefeningen op [Oefeningen: een statische webpagina deployen](./statische-pagina-oefeningen.md). De oefeningen gebruiken **nginx** als voorbeeld.

### Oefening 1 - Log in op je VPS

```bash
ssh gebruiker@<public ip>   # 1. inloggen met je gebruiker en het publieke IP van de VPS
whoami                      # 2. toont je gebruiker op de server
pwd                         #    /home/<gebruiker> - je staat in je home-map
```

Vervang `gebruiker` en `<public ip>` door je eigen gegevens. De eerste keer vraagt SSH of je de host key vertrouwt; bevestig met `yes` (zie [SSH](./ssh.md)).

### Oefening 2 - Bouw je webpagina

```bash
cd ~
mkdir mijnsite      # 1. map aanmaken
cd mijnsite
nano index.html     # 2. open de editor en typ de HTML
cat index.html      # 3. inhoud controleren
```

### Oefening 3 - Installeer nginx

```bash
sudo apt update            # 1. pakketlijst verversen
sudo apt install nginx     # 2. webserver installeren
systemctl status nginx     # 3. is de service actief? (afsluiten met q)
```

### Oefening 4 - Zet je pagina online

```bash
sudo cp ~/mijnsite/index.html /var/www/html/   # 1. pagina naar de webroot kopiëren
sudo chmod 644 /var/www/html/index.html        # 2. rw-r--r--
ls -l /var/www/html                            # 3. controleren
```

Bij stap 2: `6` = lezen + schrijven voor de eigenaar, `4` = lezen voor de groep, `4` = lezen voor de overige gebruikers.

### Oefening 5 - Verifieer dat je pagina online staat

```bash
curl http://localhost      # 1. vanaf de server zelf - toont je eigen HTML
# 2. open http://<public ip> in de browser (of http://localhost bij een lokale test)
```

Krijg je geen antwoord, dan staat poort **80** mogelijk dicht. Open hem met `sudo ufw allow 80/tcp` en bekijk zo nodig de [Veelgemaakte fouten](./statische-pagina-oefeningen.md#veelgemaakte-fouten).

### Oefening 6 - Deploy een volledige website met `scp`

Stap 1 doe je in de browser: download `statische-website.zip` van de cursussite. De stappen 2-4 hieronder voer je uit op je **eigen computer** (de `scp`-regel) en daarna op de **VPS**.

```bash
# 2. op je EIGEN computer, in de map waar de zip staat:
scp -i ~/.ssh/azure-vps_key.pem statische-website.zip azureuser@<public ip>:~

# log daarna in op de VPS:
ssh -i ~/.ssh/azure-vps_key.pem azureuser@<public ip>

# 3. op de VPS - unzip installeren indien nodig:
sudo apt update
sudo apt install unzip

# 4. uitpakken in de webroot (overschrijft de bestaande pagina):
sudo unzip -o ~/statische-website.zip -d /var/www/html/
```

`scp gebruiker@<public ip>:~` plaatst de zip in de home-map op de server. Met `-i` wijs je dezelfde private key aan als bij het inloggen. `unzip -o` pakt uit en overschrijft zonder vragen; `-d` kiest de doelmap.

Stap 5: surf naar `http://<public ip>`. Je ziet nu de homepagina van het *Webinfra Café*; via de navigatie bereik je ook **Menu** en **Contact**.

:::tip[403 Forbidden of bestanden niet zichtbaar?]

De uitgepakte bestanden zijn van `root`. nginx (de gebruiker `www-data`) moet ze kunnen lezen; standaard is dat in orde. Klopt het toch niet, geef de webroot dan leesrechten: `sudo chmod -R a+r /var/www/html`.

:::
