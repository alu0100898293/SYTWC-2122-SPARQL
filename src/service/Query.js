export default class Query {

    async fetchQuery() {
		let data = [
			{
				"novel": "0101010",
				"novelLabel": "Elantris",
				"authorLabel": "Brandon",
				"genres": "Fantasy",
				"firstPublication": "01-01-2018",
				"serie_label": "",
			}
		]
		/*const res = await fetch(`${URL}/${horarios}/${parada}`);
		const d = await res.json();
		console.log("gettin horarios");
		let arrrivalTime = [];
		d.sentido1.sort((a, b) => {
			if (parseInt(a.arrival_time) == parseInt(b.arrival_time)) {
				return parseInt(a.arrival_time.slice(3, 5)) - parseInt(b.arrival_time.slice(3, 5));
			}
			else {
				return parseInt(a.arrival_time) - parseInt(b.arrival_time);
			}
		});
		d.sentido2.sort((a_1, b_1) => {
			if (parseInt(a_1.arrival_time) == parseInt(b_1.arrival_time)) {
				return parseInt(a_1.arrival_time.slice(3, 5)) - parseInt(b_1.arrival_time.slice(3, 5));
			}
			else {
				return parseInt(a_1.arrival_time) - parseInt(b_1.arrival_time);
			}
		});
		for (let i = 0; i < d.sentido1.length; i++) {
			arrrivalTime.push(
				{
					"arrival_time1": d.sentido1[i].arrival_time,
					"arrival_time2": "-"
				}
			);
		}
		for (let i_1 = 0; i_1 < d.sentido2.length; i_1++) {
			(i_1 < d.sentido1.length) ? arrrivalTime[i_1].arrival_time2 = d.sentido2[i_1].arrival_time : arrrivalTime.push(
				{
					"arrival_time1": "-",
					"arrival_time2": d.sentido2[i_1].arrival_time
				}
			);
		}
		d.data = arrrivalTime;*/
		return data;
	}
}
