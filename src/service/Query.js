const endpointUrl = 'https://query.wikidata.org/sparql';

export default class Query {

	async isValidDate(dateString) {
		var regEx = /^\d{4}-\d{2}-\d{2}$/;
		if(!dateString.match(regEx)) return false;  // Invalid format
		var d = new Date(dateString);
		var dNum = d.getTime();
		if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
		return d.toISOString().slice(0,10) === dateString;
	}

    async fetchQuery(data) {
		
		let serieFilter, nameFilter, genreFilter, dateFromFilter, dateToFilter

		//Definition of filters
		if(data.novelSerie)
		serieFilter = `FILTER CONTAINS(?serie_label, "${data.novelSerie}")`
	
		if(data.novelName)
			nameFilter = `FILTER CONTAINS(?novel_label, "${data.novelName}")`
		
		if(data.novelGenre)
			genreFilter = `FILTER CONTAINS(?genre_label, "${data.novelGenre}")`
		
		if(data.publishDateFrom)
			dateFromFilter = `FILTER (?publicationDate >= "${data.publishDateFrom}"^^xsd:dateTime)`
		
		if(data.publishDateTo)
			dateToFilter = `FILTER (?publicationDate <= "${data.publishDateTo}"^^xsd:dateTime)`


		let sparqlQuery = `#Novelas según autor y con filtros
			SELECT distinct ?novel ?novel_label ?authorLabel (GROUP_CONCAT(?genre_label; SEPARATOR=" , ") as ?genres)  (MIN(?publicationDate) as ?firstPublication) ?serie_label
			WHERE
			{
			?novel  wdt:P31 ?novelType .
			?novelType wdt:P279* wd:Q47461344 .
			
			?author rdfs:label "${data.author}"@en .
			?novel wdt:P50 ?author ;
				   rdfs:label ?novel_label filter (lang(?novel_label) = "en") .

			OPTIONAL {
				?novel wdt:P136 ?genre .
				?genre rdfs:label ?genre_label filter (lang(?genre_label) = "en").
			}
			OPTIONAL {
				?novel wdt:P179 ?serie .
				?serie rdfs:label ?serie_label filter (lang(?serie_label) = "en").
			}
			
			OPTIONAL {
				?novel wdt:P577 ?publicationDate .
			}
			${data.novelName ? nameFilter : ""}
			${data.novelSerie ? serieFilter : ""}
			${data.novelGenre ? genreFilter : ""}
			${data.publishDateFrom ? dateFromFilter : ""}
			${data.publishDateTo ? dateToFilter : ""}
			
			SERVICE wikibase:label {
				bd:serviceParam wikibase:language "en" .
			}
			} group by ?novel ?novel_label ?authorLabel ?serie_label `;

		const fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}
