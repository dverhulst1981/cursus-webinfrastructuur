---
title: "Een VPS opzetten op Microsoft Azure"
---

# Een VPS opzetten op Microsoft Azure

De stappen op [Virtual Private Server](./vps.md) zijn algemeen en gelden bij elke provider. Hieronder doorlopen we ze concreet op **Microsoft Azure**, de provider die we in deze cursus gebruiken (*OLR 04*).

:::note

De Azure-portal verandert af en toe van uiterlijk. De knoppen kunnen er net iets anders uitzien dan op de schermafbeeldingen, maar de stappen blijven dezelfde.

:::

## 1. Azure for Students - gratis krediet aanvragen

Als student krijg je via **Azure for Students** gratis krediet (ongeveer 100 USD) **zonder dat je een creditcard hoeft op te geven**. Daarmee kun je een VPS draaien zonder kosten, zolang je binnen het krediet en de gratis uren blijft.

Vraag je studentenabonnement aan via [azure.microsoft.com/free/students](https://azure.microsoft.com/free/students/) en meld je aan met je **school-e-mailadres**. Na de verificatie staat het krediet klaar op je account.

## 2. Inloggen op de Azure-portal

Log in op de [Azure-portal](https://portal.azure.com). Je ziet je abonnement **Azure for Students** terug bij je recente items. Zoek bovenaan naar **resource group** om de volgende stap te starten.

![Azure-portal: zoeken naar resource group, met Azure for Students zichtbaar](/img/stap%201.png)

## 3. Een resource group aanmaken

Een **resource group** is een logische container (in Azure) die alle resources van één project samen groepeert (de virtuele machine, het IP-adres, de schijf, de firewall …). Dat maakt het beheer eenvoudig: je kunt alles in één keer terugvinden en achteraf in één keer **verwijderen** - handig om kosten te beperken.

Open **Resource groups** en klik op **Create**.

![Overzicht van resource groups met de knop Create](/img/stap%202.png)

Kies je abonnement **Azure for Students**, geef de resource group een naam (bv. `VPS`) en kies een **regio** dicht bij je gebruikers. Klik op **Review + create** en daarna op **Create**.

![Formulier Create a resource group met naam VPS en abonnement Azure for Students](/img/stap%203.png)

De resource group verschijnt nu in het overzicht.

![De aangemaakte resource group VPS in de lijst](/img/stap%204.png)

## 4. Een virtual machine aanmaken via Free services

Zoek bovenaan naar **free services**. Op die pagina staan de diensten met een gratis tegoed.

![Azure-portal: zoeken naar free services](/img/stap%205.png)

Kies **Linux Virtual Machine** - die geeft je tot **750 gratis uren per maand** gedurende het eerste jaar. Klik op **Create**.

![Free services-pagina met Linux Virtual Machine en de knop Create](/img/stap%206.png)

## 5. De virtuele machine configureren

Vul op het tabblad **Basics** de belangrijkste velden in:

- **Resource group**: de zonet aangemaakte `VPS`.
- **Virtual machine name**: bv. `azure-vps`.
- **Image**: **Ubuntu Server 22.04 LTS** (een stabiele Linux-LTS, zoals eerder besproken).
- **Size**: **Standard_B2ats_v2** - die valt onder de gratis uren (*free services eligible*).
- **Authentication type**: **SSH public key** - veiliger dan een wachtwoord.
- **Username**: bv. `azureuser`.
- **SSH public key source**: **Generate new key pair** (Azure maakt het sleutelpaar voor je aan).
- **Inbound port rules**: open **SSH (22)**, **HTTP (80)** en **HTTPS (443)**.

![Tabblad Basics van Create a virtual machine met Ubuntu, grootte en SSH-instellingen](/img/stap%207.png)

## 6. Controleren en de private key downloaden

Klik op **Review + create**. Na een geslaagde validatie verschijnt een venster om het sleutelpaar te genereren. Klik op **Download private key and create resource**.

:::warning[Bewaar je private key goed]

Azure bewaart de **private key niet**. Je kunt hem maar **één keer** downloaden (een `.pem`-bestand). Bewaar hem veilig op je eigen computer - zonder die sleutel raak je niet meer ingelogd.

:::

![Review + create met het venster om de private key te downloaden](/img/stap%208.png)

## 7. De aangemaakte resources

Azure maakt nu niet alleen de virtuele machine aan, maar ook alles wat ze nodig heeft: een **public IP address**, een **network security group** (de firewall), een **virtual network**, een **network interface**, de **SSH key** en een **disk**. Ze zitten allemaal netjes in je resource group `VPS`.

![De resource group VPS met alle aangemaakte resources](/img/stap%209.png)

## 8. Het publieke IP-adres noteren

Open de virtuele machine. De status staat op **Running** en je ziet het **publieke IP-adres** (zoals in de algemene stap 4 op [Virtual Private Server](./vps.md)). Noteer dit adres - via dat IP bereik je je server. Klik op **Connect** om de verbindingsgegevens te zien.

![Overzicht van de virtuele machine met status Running en het publieke IP-adres](/img/stap%2010.png)

## 9. Verbinden via SSH

Het **Connect**-paneel toont het kant-en-klare commando. Vul het pad naar je gedownloade private key in en voer het uit in een terminal op je eigen computer:

```bash
ssh -i ~/.ssh/azure-vps_key.pem azureuser@<public ip>
```

![Het Connect-paneel met het SSH-commando](/img/stap%2011.png)

Meer uitleg over hoe het inloggen precies werkt (host key, `known_hosts`), vind je bij [SSH](./ssh.md). Daarna ben je klaar om als volgende stap [een statische webpagina te deployen](./statische-pagina.md) op je server.
