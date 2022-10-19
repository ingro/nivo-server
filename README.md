# Nivo API Server

Versione riveduta e corretta dell'esempio di Nivo API Server.

## Utilizzo

Dopo aver installato le dipendenze lanciare il server di sviluppo con il comando `yarn dev`. Il server sarà raggiungibile all'indirizzo [http://localhost:3030/nivo](http://localhost:3030/nivo) dove vengono visualizzati degli esempi.

Per generare un file sarà necessario invece effettuare un POST all'url relativo alla tipologia di Chart, ad esempio per un Pie chart l'url sarà *http://localhost:3030/nivo/charts/pie*.

Nel payload vanno specificati le configurazioni del chart e i dati da visualizzare (vedi per esempio apposita cartella /fixtures).

La risposta a questa chiamata riporterà l'id del file e il suo url, ad esempio:

```
{
    "id": "1dee277a-85e8-471b-a39b-c4987153c9dd",
    "url": "http://localhost:3030/nivo/r/1dee277a-85e8-471b-a39b-c4987153c9dd.svg"
}
```
A questo punto sarà sufficiente richiamere l'url per ottenere il file svg del grafico generato (il rendering viene effetuato solo la prima volta, poi viene servito il file generato).

Per eseguire il server in modalità produzione utilizzare il comando `yarn start`.

## Charts supportati:

Sono al momento supportate le seguenti tipologie di charts:

- Bar
- CirclePacking
- Calendar
- Chord
- HeatMap
- Line
- Pie
- Radar
- Sankey
- Sunburst
- TreeMap

Per maggiori informazioni su questi chart fare riferimento alla [documentazione ufficiale di Nivo](https://nivo.rocks/components).