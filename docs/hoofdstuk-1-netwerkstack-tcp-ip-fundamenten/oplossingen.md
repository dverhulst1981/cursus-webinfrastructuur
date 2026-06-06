---
title: "Oplossingen"
---

# Oplossingen

Hieronder staan de uitgewerkte oplossingen van de oefeningen uit dit hoofdstuk. Probeer ze eerst **zelf** op te lossen voor je hier kijkt.

## Oplossingen Linux-commando's

De uitgewerkte oplossingen van de [Oefeningen: Linux-basiscommando's](./linux-oefeningen.md).

### Oefening 1 - Verken het bestandssysteem

```bash
pwd                 # 1. huidige map
cd /                # 2. naar de root
ls                  #    inhoud tonen
cd /var             # 3. naar /var
ls -l               #    gedetailleerde lijst
cd ~                # 4. terug naar home
ls -la ~            # 5. inclusief verborgen bestanden
```

### Oefening 2 - Bouw je webpagina

```bash
cd ~
mkdir mijnsite      # 1. map aanmaken
cd mijnsite
nano index.html     # 2. open de editor en typ de HTML
cat index.html      # 3. inhoud controleren
```

### Oefening 3 - Installeer een webserver

```bash
sudo apt update            # 1. pakketlijst verversen
sudo apt install nginx     # 2. webserver installeren
systemctl status nginx     # 3. is de service actief? (afsluiten met q)
```

### Oefening 4 - Verken de webroot

```bash
cd /var/www/html               # 1. naar de webroot
ls -l                          #    gedetailleerde lijst
cat index.nginx-debian.html    # 2. de standaardpagina van nginx
cd ~                           # 3. terug naar home
```

### Oefening 5 - Zet je pagina online

```bash
sudo cp ~/mijnsite/index.html /var/www/html/   # 1. pagina kopiëren
sudo chmod 644 /var/www/html/index.html        # 2. rw-r--r--
ls -l /var/www/html                            # 3. controleren
```

Bij stap 2: `6` = lezen + schrijven voor de eigenaar, `4` = lezen voor de groep, `4` = lezen voor de overige gebruikers.
