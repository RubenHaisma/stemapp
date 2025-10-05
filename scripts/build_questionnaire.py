import json
import re
from pathlib import Path

parties = [
    {
        "abbreviation": "VVD",
        "name": "Volkspartij voor Vrijheid en Democratie",
        "description": "Liberale centrumrechtse partij gericht op economie, veiligheid en individuele kansen.",
        "color": "#FF6600",
        "website": "https://www.vvd.nl",
        "leader": "Dilan Yesilgoz",
        "seats_2023": 24,
    },
    {
        "abbreviation": "GL-PvdA",
        "name": "GroenLinks-PvdA",
        "description": "Progressieve samenwerking van GroenLinks en PvdA met focus op klimaat en bestaanszekerheid.",
        "color": "#65B32E",
        "website": "https://groenlinks-pvda.nl",
        "leader": "Frans Timmermans",
        "seats_2023": 25,
    },
    {
        "abbreviation": "NSC",
        "name": "Nieuw Sociaal Contract",
        "description": "Sociaal-conservatieve partij rond bestuurlijke vernieuwing en bestaanszekerheid.",
        "color": "#1E6F5C",
        "website": "https://www.nieuwsociaalcontract.nl",
        "leader": "Pieter Omtzigt",
        "seats_2023": 20,
    },
    {
        "abbreviation": "BBB",
        "name": "BoerBurgerBeweging",
        "description": "Plattelandspartij gericht op voedselproductie, regionale zeggenschap en boerenbelangen.",
        "color": "#4CAF50",
        "website": "https://www.boerburgerbeweging.nl",
        "leader": "Caroline van der Plas",
        "seats_2023": 7,
    },
    {
        "abbreviation": "JA21",
        "name": "JA21",
        "description": "Conservatief-liberale partij met nadruk op veiligheid, migratie en kernenergie.",
        "color": "#003366",
        "website": "https://www.ja21.nl",
        "leader": "Joost Eerdmans",
        "seats_2023": 3,
    },
    {
        "abbreviation": "Volt",
        "name": "Volt Nederland",
        "description": "Pan-Europese progressieve partij gericht op Europese samenwerking en klimaat.",
        "color": "#502379",
        "website": "https://www.voltnederland.org",
        "leader": "Laurens Dassen",
        "seats_2023": 3,
    },
    {
        "abbreviation": "PvdD",
        "name": "Partij voor de Dieren",
        "description": "Ecologische partij met focus op dierenrechten, klimaat en duurzame economie.",
        "color": "#009F42",
        "website": "https://www.partijvoordedieren.nl",
        "leader": "Esther Ouwehand",
        "seats_2023": 3,
    },
    {
        "abbreviation": "D66",
        "name": "Democraten 66",
        "description": "Sociaal-liberale partij voor onderwijs, klimaat en democratische vernieuwing.",
        "color": "#009C58",
        "website": "https://www.d66.nl",
        "leader": "Rob Jetten",
        "seats_2023": 9,
    },
    {
        "abbreviation": "SP",
        "name": "Socialistische Partij",
        "description": "Linkse partij gericht op bestaanszekerheid, zorg en betaalbaar wonen.",
        "color": "#BE0F0A",
        "website": "https://www.sp.nl",
        "leader": "Lilianne Marijnissen",
        "seats_2023": 5,
    },
    {
        "abbreviation": "PVV",
        "name": "Partij voor de Vrijheid",
        "description": "Rechts-populistische partij gericht op immigratie, veiligheid en koopkracht.",
        "color": "#003399",
        "website": "https://www.pvv.nl",
        "leader": "Geert Wilders",
        "seats_2023": 37,
    },
    {
        "abbreviation": "CU",
        "name": "ChristenUnie",
        "description": "Christelijk-sociale partij met nadruk op gezinnen, zorg en rentmeesterschap.",
        "color": "#00A6D6",
        "website": "https://www.christenunie.nl",
        "leader": "Mirjam Bikker",
        "seats_2023": 3,
    },
    {
        "abbreviation": "SGP",
        "name": "Staatkundig Gereformeerde Partij",
        "description": "Conservatief-christelijke partij gericht op traditie, rentmeesterschap en levensbeschouwing.",
        "color": "#F58220",
        "website": "https://www.sgp.nl",
        "leader": "Chris Stoffer",
        "seats_2023": 3,
    },
    {
        "abbreviation": "DENK",
        "name": "DENK",
        "description": "Progressief-sociale partij met focus op antidiscriminatie en inclusie.",
        "color": "#00A895",
        "website": "https://www.bewegingdenk.nl",
        "leader": "Stephan van Baarle",
        "seats_2023": 3,
    },
]

statement_entries = [
    {
        "text": "Het eigen risico in de zorg moet omlaag of (gedeeltelijk) afgeschaft worden, ook als dat hogere lasten betekent.",
        "category": "zorg",
    },
    {
        "text": "Nederland moet de asielinstroom verder beperken en opvang in de regio stimuleren.",
        "category": "migratie",
    },
    {
        "text": "De AOW-leeftijd moet minder snel stijgen of tijdelijk worden bevroren.",
        "category": "bestaanszekerheid",
    },
    {
        "text": "De overheid moet fors investeren in defensie en Europese defensiesamenwerking verdiepen.",
        "category": "defensie",
    },
    {
        "text": "Kernenergie moet een grotere rol krijgen in de energiemix.",
        "category": "klimaat",
    },
    {
        "text": "Streng stikstofbeleid blijft nodig, ook als dit betekent dat veestapels krimpen.",
        "category": "landbouw",
    },
    {
        "text": "De rijksoverheid moet meer landelijke regie nemen op woningbouw, desnoods ingrijpen bij gemeenten.",
        "category": "wonen",
    },
    {
        "text": "Inkomsten uit vermogen en winst moeten zwaarder worden belast dan nu.",
        "category": "economie",
    },
    {
        "text": "Er moet een nationaal referendum komen bij grote dossiers.",
        "category": "democratie",
    },
    {
        "text": "De EU-rol van Nederland mag verder worden verdiept.",
        "category": "eu",
    },
    {
        "text": "Arbeidsmigratie moet strakker worden gereguleerd met sectorquota of plafonds.",
        "category": "migratie",
    },
    {
        "text": "Collegegeld in het eerste studiejaar moet (deels) worden afgeschaft en de basisbeurs verder verbeterd.",
        "category": "onderwijs",
    },
    {
        "text": "CO2-heffingen en strengere normen voor industrie moeten versneld worden ingevoerd.",
        "category": "klimaat",
    },
    {
        "text": "Schiphol en de luchtvaart moeten verder krimpen om klimaat en leefomgeving te beschermen.",
        "category": "klimaat",
    },
    {
        "text": "Gemeenten moeten tijdelijk huurprijzen kunnen bevriezen in gespannen gebieden.",
        "category": "wonen",
    },
    {
        "text": "Religieuze en levensbeschouwelijke vrijheid verdient extra wettelijke bescherming, ook in onderwijs en zorg.",
        "category": "waarden",
    },
    {
        "text": "De overheid moet discriminatie harder aanpakken, inclusief een Nationaal Coordinator met extra bevoegdheden.",
        "category": "waarden",
    },
    {
        "text": "Er moeten langjarige boer-burgerakkoorden komen voor natuur, water en klimaat met goede betaling.",
        "category": "landbouw",
    },
    {
        "text": "Nederland moet ruimhartige opvang van oorlogsvluchtelingen blijven bieden, ook als dat lokaal moeite kost.",
        "category": "migratie",
    },
    {
        "text": "Big Tech moet strenger worden gereguleerd, bij voorkeur via Europese wetgeving.",
        "category": "digitale_economie",
    },
    {
        "text": "Introduceer een Nederlandse productiviteitsagenda met minder regels en simpeler belastingen voor ondernemers.",
        "category": "economie",
    },
    {
        "text": "Het landbouwexportmodel moet in 10-15 jaar omschakelen naar kringloop- en natuurinclusieve productie.",
        "category": "landbouw",
    },
    {
        "text": "Nederland moet meer nationale veiligheidsmaatregelen nemen tegen statelijke dreiging, ook als dat meer bevoegdheden voor diensten betekent.",
        "category": "veiligheid",
    },
    {
        "text": "Het primair onderwijs moet structureel kleinere klassen krijgen, betaald uit herschikking van belastingvoordelen.",
        "category": "onderwijs",
    },
]

positions = {
    statement_entries[0]["text"]: {
        "VVD": ("disagree", "Wil lastenstijging voorkomen."),
        "GL-PvdA": ("agree", "Wil zorgkosten verlagen via solidariteit."),
        "NSC": ("agree", "Zoekt verlichting voor middeninkomens."),
        "BBB": ("agree", "Ziet zorgdruk op gezinnen."),
        "JA21": ("agree", "Wil lagere zorglasten."),
        "Volt": ("agree", "Pleit voor betaalbare zorg."),
        "PvdD": ("agree", "Beschouwt zorgtoegang als basisrecht."),
        "D66": ("neutral", "Zoekt gerichte verlaging, let op dekking."),
        "SP": ("agree", "Wil eigen risico afschaffen."),
        "PVV": ("agree", "Wil lasten op zorg omlaag."),
        "CU": ("agree", "Stelt solidariteit boven eigen risico."),
        "SGP": ("neutral", "Weegt solidariteit en betaalbaarheid."),
        "DENK": ("agree", "Wil zorg voor lage inkomens ontzien."),
    },
    statement_entries[1]["text"]: {
        "VVD": ("agree", "Zoekt verdere beperking van instroom."),
        "GL-PvdA": ("disagree", "Wil focus op humane opvang."),
        "NSC": ("agree", "Streeft naar houdbare migratie."),
        "BBB": ("agree", "Wil kleinere instroom en regionale opvang."),
        "JA21": ("agree", "Pleit voor stevig restrictief beleid."),
        "Volt": ("disagree", "Stelt Europese solidariteit voorop."),
        "PvdD": ("disagree", "Wil bescherming van vluchtelingen."),
        "D66": ("disagree", "Benadrukt mensenrechten en Europese afspraken."),
        "SP": ("disagree", "Wil eerlijke verdeling en opvang."),
        "PVV": ("agree", "Wil asielinstroom fors inperken."),
        "CU": ("neutral", "Zoekt balans tussen recht en draagkracht."),
        "SGP": ("agree", "Wil strakker toelatingsbeleid."),
        "DENK": ("disagree", "Verzet zich tegen verdere beperking."),
    },
    statement_entries[2]["text"]: {
        "VVD": ("disagree", "Vreest voor houdbaarheid stelsel."),
        "GL-PvdA": ("agree", "Wil koopkracht senioren beschermen."),
        "NSC": ("agree", "Zoekt rust voor zwaar werk."),
        "BBB": ("agree", "Staat stil bij zware beroepen."),
        "JA21": ("agree", "Wil ouderen ontzien."),
        "Volt": ("disagree", "Benadrukt koppeling aan levensverwachting."),
        "PvdD": ("agree", "Wil eerlijke AOW-leeftijd."),
        "D66": ("disagree", "Houdt vast aan demografische koppeling."),
        "SP": ("agree", "Wil AOW-leeftijd bevriezen."),
        "PVV": ("agree", "Wil lagere pensioenleeftijd."),
        "CU": ("neutral", "Zoekt maatwerk voor zware beroepen."),
        "SGP": ("disagree", "Legt nadruk op financiële houdbaarheid."),
        "DENK": ("agree", "Wil lagere AOW-leeftijd voor zware beroepen."),
    },
    statement_entries[3]["text"]: {
        "VVD": ("agree", "Wil NAVO-norm ruim halen."),
        "GL-PvdA": ("agree", "Steunt Europese defensiesamenwerking."),
        "NSC": ("agree", "Ziet noodzaak van versterkte defensie."),
        "BBB": ("neutral", "Ondersteunt defensie, terughoudend over EU-verdieping."),
        "JA21": ("neutral", "Wil investeren maar kritisch op EU."),
        "Volt": ("agree", "Pleidooi voor Europese defensie."),
        "PvdD": ("disagree", "Heeft voorkeur voor vredesinitiatieven."),
        "D66": ("agree", "Ziet defensie en EU als samenhangend."),
        "SP": ("disagree", "Wil geen extra EU-defensie."),
        "PVV": ("neutral", "Wil sterk leger maar nationaal controle."),
        "CU": ("agree", "Ondersteunt hogere defensiebudgetten."),
        "SGP": ("agree", "Wil investeren in veiligheid."),
        "DENK": ("neutral", "Wil diplomatie met gematigde samenwerking."),
    },
    statement_entries[4]["text"]: {
        "VVD": ("agree", "Ziet kernenergie als klimaatoptie."),
        "GL-PvdA": ("disagree", "Legt nadruk op duurzame alternatieven."),
        "NSC": ("agree", "Open voor kernenergie als aanvulling."),
        "BBB": ("agree", "Wil stabiele energievoorziening."),
        "JA21": ("agree", "Pleit actief voor nieuwe kerncentrales."),
        "Volt": ("agree", "Aanvaardt kernenergie in mix."),
        "PvdD": ("disagree", "Wil 100% duurzame bronnen."),
        "D66": ("neutral", "Ziet kernenergie als mogelijke aanvulling."),
        "SP": ("disagree", "Twijfelt aan kosten en afval."),
        "PVV": ("agree", "Steunt kernenergie voor leveringszekerheid."),
        "CU": ("neutral", "Stelt voorwaarden rond veiligheid."),
        "SGP": ("agree", "Open voor kernenergie naast duurzame bronnen."),
        "DENK": ("neutral", "Wil eerst inzicht in kosten en risico's."),
    },
    statement_entries[5]["text"]: {
        "VVD": ("neutral", "Zoekt evenwicht tussen natuur en ondernemers."),
        "GL-PvdA": ("agree", "Stelt natuurherstel voorop."),
        "NSC": ("agree", "Wil wettelijke doelen naleven."),
        "BBB": ("disagree", "Verzet zich tegen gedwongen krimp."),
        "JA21": ("disagree", "Wil soepeler stikstofbeleid."),
        "Volt": ("agree", "Legt nadruk op klimaat en biodiversiteit."),
        "PvdD": ("agree", "Wil forse krimp veestapel."),
        "D66": ("agree", "Wil strikte aanpak voor natuur."),
        "SP": ("agree", "Ziet stikstofaanpak als noodzakelijk."),
        "PVV": ("disagree", "Wil boeren ontzien."),
        "CU": ("agree", "Zoekt balans maar houdt vast aan doelen."),
        "SGP": ("disagree", "Vraagt meer ruimte voor boeren."),
        "DENK": ("agree", "Steunt natuur- en klimaatdoelen."),
    },
    statement_entries[6]["text"]: {
        "VVD": ("agree", "Wil bouwtempo verhogen met regie."),
        "GL-PvdA": ("agree", "Pleiten voor landelijke woonaanpak."),
        "NSC": ("agree", "Zoekt sterkere rijksregie."),
        "BBB": ("neutral", "Wil regio inspraak houden."),
        "JA21": ("agree", "Zoekt doorbraak in woningbouw."),
        "Volt": ("agree", "Pleit voor landelijke woonagenda."),
        "PvdD": ("agree", "Wil betaalbaar en duurzaam bouwen."),
        "D66": ("agree", "Steunt landelijke regie op wonen."),
        "SP": ("agree", "Wil stevige rijksaanpak."),
        "PVV": ("agree", "Zoekt versnelling sociale woningbouw."),
        "CU": ("agree", "Wil rijksregie voor betaalbaar wonen."),
        "SGP": ("neutral", "Hecht aan lokale autonomie."),
        "DENK": ("agree", "Wil actie tegen woningnood."),
    },
    statement_entries[7]["text"]: {
        "VVD": ("disagree", "Wil investeringsklimaat beschermen."),
        "GL-PvdA": ("agree", "Streeft naar eerlijkere vermogensbelasting."),
        "NSC": ("agree", "Zoekt herverdeling met oog voor midden."),
        "BBB": ("neutral", "Wil lasten voor mkb beperken."),
        "JA21": ("disagree", "Wil lasten op kapitaal laag houden."),
        "Volt": ("agree", "Pleit voor progressieve vermogensbelasting."),
        "PvdD": ("agree", "Wil vermogen zwaarder belasten."),
        "D66": ("agree", "Zoekt eerlijkere verdeling van kapitaalinkomen."),
        "SP": ("agree", "Wil vermogens zwaarder belasten."),
        "PVV": ("agree", "Wil grote vermogens mee laten betalen."),
        "CU": ("agree", "Zoekt rechtvaardige lastenverdeling."),
        "SGP": ("neutral", "Zoekt balans tussen rechtvaardigheid en economie."),
        "DENK": ("agree", "Wil vermogen meer belasten."),
    },
    statement_entries[8]["text"]: {
        "VVD": ("disagree", "Hecht aan representatieve democratie."),
        "GL-PvdA": ("disagree", "Voorkeur voor parlementaire besluitvorming."),
        "NSC": ("neutral", "Staat open voor referenda na zorgvuldige weging."),
        "BBB": ("agree", "Wil burgers directer laten meepraten."),
        "JA21": ("agree", "Ziet referenda als democratische aanvulling."),
        "Volt": ("disagree", "Verkiest deliberatieve vormen."),
        "PvdD": ("agree", "Steunt directe democratie."),
        "D66": ("disagree", "Legt nadruk op andere vernieuwing."),
        "SP": ("agree", "Pleit voor bindend referendum."),
        "PVV": ("agree", "Wil bevolking direct laten stemmen."),
        "CU": ("disagree", "Wil zorgvuldige representatieve besluitvorming."),
        "SGP": ("disagree", "Hecht aan parlementaire democratie."),
        "DENK": ("agree", "Ziet referenda als instrument voor burgers."),
    },
    statement_entries[9]["text"]: {
        "VVD": ("neutral", "Zoekt praktische Europese samenwerking."),
        "GL-PvdA": ("agree", "Wil dieper Europees beleid."),
        "NSC": ("neutral", "Steunt samenwerking met stevige nationale controle."),
        "BBB": ("disagree", "Wil minder Brusselse bemoeienis."),
        "JA21": ("disagree", "Verzet zich tegen verdere integratie."),
        "Volt": ("agree", "Is uitgesproken pro-Europees."),
        "PvdD": ("neutral", "Steunt EU voor klimaat, maar kritisch op landbouw."),
        "D66": ("agree", "Wil EU-verdieping voor grote dossiers."),
        "SP": ("disagree", "Wil minder macht naar Brussel."),
        "PVV": ("disagree", "Is tegen Europese verdieping."),
        "CU": ("neutral", "Zoekt samenwerking met subsidiariteit."),
        "SGP": ("disagree", "Waakt voor overdracht van soevereiniteit."),
        "DENK": ("neutral", "Steunt EU waar het rechten versterkt."),
    },
    statement_entries[10]["text"]: {
        "VVD": ("agree", "Wil grip op arbeidsmigratie."),
        "GL-PvdA": ("neutral", "Wil misstanden aanpakken zonder harde plafonds."),
        "NSC": ("agree", "Zoekt sectorplafonds voor draagkracht."),
        "BBB": ("agree", "Wil regulering om druk op regio te beperken."),
        "JA21": ("agree", "Pleit voor quota en strengere regels."),
        "Volt": ("disagree", "Waarschuwt voor inperking vrij verkeer."),
        "PvdD": ("agree", "Wil bescherming arbeidsmigranten en beperking misbruik."),
        "D66": ("disagree", "Wil Europese arbeidsmobiliteit behouden."),
        "SP": ("agree", "Wil misstanden hard aanpakken."),
        "PVV": ("agree", "Wil arbeidsmigratie fors beperken."),
        "CU": ("agree", "Zoekt strakkere regels en betere huisvesting."),
        "SGP": ("agree", "Wil beheersbare arbeidsmigratie."),
        "DENK": ("disagree", "Verzet zich tegen harde plafonds."),
    },
    statement_entries[11]["text"]: {
        "VVD": ("disagree", "Wil studievoordelen gericht en betaalbaar houden."),
        "GL-PvdA": ("agree", "Wil toegankelijk hoger onderwijs."),
        "NSC": ("neutral", "Weegt betaalbaarheid en toegankelijkheid."),
        "BBB": ("neutral", "Wil lasten beperken maar vraagt dekking."),
        "JA21": ("disagree", "Verkiest investeren in kwaliteit en selectie."),
        "Volt": ("agree", "Pleit voor brede toegang tot onderwijs."),
        "PvdD": ("agree", "Wil schulden van studenten beperken."),
        "D66": ("agree", "Zet in op toegankelijk onderwijs."),
        "SP": ("agree", "Wil studieschulden terugdringen."),
        "PVV": ("agree", "Steunt lagere lasten voor studenten."),
        "CU": ("neutral", "Zoekt balans tussen steun en dekking."),
        "SGP": ("disagree", "Benadrukt eigen verantwoordelijkheid."),
        "DENK": ("agree", "Wil onderwijs toegankelijker maken."),
    },
    statement_entries[12]["text"]: {
        "VVD": ("disagree", "Vreest schade voor industrie."),
        "GL-PvdA": ("agree", "Wil versnelling van klimaatbeleid."),
        "NSC": ("neutral", "Zoekt balans tussen klimaat en economie."),
        "BBB": ("disagree", "Beschermt industrie en landbouw."),
        "JA21": ("disagree", "Wil lagere lasten voor bedrijven."),
        "Volt": ("agree", "Pleit voor strenge normen."),
        "PvdD": ("agree", "Wil stevige CO2-prijsvorming."),
        "D66": ("agree", "Ziet industrie als sleutel voor transitie."),
        "SP": ("agree", "Wil industrie vergroenen met stevige normen."),
        "PVV": ("disagree", "Verzet zich tegen hogere klimaatheffingen."),
        "CU": ("agree", "Legt nadruk op rentmeesterschap."),
        "SGP": ("neutral", "Weegt klimaat en economische positie."),
        "DENK": ("agree", "Wil klimaatrechtvaardigheid voorop."),
    },
    statement_entries[13]["text"]: {
        "VVD": ("disagree", "Wil Schiphol als mainport behouden."),
        "GL-PvdA": ("agree", "Zoekt krimp voor klimaat en leefomgeving."),
        "NSC": ("neutral", "Weegt bereikbaarheid en milieu af."),
        "BBB": ("disagree", "Wil economische schade voorkomen."),
        "JA21": ("disagree", "Vindt krimp schadelijk voor economie."),
        "Volt": ("agree", "Ziet krimp als onderdeel klimaatbeleid."),
        "PvdD": ("agree", "Wil forse reductie luchtvaart."),
        "D66": ("agree", "Wil beperkingen op groei luchtvaart."),
        "SP": ("agree", "Stelt leefbaarheid bewoners voorop."),
        "PVV": ("disagree", "Wil luchtvaart overeind houden."),
        "CU": ("neutral", "Zoekt balans tussen bereikbaarheid en leefklimaat."),
        "SGP": ("disagree", "Wil bereikbaarheid en economie beschermen."),
        "DENK": ("neutral", "Staat open voor beperking met oog voor banen."),
    },
    statement_entries[14]["text"]: {
        "VVD": ("disagree", "Vreest dat bevriezen investeringen remt."),
        "GL-PvdA": ("agree", "Wil huurders versneld beschermen."),
        "NSC": ("neutral", "Zoekt maatwerk voor gespannen markten."),
        "BBB": ("neutral", "Wil maatwerk en stimulans voor bouw."),
        "JA21": ("disagree", "Pleit voor marktwerking in huur."),
        "Volt": ("agree", "Wil huurders tijdelijk beschermen."),
        "PvdD": ("agree", "Steunt maatregelen tegen hoge huren."),
        "D66": ("agree", "Wil betaalbaarheid garanderen."),
        "SP": ("agree", "Staat pal voor huurders."),
        "PVV": ("agree", "Wil huurders ontzien."),
        "CU": ("agree", "Steunt tijdelijke huurstop."),
        "SGP": ("disagree", "Hecht aan markt en investeringen."),
        "DENK": ("agree", "Wil directe bescherming huurders."),
    },
    statement_entries[15]["text"]: {
        "VVD": ("neutral", "Zoekt balans tussen vrijheid en gelijkheid."),
        "GL-PvdA": ("neutral", "Weegt grondrechten en gelijke behandeling."),
        "NSC": ("agree", "Wil levensbeschouwelijke vrijheid waarborgen."),
        "BBB": ("agree", "Hecht aan ruimte voor levensbeschouwing."),
        "JA21": ("neutral", "Steunt vrijheid maar wijst misbruik af."),
        "Volt": ("disagree", "Vreest aantasting gelijkheidsbeginsel."),
        "PvdD": ("disagree", "Wil gelijke behandeling boven bijzondere positie."),
        "D66": ("disagree", "Legt nadruk op scheiding tussen kerk en staat."),
        "SP": ("neutral", "Wil grondrechten borgen zonder uitzonderingen."),
        "PVV": ("disagree", "Wil religieuze privileges beperken."),
        "CU": ("agree", "Beschermt vrijheid van onderwijs en zorg."),
        "SGP": ("agree", "Ziet religieuze vrijheid als kernwaarde."),
        "DENK": ("agree", "Wil extra bescherming tegen uitsluiting."),
    },
    statement_entries[16]["text"]: {
        "VVD": ("neutral", "Wil aanpak discriminatie met oog voor uitvoerbaarheid."),
        "GL-PvdA": ("agree", "Pleiten voor krachtige antidiscriminatie."),
        "NSC": ("agree", "Wil handhaving versterken."),
        "BBB": ("disagree", "Vreest groei van bureaucratie."),
        "JA21": ("disagree", "Ziet risico op bevooroordeelde aanpak."),
        "Volt": ("agree", "Wil nationale coördinatie."),
        "PvdD": ("agree", "Steunt stevige bestrijding van discriminatie."),
        "D66": ("agree", "Zet in op nationale regie."),
        "SP": ("agree", "Wil discriminatie hard aanpakken."),
        "PVV": ("disagree", "Verzet zich tegen extra bevoegdheden."),
        "CU": ("agree", "Wil discriminatie actief bestrijden."),
        "SGP": ("neutral", "Weegt zorgvuldigheid en uitvoering."),
        "DENK": ("agree", "Maakt antidiscriminatie tot speerpunt."),
    },
    statement_entries[17]["text"]: {
        "VVD": ("neutral", "Staat open voor contracten naast regels."),
        "GL-PvdA": ("neutral", "Wil prestaties koppelen aan duidelijke doelen."),
        "NSC": ("agree", "Zoekt langjarige zekerheid voor boeren."),
        "BBB": ("agree", "Ziet contracten als alternatief voor dwang."),
        "JA21": ("agree", "Prefereert vrijwillige afspraken."),
        "Volt": ("disagree", "Wil bindende normen vanuit de overheid."),
        "PvdD": ("disagree", "Vindt contracten te vrijblijvend."),
        "D66": ("agree", "Steunt gebiedsgerichte afspraken."),
        "SP": ("neutral", "Wil eerlijke beloning maar ook stevige doelen."),
        "PVV": ("agree", "Wil boeren perspectief bieden."),
        "CU": ("agree", "Geef boeren zekerheid met vergoedingen."),
        "SGP": ("agree", "Pleiten voor vrijwillige akkoorden."),
        "DENK": ("neutral", "Staat open voor afspraken mits eerlijk."),
    },
    statement_entries[18]["text"]: {
        "VVD": ("neutral", "Wil opvang maar bewaakt draagkracht."),
        "GL-PvdA": ("agree", "Legt nadruk op internationale solidariteit."),
        "NSC": ("neutral", "Zoekt balans tussen solidariteit en draagvlak."),
        "BBB": ("disagree", "Wil beperking vanwege druk op gemeenten."),
        "JA21": ("disagree", "Wil vooral opvang in regio."),
        "Volt": ("agree", "Staat voor ruimhartige opvang."),
        "PvdD": ("agree", "Wil bescherming voor oorlogsvluchtelingen."),
        "D66": ("agree", "Benadrukt Europese solidariteit."),
        "SP": ("agree", "Zet in op menselijke opvang."),
        "PVV": ("disagree", "Weerstaat verdere opvang."),
        "CU": ("agree", "Ziet opvang als morele plicht."),
        "SGP": ("neutral", "Steunt opvang maar let op draagkracht."),
        "DENK": ("agree", "Wil vluchtelingen ruimhartig ondersteunen."),
    },
    statement_entries[19]["text"]: {
        "VVD": ("neutral", "Pleiten voor regels maar ook innovatie."),
        "GL-PvdA": ("agree", "Wil digitale macht inperken."),
        "NSC": ("agree", "Ziet toezicht als onderdeel van goed bestuur."),
        "BBB": ("neutral", "Wil ondernemersruimte en bescherming."),
        "JA21": ("disagree", "Ziet EU-regels als risico voor economie."),
        "Volt": ("agree", "Pleit voor Europese tech-regels."),
        "PvdD": ("agree", "Wil strenge regels op data en AI."),
        "D66": ("agree", "Zet in op digitale rechten."),
        "SP": ("agree", "Wil techreuzen aanpakken."),
        "PVV": ("disagree", "Wil nationale regie en minder EU."),
        "CU": ("agree", "Ziet noodzaak van regulering."),
        "SGP": ("neutral", "Zoekt balans tussen innovatie en regels."),
        "DENK": ("agree", "Wil burgers beschermen tegen machtsmisbruik."),
    },
    statement_entries[20]["text"]: {
        "VVD": ("agree", "Wil minder regels voor ondernemers."),
        "GL-PvdA": ("disagree", "Wil juist sturen op herverdeling."),
        "NSC": ("agree", "Zoekt eenvoud en productiviteit."),
        "BBB": ("agree", "Wil lastenverlichting voor mkb."),
        "JA21": ("agree", "Benadrukt ondernemersklimaat."),
        "Volt": ("neutral", "Wil hervormen maar met sociale randvoorwaarden."),
        "PvdD": ("disagree", "Stelt duurzaamheid boven deregulering."),
        "D66": ("neutral", "Wil innovatie met oog voor klimaat."),
        "SP": ("disagree", "Ziet risico op race naar beneden."),
        "PVV": ("agree", "Wil lastenverlichting voor bedrijven."),
        "CU": ("neutral", "Zoekt balans tussen ruimte en regels."),
        "SGP": ("agree", "Steunt minder regeldruk."),
        "DENK": ("neutral", "Wil eenvoud zonder sociale achteruitgang."),
    },
    statement_entries[21]["text"]: {
        "VVD": ("disagree", "Wil exportpositie behouden."),
        "GL-PvdA": ("agree", "Pleit voor versnelling naar kringlooplandbouw."),
        "NSC": ("neutral", "Zoekt geleidelijke transitie."),
        "BBB": ("disagree", "Verzet zich tegen harde omschakeltermijnen."),
        "JA21": ("disagree", "Wil huidige schaal behouden."),
        "Volt": ("agree", "Wil landbouw verduurzamen."),
        "PvdD": ("agree", "Zet in op snelle omschakeling."),
        "D66": ("agree", "Steunt natuurinclusieve landbouw."),
        "SP": ("agree", "Wil waardevolle kringlooplandbouw."),
        "PVV": ("disagree", "Beschermt exportmodel."),
        "CU": ("agree", "Zoekt toekomstbestendige landbouw."),
        "SGP": ("neutral", "Wil transitie maar met ruimte voor ondernemers."),
        "DENK": ("neutral", "Steunt verduurzaming met draagvlak."),
    },
    statement_entries[22]["text"]: {
        "VVD": ("agree", "Wil veiligheidsdiensten versterken."),
        "GL-PvdA": ("agree", "Combineert veiligheid met waarborgen."),
        "NSC": ("agree", "Ziet noodzaak extra veiligheidsmaatregelen."),
        "BBB": ("neutral", "Steunt aanpak maar waakt voor privacy."),
        "JA21": ("agree", "Wil diensten meer slagkracht geven."),
        "Volt": ("agree", "Steunt Europese en nationale weerbaarheid."),
        "PvdD": ("disagree", "Waarschuwt voor inbreuk op privacy."),
        "D66": ("agree", "Wil diensten moderniseren met toezicht."),
        "SP": ("neutral", "Wil veiligheid met stevige controle."),
        "PVV": ("agree", "Pleiten voor hardere veiligheidsaanpak."),
        "CU": ("agree", "Steunt diensten met waarborgen."),
        "SGP": ("agree", "Wil Nederland weerbaar maken."),
        "DENK": ("neutral", "Wil proportionaliteit bewaken."),
    },
    statement_entries[23]["text"]: {
        "VVD": ("neutral", "Wil kwaliteit verbeteren binnen budget."),
        "GL-PvdA": ("agree", "Wil investeren in leraren en klassen."),
        "NSC": ("agree", "Ziet kleinere klassen als basis voor kansengelijkheid."),
        "BBB": ("neutral", "Steunt kleinschaligheid, zoekt dekking."),
        "JA21": ("neutral", "Legt focus op basisvaardigheden."),
        "Volt": ("agree", "Wil kleinschalig en inclusief onderwijs."),
        "PvdD": ("agree", "Steunt extra leraren en kleinere klassen."),
        "D66": ("agree", "Zet onderwijsinvesteringen centraal."),
        "SP": ("agree", "Wil kleinere klassen voor beter onderwijs."),
        "PVV": ("agree", "Steunt extra investeringen in onderwijs."),
        "CU": ("agree", "Wil onderwijsprofessionals ruimte geven."),
        "SGP": ("neutral", "Weegt kwaliteit en financiële houdbaarheid."),
        "DENK": ("agree", "Wil gelijke kansen via kleinere klassen."),
    },
}


def slugify(value: str) -> str:
    slug = value.lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")


def build_dataset():
    party_records = []
    for party in parties:
        party_records.append(
            {
                "id": f"party-{slugify(party['abbreviation'])}",
                **party,
            }
        )

    statement_records = []
    for index, statement in enumerate(statement_entries, start=1):
        statement_records.append(
            {
                "id": f"statement-{index:03d}",
                "order_index": index,
                **statement,
            }
        )

    party_lookup = {record["abbreviation"]: record["id"] for record in party_records}
    statement_lookup = {record["text"]: record["id"] for record in statement_records}

    position_records = []
    for statement in statement_entries:
        st_text = statement["text"]
        st_id = statement_lookup[st_text]
        mapping = positions[st_text]
        for abbreviation, (position, explanation) in mapping.items():
            party_id = party_lookup[abbreviation]
            position_records.append(
                {
                    "party_id": party_id,
                    "statement_id": st_id,
                    "position": position,
                    "explanation": explanation,
                }
            )

    return party_records, statement_records, position_records


def write_dataset(parties_data, statements_data, positions_data):
    dataset_path = Path("data/questionnaire.ts")
    dataset_path.parent.mkdir(exist_ok=True)

    def to_ts(value):
        return json.dumps(value, indent=2, ensure_ascii=False)

    content = """import type {{ Party, Statement, PartyPosition }} from '../lib/types';

export const parties: Party[] = {parties};

export const statements: Statement[] = {statements};

export const partyPositions: PartyPosition[] = {positions};
""".format(
        parties=to_ts(parties_data),
        statements=to_ts(statements_data),
        positions=to_ts(positions_data),
    )

    dataset_path.write_text(content)


def write_seed():
    seed_path = Path("prisma/seed.ts")
    seed_path.parent.mkdir(exist_ok=True)
    seed_content = """import { PrismaClient } from '@prisma/client';
import { parties, statements, partyPositions } from '../data/questionnaire';

const prisma = new PrismaClient();

async function main() {
  await prisma.partyPosition.deleteMany();
  await prisma.userResponse.deleteMany();
  await prisma.statement.deleteMany();
  await prisma.party.deleteMany();

  await prisma.party.createMany({ data: parties });
  await prisma.statement.createMany({ data: statements });
  await prisma.partyPosition.createMany({ data: partyPositions });
}

main()
  .catch(error => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
"""
    seed_path.write_text(seed_content)


def main():
    parties_data, statements_data, positions_data = build_dataset()
    write_dataset(parties_data, statements_data, positions_data)
    write_seed()


if __name__ == "__main__":
    main()
