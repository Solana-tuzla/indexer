# Transformations layer

### Pitanja
- sta ja to pravim

- zasto to pravim

- koja je njegova uloga u sistemu

- sta sistem zahteva od mene

- kako mislim to da napravim

- koje su moje vizije za dalje (po pitanju scaleovanja, neke licne ideje...)

### Nesto malo o transformations modulu

On transformise solana blokove
Postoji par parametara koji nas interesuju unutar tih solana blokova 
Te parametre zelimo da uzmemo iz bloka i da ih transformisemo (ocistimo)
i loggujemo u terminalu

Prvi parametar koji nas interesuje je kako da iz bloka (skupa transakcija) izvucemo sve transakcije koje
su kreirale SPL tokene (hint: interactuje se sa Solana token programom - TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA)

Pocecu sa tim sto cu napraviti klasu cije metode (i privatne i public) za uneti blok vade transakcije koje su napravile SPL tokene