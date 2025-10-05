const parties = [
  {
    "id": "party-vvd",
    "abbreviation": "VVD",
    "name": "Volkspartij voor Vrijheid en Democratie",
    "description": "Liberale centrumrechtse partij gericht op economie, veiligheid en individuele kansen.",
    "color": "#FF6600",
    "website": "https://www.vvd.nl",
    "leader": "Dilan Yesilgoz",
    "seats_2023": 24
  },
  {
    "id": "party-gl-pvda",
    "abbreviation": "GL-PvdA",
    "name": "GroenLinks-PvdA",
    "description": "Progressieve samenwerking van GroenLinks en PvdA met focus op klimaat en bestaanszekerheid.",
    "color": "#65B32E",
    "website": "https://groenlinks-pvda.nl",
    "leader": "Frans Timmermans",
    "seats_2023": 25
  },
  {
    "id": "party-nsc",
    "abbreviation": "NSC",
    "name": "Nieuw Sociaal Contract",
    "description": "Sociaal-conservatieve partij rond bestuurlijke vernieuwing en bestaanszekerheid.",
    "color": "#1E6F5C",
    "website": "https://www.nieuwsociaalcontract.nl",
    "leader": "Pieter Omtzigt",
    "seats_2023": 20
  },
  {
    "id": "party-bbb",
    "abbreviation": "BBB",
    "name": "BoerBurgerBeweging",
    "description": "Plattelandspartij gericht op voedselproductie, regionale zeggenschap en boerenbelangen.",
    "color": "#4CAF50",
    "website": "https://www.boerburgerbeweging.nl",
    "leader": "Caroline van der Plas",
    "seats_2023": 7
  },
  {
    "id": "party-ja21",
    "abbreviation": "JA21",
    "name": "JA21",
    "description": "Conservatief-liberale partij met nadruk op veiligheid, migratie en kernenergie.",
    "color": "#003366",
    "website": "https://www.ja21.nl",
    "leader": "Joost Eerdmans",
    "seats_2023": 3
  },
  {
    "id": "party-volt",
    "abbreviation": "Volt",
    "name": "Volt Nederland",
    "description": "Pan-Europese progressieve partij gericht op Europese samenwerking en klimaat.",
    "color": "#502379",
    "website": "https://www.voltnederland.org",
    "leader": "Laurens Dassen",
    "seats_2023": 3
  },
  {
    "id": "party-pvdd",
    "abbreviation": "PvdD",
    "name": "Partij voor de Dieren",
    "description": "Ecologische partij met focus op dierenrechten, klimaat en duurzame economie.",
    "color": "#009F42",
    "website": "https://www.partijvoordedieren.nl",
    "leader": "Esther Ouwehand",
    "seats_2023": 3
  },
  {
    "id": "party-d66",
    "abbreviation": "D66",
    "name": "Democraten 66",
    "description": "Sociaal-liberale partij voor onderwijs, klimaat en democratische vernieuwing.",
    "color": "#009C58",
    "website": "https://www.d66.nl",
    "leader": "Rob Jetten",
    "seats_2023": 9
  },
  {
    "id": "party-sp",
    "abbreviation": "SP",
    "name": "Socialistische Partij",
    "description": "Linkse partij gericht op bestaanszekerheid, zorg en betaalbaar wonen.",
    "color": "#BE0F0A",
    "website": "https://www.sp.nl",
    "leader": "Lilianne Marijnissen",
    "seats_2023": 5
  },
  {
    "id": "party-pvv",
    "abbreviation": "PVV",
    "name": "Partij voor de Vrijheid",
    "description": "Rechts-populistische partij gericht op immigratie, veiligheid en koopkracht.",
    "color": "#003399",
    "website": "https://www.pvv.nl",
    "leader": "Geert Wilders",
    "seats_2023": 37
  },
  {
    "id": "party-cu",
    "abbreviation": "CU",
    "name": "ChristenUnie",
    "description": "Christelijk-sociale partij met nadruk op gezinnen, zorg en rentmeesterschap.",
    "color": "#00A6D6",
    "website": "https://www.christenunie.nl",
    "leader": "Mirjam Bikker",
    "seats_2023": 3
  },
  {
    "id": "party-sgp",
    "abbreviation": "SGP",
    "name": "Staatkundig Gereformeerde Partij",
    "description": "Conservatief-christelijke partij gericht op traditie, rentmeesterschap en levensbeschouwing.",
    "color": "#F58220",
    "website": "https://www.sgp.nl",
    "leader": "Chris Stoffer",
    "seats_2023": 3
  },
  {
    "id": "party-denk",
    "abbreviation": "DENK",
    "name": "DENK",
    "description": "Progressief-sociale partij met focus op antidiscriminatie en inclusie.",
    "color": "#00A895",
    "website": "https://www.bewegingdenk.nl",
    "leader": "Stephan van Baarle",
    "seats_2023": 3
  }
];

const statements = [
  {
    "id": "statement-001",
    "order_index": 1,
    "text": "Het eigen risico in de zorg moet omlaag of (gedeeltelijk) afgeschaft worden, ook als dat hogere lasten betekent.",
    "category": "zorg"
  },
  {
    "id": "statement-002",
    "order_index": 2,
    "text": "Nederland moet de asielinstroom verder beperken en opvang in de regio stimuleren.",
    "category": "migratie"
  },
  {
    "id": "statement-003",
    "order_index": 3,
    "text": "De AOW-leeftijd moet minder snel stijgen of tijdelijk worden bevroren.",
    "category": "bestaanszekerheid"
  },
  {
    "id": "statement-004",
    "order_index": 4,
    "text": "De overheid moet fors investeren in defensie en Europese defensiesamenwerking verdiepen.",
    "category": "defensie"
  },
  {
    "id": "statement-005",
    "order_index": 5,
    "text": "Kernenergie moet een grotere rol krijgen in de energiemix.",
    "category": "klimaat"
  },
  {
    "id": "statement-006",
    "order_index": 6,
    "text": "Streng stikstofbeleid blijft nodig, ook als dit betekent dat veestapels krimpen.",
    "category": "landbouw"
  },
  {
    "id": "statement-007",
    "order_index": 7,
    "text": "De rijksoverheid moet meer landelijke regie nemen op woningbouw, desnoods ingrijpen bij gemeenten.",
    "category": "wonen"
  },
  {
    "id": "statement-008",
    "order_index": 8,
    "text": "Inkomsten uit vermogen en winst moeten zwaarder worden belast dan nu.",
    "category": "economie"
  },
  {
    "id": "statement-009",
    "order_index": 9,
    "text": "Er moet een nationaal referendum komen bij grote dossiers.",
    "category": "democratie"
  },
  {
    "id": "statement-010",
    "order_index": 10,
    "text": "De EU-rol van Nederland mag verder worden verdiept.",
    "category": "eu"
  },
  {
    "id": "statement-011",
    "order_index": 11,
    "text": "Arbeidsmigratie moet strakker worden gereguleerd met sectorquota of plafonds.",
    "category": "migratie"
  },
  {
    "id": "statement-012",
    "order_index": 12,
    "text": "Collegegeld in het eerste studiejaar moet (deels) worden afgeschaft en de basisbeurs verder verbeterd.",
    "category": "onderwijs"
  },
  {
    "id": "statement-013",
    "order_index": 13,
    "text": "CO2-heffingen en strengere normen voor industrie moeten versneld worden ingevoerd.",
    "category": "klimaat"
  },
  {
    "id": "statement-014",
    "order_index": 14,
    "text": "Schiphol en de luchtvaart moeten verder krimpen om klimaat en leefomgeving te beschermen.",
    "category": "klimaat"
  },
  {
    "id": "statement-015",
    "order_index": 15,
    "text": "Gemeenten moeten tijdelijk huurprijzen kunnen bevriezen in gespannen gebieden.",
    "category": "wonen"
  },
  {
    "id": "statement-016",
    "order_index": 16,
    "text": "Religieuze en levensbeschouwelijke vrijheid verdient extra wettelijke bescherming, ook in onderwijs en zorg.",
    "category": "waarden"
  },
  {
    "id": "statement-017",
    "order_index": 17,
    "text": "De overheid moet discriminatie harder aanpakken, inclusief een Nationaal Coordinator met extra bevoegdheden.",
    "category": "waarden"
  },
  {
    "id": "statement-018",
    "order_index": 18,
    "text": "Er moeten langjarige boer-burgerakkoorden komen voor natuur, water en klimaat met goede betaling.",
    "category": "landbouw"
  },
  {
    "id": "statement-019",
    "order_index": 19,
    "text": "Nederland moet ruimhartige opvang van oorlogsvluchtelingen blijven bieden, ook als dat lokaal moeite kost.",
    "category": "migratie"
  },
  {
    "id": "statement-020",
    "order_index": 20,
    "text": "Big Tech moet strenger worden gereguleerd, bij voorkeur via Europese wetgeving.",
    "category": "digitale_economie"
  },
  {
    "id": "statement-021",
    "order_index": 21,
    "text": "Introduceer een Nederlandse productiviteitsagenda met minder regels en simpeler belastingen voor ondernemers.",
    "category": "economie"
  },
  {
    "id": "statement-022",
    "order_index": 22,
    "text": "Het landbouwexportmodel moet in 10-15 jaar omschakelen naar kringloop- en natuurinclusieve productie.",
    "category": "landbouw"
  },
  {
    "id": "statement-023",
    "order_index": 23,
    "text": "Nederland moet meer nationale veiligheidsmaatregelen nemen tegen statelijke dreiging, ook als dat meer bevoegdheden voor diensten betekent.",
    "category": "veiligheid"
  },
  {
    "id": "statement-024",
    "order_index": 24,
    "text": "Het primair onderwijs moet structureel kleinere klassen krijgen, betaald uit herschikking van belastingvoordelen.",
    "category": "onderwijs"
  }
];

const partyPositions = [
  {
    "party_id": "party-vvd",
    "statement_id": "statement-001",
    "position": "disagree",
    "explanation": "Wil lastenstijging voorkomen."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Wil zorgkosten verlagen via solidariteit."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Zoekt verlichting voor middeninkomens."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Ziet zorgdruk op gezinnen."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Wil lagere zorglasten."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Pleit voor betaalbare zorg."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Beschouwt zorgtoegang als basisrecht."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-001",
    "position": "neutral",
    "explanation": "Zoekt gerichte verlaging, let op dekking."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Wil eigen risico afschaffen."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Wil lasten op zorg omlaag."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Stelt solidariteit boven eigen risico."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-001",
    "position": "neutral",
    "explanation": "Weegt solidariteit en betaalbaarheid."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-001",
    "position": "agree",
    "explanation": "Wil zorg voor lage inkomens ontzien."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-002",
    "position": "agree",
    "explanation": "Zoekt verdere beperking van instroom."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-002",
    "position": "disagree",
    "explanation": "Wil focus op humane opvang."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-002",
    "position": "agree",
    "explanation": "Streeft naar houdbare migratie."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-002",
    "position": "agree",
    "explanation": "Wil kleinere instroom en regionale opvang."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-002",
    "position": "agree",
    "explanation": "Pleit voor stevig restrictief beleid."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-002",
    "position": "disagree",
    "explanation": "Stelt Europese solidariteit voorop."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-002",
    "position": "disagree",
    "explanation": "Wil bescherming van vluchtelingen."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-002",
    "position": "disagree",
    "explanation": "Benadrukt mensenrechten en Europese afspraken."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-002",
    "position": "disagree",
    "explanation": "Wil eerlijke verdeling en opvang."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-002",
    "position": "agree",
    "explanation": "Wil asielinstroom fors inperken."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-002",
    "position": "neutral",
    "explanation": "Zoekt balans tussen recht en draagkracht."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-002",
    "position": "agree",
    "explanation": "Wil strakker toelatingsbeleid."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-002",
    "position": "disagree",
    "explanation": "Verzet zich tegen verdere beperking."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-003",
    "position": "disagree",
    "explanation": "Vreest voor houdbaarheid stelsel."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-003",
    "position": "agree",
    "explanation": "Wil koopkracht senioren beschermen."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-003",
    "position": "agree",
    "explanation": "Zoekt rust voor zwaar werk."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-003",
    "position": "agree",
    "explanation": "Staat stil bij zware beroepen."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-003",
    "position": "agree",
    "explanation": "Wil ouderen ontzien."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-003",
    "position": "disagree",
    "explanation": "Benadrukt koppeling aan levensverwachting."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-003",
    "position": "agree",
    "explanation": "Wil eerlijke AOW-leeftijd."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-003",
    "position": "disagree",
    "explanation": "Houdt vast aan demografische koppeling."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-003",
    "position": "agree",
    "explanation": "Wil AOW-leeftijd bevriezen."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-003",
    "position": "agree",
    "explanation": "Wil lagere pensioenleeftijd."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-003",
    "position": "neutral",
    "explanation": "Zoekt maatwerk voor zware beroepen."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-003",
    "position": "disagree",
    "explanation": "Legt nadruk op financiële houdbaarheid."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-003",
    "position": "agree",
    "explanation": "Wil lagere AOW-leeftijd voor zware beroepen."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-004",
    "position": "agree",
    "explanation": "Wil NAVO-norm ruim halen."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-004",
    "position": "agree",
    "explanation": "Steunt Europese defensiesamenwerking."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-004",
    "position": "agree",
    "explanation": "Ziet noodzaak van versterkte defensie."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-004",
    "position": "neutral",
    "explanation": "Ondersteunt defensie, terughoudend over EU-verdieping."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-004",
    "position": "neutral",
    "explanation": "Wil investeren maar kritisch op EU."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-004",
    "position": "agree",
    "explanation": "Pleidooi voor Europese defensie."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-004",
    "position": "disagree",
    "explanation": "Heeft voorkeur voor vredesinitiatieven."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-004",
    "position": "agree",
    "explanation": "Ziet defensie en EU als samenhangend."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-004",
    "position": "disagree",
    "explanation": "Wil geen extra EU-defensie."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-004",
    "position": "neutral",
    "explanation": "Wil sterk leger maar nationaal controle."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-004",
    "position": "agree",
    "explanation": "Ondersteunt hogere defensiebudgetten."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-004",
    "position": "agree",
    "explanation": "Wil investeren in veiligheid."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-004",
    "position": "neutral",
    "explanation": "Wil diplomatie met gematigde samenwerking."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-005",
    "position": "agree",
    "explanation": "Ziet kernenergie als klimaatoptie."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-005",
    "position": "disagree",
    "explanation": "Legt nadruk op duurzame alternatieven."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-005",
    "position": "agree",
    "explanation": "Open voor kernenergie als aanvulling."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-005",
    "position": "agree",
    "explanation": "Wil stabiele energievoorziening."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-005",
    "position": "agree",
    "explanation": "Pleit actief voor nieuwe kerncentrales."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-005",
    "position": "agree",
    "explanation": "Aanvaardt kernenergie in mix."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-005",
    "position": "disagree",
    "explanation": "Wil 100% duurzame bronnen."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-005",
    "position": "neutral",
    "explanation": "Ziet kernenergie als mogelijke aanvulling."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-005",
    "position": "disagree",
    "explanation": "Twijfelt aan kosten en afval."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-005",
    "position": "agree",
    "explanation": "Steunt kernenergie voor leveringszekerheid."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-005",
    "position": "neutral",
    "explanation": "Stelt voorwaarden rond veiligheid."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-005",
    "position": "agree",
    "explanation": "Open voor kernenergie naast duurzame bronnen."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-005",
    "position": "neutral",
    "explanation": "Wil eerst inzicht in kosten en risico's."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-006",
    "position": "neutral",
    "explanation": "Zoekt evenwicht tussen natuur en ondernemers."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-006",
    "position": "agree",
    "explanation": "Stelt natuurherstel voorop."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-006",
    "position": "agree",
    "explanation": "Wil wettelijke doelen naleven."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-006",
    "position": "disagree",
    "explanation": "Verzet zich tegen gedwongen krimp."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-006",
    "position": "disagree",
    "explanation": "Wil soepeler stikstofbeleid."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-006",
    "position": "agree",
    "explanation": "Legt nadruk op klimaat en biodiversiteit."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-006",
    "position": "agree",
    "explanation": "Wil forse krimp veestapel."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-006",
    "position": "agree",
    "explanation": "Wil strikte aanpak voor natuur."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-006",
    "position": "agree",
    "explanation": "Ziet stikstofaanpak als noodzakelijk."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-006",
    "position": "disagree",
    "explanation": "Wil boeren ontzien."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-006",
    "position": "agree",
    "explanation": "Zoekt balans maar houdt vast aan doelen."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-006",
    "position": "disagree",
    "explanation": "Vraagt meer ruimte voor boeren."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-006",
    "position": "agree",
    "explanation": "Steunt natuur- en klimaatdoelen."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Wil bouwtempo verhogen met regie."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Pleiten voor landelijke woonaanpak."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Zoekt sterkere rijksregie."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-007",
    "position": "neutral",
    "explanation": "Wil regio inspraak houden."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Zoekt doorbraak in woningbouw."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Pleit voor landelijke woonagenda."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Wil betaalbaar en duurzaam bouwen."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Steunt landelijke regie op wonen."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Wil stevige rijksaanpak."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Zoekt versnelling sociale woningbouw."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Wil rijksregie voor betaalbaar wonen."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-007",
    "position": "neutral",
    "explanation": "Hecht aan lokale autonomie."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-007",
    "position": "agree",
    "explanation": "Wil actie tegen woningnood."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-008",
    "position": "disagree",
    "explanation": "Wil investeringsklimaat beschermen."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Streeft naar eerlijkere vermogensbelasting."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Zoekt herverdeling met oog voor midden."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-008",
    "position": "neutral",
    "explanation": "Wil lasten voor mkb beperken."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-008",
    "position": "disagree",
    "explanation": "Wil lasten op kapitaal laag houden."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Pleit voor progressieve vermogensbelasting."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Wil vermogen zwaarder belasten."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Zoekt eerlijkere verdeling van kapitaalinkomen."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Wil vermogens zwaarder belasten."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Wil grote vermogens mee laten betalen."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Zoekt rechtvaardige lastenverdeling."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-008",
    "position": "neutral",
    "explanation": "Zoekt balans tussen rechtvaardigheid en economie."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-008",
    "position": "agree",
    "explanation": "Wil vermogen meer belasten."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-009",
    "position": "disagree",
    "explanation": "Hecht aan representatieve democratie."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-009",
    "position": "disagree",
    "explanation": "Voorkeur voor parlementaire besluitvorming."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-009",
    "position": "neutral",
    "explanation": "Staat open voor referenda na zorgvuldige weging."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-009",
    "position": "agree",
    "explanation": "Wil burgers directer laten meepraten."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-009",
    "position": "agree",
    "explanation": "Ziet referenda als democratische aanvulling."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-009",
    "position": "disagree",
    "explanation": "Verkiest deliberatieve vormen."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-009",
    "position": "agree",
    "explanation": "Steunt directe democratie."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-009",
    "position": "disagree",
    "explanation": "Legt nadruk op andere vernieuwing."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-009",
    "position": "agree",
    "explanation": "Pleit voor bindend referendum."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-009",
    "position": "agree",
    "explanation": "Wil bevolking direct laten stemmen."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-009",
    "position": "disagree",
    "explanation": "Wil zorgvuldige representatieve besluitvorming."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-009",
    "position": "disagree",
    "explanation": "Hecht aan parlementaire democratie."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-009",
    "position": "agree",
    "explanation": "Ziet referenda als instrument voor burgers."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-010",
    "position": "neutral",
    "explanation": "Zoekt praktische Europese samenwerking."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-010",
    "position": "agree",
    "explanation": "Wil dieper Europees beleid."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-010",
    "position": "neutral",
    "explanation": "Steunt samenwerking met stevige nationale controle."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-010",
    "position": "disagree",
    "explanation": "Wil minder Brusselse bemoeienis."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-010",
    "position": "disagree",
    "explanation": "Verzet zich tegen verdere integratie."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-010",
    "position": "agree",
    "explanation": "Is uitgesproken pro-Europees."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-010",
    "position": "neutral",
    "explanation": "Steunt EU voor klimaat, maar kritisch op landbouw."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-010",
    "position": "agree",
    "explanation": "Wil EU-verdieping voor grote dossiers."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-010",
    "position": "disagree",
    "explanation": "Wil minder macht naar Brussel."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-010",
    "position": "disagree",
    "explanation": "Is tegen Europese verdieping."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-010",
    "position": "neutral",
    "explanation": "Zoekt samenwerking met subsidiariteit."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-010",
    "position": "disagree",
    "explanation": "Waakt voor overdracht van soevereiniteit."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-010",
    "position": "neutral",
    "explanation": "Steunt EU waar het rechten versterkt."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Wil grip op arbeidsmigratie."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-011",
    "position": "neutral",
    "explanation": "Wil misstanden aanpakken zonder harde plafonds."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Zoekt sectorplafonds voor draagkracht."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Wil regulering om druk op regio te beperken."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Pleit voor quota en strengere regels."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-011",
    "position": "disagree",
    "explanation": "Waarschuwt voor inperking vrij verkeer."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Wil bescherming arbeidsmigranten en beperking misbruik."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-011",
    "position": "disagree",
    "explanation": "Wil Europese arbeidsmobiliteit behouden."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Wil misstanden hard aanpakken."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Wil arbeidsmigratie fors beperken."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Zoekt strakkere regels en betere huisvesting."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-011",
    "position": "agree",
    "explanation": "Wil beheersbare arbeidsmigratie."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-011",
    "position": "disagree",
    "explanation": "Verzet zich tegen harde plafonds."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-012",
    "position": "disagree",
    "explanation": "Wil studievoordelen gericht en betaalbaar houden."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-012",
    "position": "agree",
    "explanation": "Wil toegankelijk hoger onderwijs."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-012",
    "position": "neutral",
    "explanation": "Weegt betaalbaarheid en toegankelijkheid."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-012",
    "position": "neutral",
    "explanation": "Wil lasten beperken maar vraagt dekking."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-012",
    "position": "disagree",
    "explanation": "Verkiest investeren in kwaliteit en selectie."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-012",
    "position": "agree",
    "explanation": "Pleit voor brede toegang tot onderwijs."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-012",
    "position": "agree",
    "explanation": "Wil schulden van studenten beperken."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-012",
    "position": "agree",
    "explanation": "Zet in op toegankelijk onderwijs."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-012",
    "position": "agree",
    "explanation": "Wil studieschulden terugdringen."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-012",
    "position": "agree",
    "explanation": "Steunt lagere lasten voor studenten."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-012",
    "position": "neutral",
    "explanation": "Zoekt balans tussen steun en dekking."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-012",
    "position": "disagree",
    "explanation": "Benadrukt eigen verantwoordelijkheid."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-012",
    "position": "agree",
    "explanation": "Wil onderwijs toegankelijker maken."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-013",
    "position": "disagree",
    "explanation": "Vreest schade voor industrie."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-013",
    "position": "agree",
    "explanation": "Wil versnelling van klimaatbeleid."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-013",
    "position": "neutral",
    "explanation": "Zoekt balans tussen klimaat en economie."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-013",
    "position": "disagree",
    "explanation": "Beschermt industrie en landbouw."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-013",
    "position": "disagree",
    "explanation": "Wil lagere lasten voor bedrijven."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-013",
    "position": "agree",
    "explanation": "Pleit voor strenge normen."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-013",
    "position": "agree",
    "explanation": "Wil stevige CO2-prijsvorming."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-013",
    "position": "agree",
    "explanation": "Ziet industrie als sleutel voor transitie."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-013",
    "position": "agree",
    "explanation": "Wil industrie vergroenen met stevige normen."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-013",
    "position": "disagree",
    "explanation": "Verzet zich tegen hogere klimaatheffingen."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-013",
    "position": "agree",
    "explanation": "Legt nadruk op rentmeesterschap."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-013",
    "position": "neutral",
    "explanation": "Weegt klimaat en economische positie."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-013",
    "position": "agree",
    "explanation": "Wil klimaatrechtvaardigheid voorop."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-014",
    "position": "disagree",
    "explanation": "Wil Schiphol als mainport behouden."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-014",
    "position": "agree",
    "explanation": "Zoekt krimp voor klimaat en leefomgeving."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-014",
    "position": "neutral",
    "explanation": "Weegt bereikbaarheid en milieu af."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-014",
    "position": "disagree",
    "explanation": "Wil economische schade voorkomen."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-014",
    "position": "disagree",
    "explanation": "Vindt krimp schadelijk voor economie."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-014",
    "position": "agree",
    "explanation": "Ziet krimp als onderdeel klimaatbeleid."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-014",
    "position": "agree",
    "explanation": "Wil forse reductie luchtvaart."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-014",
    "position": "agree",
    "explanation": "Wil beperkingen op groei luchtvaart."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-014",
    "position": "agree",
    "explanation": "Stelt leefbaarheid bewoners voorop."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-014",
    "position": "disagree",
    "explanation": "Wil luchtvaart overeind houden."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-014",
    "position": "neutral",
    "explanation": "Zoekt balans tussen bereikbaarheid en leefklimaat."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-014",
    "position": "disagree",
    "explanation": "Wil bereikbaarheid en economie beschermen."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-014",
    "position": "neutral",
    "explanation": "Staat open voor beperking met oog voor banen."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-015",
    "position": "disagree",
    "explanation": "Vreest dat bevriezen investeringen remt."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-015",
    "position": "agree",
    "explanation": "Wil huurders versneld beschermen."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-015",
    "position": "neutral",
    "explanation": "Zoekt maatwerk voor gespannen markten."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-015",
    "position": "neutral",
    "explanation": "Wil maatwerk en stimulans voor bouw."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-015",
    "position": "disagree",
    "explanation": "Pleit voor marktwerking in huur."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-015",
    "position": "agree",
    "explanation": "Wil huurders tijdelijk beschermen."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-015",
    "position": "agree",
    "explanation": "Steunt maatregelen tegen hoge huren."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-015",
    "position": "agree",
    "explanation": "Wil betaalbaarheid garanderen."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-015",
    "position": "agree",
    "explanation": "Staat pal voor huurders."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-015",
    "position": "agree",
    "explanation": "Wil huurders ontzien."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-015",
    "position": "agree",
    "explanation": "Steunt tijdelijke huurstop."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-015",
    "position": "disagree",
    "explanation": "Hecht aan markt en investeringen."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-015",
    "position": "agree",
    "explanation": "Wil directe bescherming huurders."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-016",
    "position": "neutral",
    "explanation": "Zoekt balans tussen vrijheid en gelijkheid."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-016",
    "position": "neutral",
    "explanation": "Weegt grondrechten en gelijke behandeling."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-016",
    "position": "agree",
    "explanation": "Wil levensbeschouwelijke vrijheid waarborgen."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-016",
    "position": "agree",
    "explanation": "Hecht aan ruimte voor levensbeschouwing."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-016",
    "position": "neutral",
    "explanation": "Steunt vrijheid maar wijst misbruik af."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-016",
    "position": "disagree",
    "explanation": "Vreest aantasting gelijkheidsbeginsel."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-016",
    "position": "disagree",
    "explanation": "Wil gelijke behandeling boven bijzondere positie."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-016",
    "position": "disagree",
    "explanation": "Legt nadruk op scheiding tussen kerk en staat."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-016",
    "position": "neutral",
    "explanation": "Wil grondrechten borgen zonder uitzonderingen."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-016",
    "position": "disagree",
    "explanation": "Wil religieuze privileges beperken."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-016",
    "position": "agree",
    "explanation": "Beschermt vrijheid van onderwijs en zorg."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-016",
    "position": "agree",
    "explanation": "Ziet religieuze vrijheid als kernwaarde."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-016",
    "position": "agree",
    "explanation": "Wil extra bescherming tegen uitsluiting."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-017",
    "position": "neutral",
    "explanation": "Wil aanpak discriminatie met oog voor uitvoerbaarheid."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-017",
    "position": "agree",
    "explanation": "Pleiten voor krachtige antidiscriminatie."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-017",
    "position": "agree",
    "explanation": "Wil handhaving versterken."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-017",
    "position": "disagree",
    "explanation": "Vreest groei van bureaucratie."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-017",
    "position": "disagree",
    "explanation": "Ziet risico op bevooroordeelde aanpak."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-017",
    "position": "agree",
    "explanation": "Wil nationale coördinatie."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-017",
    "position": "agree",
    "explanation": "Steunt stevige bestrijding van discriminatie."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-017",
    "position": "agree",
    "explanation": "Zet in op nationale regie."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-017",
    "position": "agree",
    "explanation": "Wil discriminatie hard aanpakken."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-017",
    "position": "disagree",
    "explanation": "Verzet zich tegen extra bevoegdheden."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-017",
    "position": "agree",
    "explanation": "Wil discriminatie actief bestrijden."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-017",
    "position": "neutral",
    "explanation": "Weegt zorgvuldigheid en uitvoering."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-017",
    "position": "agree",
    "explanation": "Maakt antidiscriminatie tot speerpunt."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-018",
    "position": "neutral",
    "explanation": "Staat open voor contracten naast regels."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-018",
    "position": "neutral",
    "explanation": "Wil prestaties koppelen aan duidelijke doelen."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-018",
    "position": "agree",
    "explanation": "Zoekt langjarige zekerheid voor boeren."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-018",
    "position": "agree",
    "explanation": "Ziet contracten als alternatief voor dwang."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-018",
    "position": "agree",
    "explanation": "Prefereert vrijwillige afspraken."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-018",
    "position": "disagree",
    "explanation": "Wil bindende normen vanuit de overheid."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-018",
    "position": "disagree",
    "explanation": "Vindt contracten te vrijblijvend."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-018",
    "position": "agree",
    "explanation": "Steunt gebiedsgerichte afspraken."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-018",
    "position": "neutral",
    "explanation": "Wil eerlijke beloning maar ook stevige doelen."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-018",
    "position": "agree",
    "explanation": "Wil boeren perspectief bieden."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-018",
    "position": "agree",
    "explanation": "Geef boeren zekerheid met vergoedingen."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-018",
    "position": "agree",
    "explanation": "Pleiten voor vrijwillige akkoorden."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-018",
    "position": "neutral",
    "explanation": "Staat open voor afspraken mits eerlijk."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-019",
    "position": "neutral",
    "explanation": "Wil opvang maar bewaakt draagkracht."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-019",
    "position": "agree",
    "explanation": "Legt nadruk op internationale solidariteit."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-019",
    "position": "neutral",
    "explanation": "Zoekt balans tussen solidariteit en draagvlak."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-019",
    "position": "disagree",
    "explanation": "Wil beperking vanwege druk op gemeenten."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-019",
    "position": "disagree",
    "explanation": "Wil vooral opvang in regio."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-019",
    "position": "agree",
    "explanation": "Staat voor ruimhartige opvang."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-019",
    "position": "agree",
    "explanation": "Wil bescherming voor oorlogsvluchtelingen."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-019",
    "position": "agree",
    "explanation": "Benadrukt Europese solidariteit."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-019",
    "position": "agree",
    "explanation": "Zet in op menselijke opvang."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-019",
    "position": "disagree",
    "explanation": "Weerstaat verdere opvang."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-019",
    "position": "agree",
    "explanation": "Ziet opvang als morele plicht."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-019",
    "position": "neutral",
    "explanation": "Steunt opvang maar let op draagkracht."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-019",
    "position": "agree",
    "explanation": "Wil vluchtelingen ruimhartig ondersteunen."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-020",
    "position": "neutral",
    "explanation": "Pleiten voor regels maar ook innovatie."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-020",
    "position": "agree",
    "explanation": "Wil digitale macht inperken."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-020",
    "position": "agree",
    "explanation": "Ziet toezicht als onderdeel van goed bestuur."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-020",
    "position": "neutral",
    "explanation": "Wil ondernemersruimte en bescherming."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-020",
    "position": "disagree",
    "explanation": "Ziet EU-regels als risico voor economie."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-020",
    "position": "agree",
    "explanation": "Pleit voor Europese tech-regels."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-020",
    "position": "agree",
    "explanation": "Wil strenge regels op data en AI."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-020",
    "position": "agree",
    "explanation": "Zet in op digitale rechten."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-020",
    "position": "agree",
    "explanation": "Wil techreuzen aanpakken."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-020",
    "position": "disagree",
    "explanation": "Wil nationale regie en minder EU."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-020",
    "position": "agree",
    "explanation": "Ziet noodzaak van regulering."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-020",
    "position": "neutral",
    "explanation": "Zoekt balans tussen innovatie en regels."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-020",
    "position": "agree",
    "explanation": "Wil burgers beschermen tegen machtsmisbruik."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-021",
    "position": "agree",
    "explanation": "Wil minder regels voor ondernemers."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-021",
    "position": "disagree",
    "explanation": "Wil juist sturen op herverdeling."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-021",
    "position": "agree",
    "explanation": "Zoekt eenvoud en productiviteit."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-021",
    "position": "agree",
    "explanation": "Wil lastenverlichting voor mkb."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-021",
    "position": "agree",
    "explanation": "Benadrukt ondernemersklimaat."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-021",
    "position": "neutral",
    "explanation": "Wil hervormen maar met sociale randvoorwaarden."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-021",
    "position": "disagree",
    "explanation": "Stelt duurzaamheid boven deregulering."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-021",
    "position": "neutral",
    "explanation": "Wil innovatie met oog voor klimaat."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-021",
    "position": "disagree",
    "explanation": "Ziet risico op race naar beneden."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-021",
    "position": "agree",
    "explanation": "Wil lastenverlichting voor bedrijven."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-021",
    "position": "neutral",
    "explanation": "Zoekt balans tussen ruimte en regels."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-021",
    "position": "agree",
    "explanation": "Steunt minder regeldruk."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-021",
    "position": "neutral",
    "explanation": "Wil eenvoud zonder sociale achteruitgang."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-022",
    "position": "disagree",
    "explanation": "Wil exportpositie behouden."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-022",
    "position": "agree",
    "explanation": "Pleit voor versnelling naar kringlooplandbouw."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-022",
    "position": "neutral",
    "explanation": "Zoekt geleidelijke transitie."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-022",
    "position": "disagree",
    "explanation": "Verzet zich tegen harde omschakeltermijnen."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-022",
    "position": "disagree",
    "explanation": "Wil huidige schaal behouden."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-022",
    "position": "agree",
    "explanation": "Wil landbouw verduurzamen."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-022",
    "position": "agree",
    "explanation": "Zet in op snelle omschakeling."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-022",
    "position": "agree",
    "explanation": "Steunt natuurinclusieve landbouw."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-022",
    "position": "agree",
    "explanation": "Wil waardevolle kringlooplandbouw."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-022",
    "position": "disagree",
    "explanation": "Beschermt exportmodel."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-022",
    "position": "agree",
    "explanation": "Zoekt toekomstbestendige landbouw."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-022",
    "position": "neutral",
    "explanation": "Wil transitie maar met ruimte voor ondernemers."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-022",
    "position": "neutral",
    "explanation": "Steunt verduurzaming met draagvlak."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Wil veiligheidsdiensten versterken."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Combineert veiligheid met waarborgen."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Ziet noodzaak extra veiligheidsmaatregelen."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-023",
    "position": "neutral",
    "explanation": "Steunt aanpak maar waakt voor privacy."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Wil diensten meer slagkracht geven."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Steunt Europese en nationale weerbaarheid."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-023",
    "position": "disagree",
    "explanation": "Waarschuwt voor inbreuk op privacy."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Wil diensten moderniseren met toezicht."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-023",
    "position": "neutral",
    "explanation": "Wil veiligheid met stevige controle."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Pleiten voor hardere veiligheidsaanpak."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Steunt diensten met waarborgen."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-023",
    "position": "agree",
    "explanation": "Wil Nederland weerbaar maken."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-023",
    "position": "neutral",
    "explanation": "Wil proportionaliteit bewaken."
  },
  {
    "party_id": "party-vvd",
    "statement_id": "statement-024",
    "position": "neutral",
    "explanation": "Wil kwaliteit verbeteren binnen budget."
  },
  {
    "party_id": "party-gl-pvda",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Wil investeren in leraren en klassen."
  },
  {
    "party_id": "party-nsc",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Ziet kleinere klassen als basis voor kansengelijkheid."
  },
  {
    "party_id": "party-bbb",
    "statement_id": "statement-024",
    "position": "neutral",
    "explanation": "Steunt kleinschaligheid, zoekt dekking."
  },
  {
    "party_id": "party-ja21",
    "statement_id": "statement-024",
    "position": "neutral",
    "explanation": "Legt focus op basisvaardigheden."
  },
  {
    "party_id": "party-volt",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Wil kleinschalig en inclusief onderwijs."
  },
  {
    "party_id": "party-pvdd",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Steunt extra leraren en kleinere klassen."
  },
  {
    "party_id": "party-d66",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Zet onderwijsinvesteringen centraal."
  },
  {
    "party_id": "party-sp",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Wil kleinere klassen voor beter onderwijs."
  },
  {
    "party_id": "party-pvv",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Steunt extra investeringen in onderwijs."
  },
  {
    "party_id": "party-cu",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Wil onderwijsprofessionals ruimte geven."
  },
  {
    "party_id": "party-sgp",
    "statement_id": "statement-024",
    "position": "neutral",
    "explanation": "Weegt kwaliteit en financiële houdbaarheid."
  },
  {
    "party_id": "party-denk",
    "statement_id": "statement-024",
    "position": "agree",
    "explanation": "Wil gelijke kansen via kleinere klassen."
  }
];

module.exports = { parties, statements, partyPositions };
