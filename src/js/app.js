const chartjsContainer = document.querySelector(".barChart.chartjs");
const chartjsCanvas = chartjsContainer.querySelector("canvas");
const barColors = ['#F81B1B','#15ADF5','#03D216'];
const chartjsBarChart = new Chart(chartjsCanvas, {
	type: "bar",
	data: {
		labels: ["Amsterdam", "Leiden", "Utrecht"],
		datasets: [{
			label: "Populatie",
			data: [2000000, 900000, 120000],
			backgroundColor: barColors,
		    borderColor: barColors,
		    borderWidth: 1
		}]
	}
});


const d3jsContainer = document.querySelector(".barChart.d3js");
const d3jsData = [{
	"city": "Amsterdam",
	"population": 2000000,
	"color": "#F81B1B"
}, {
	"city": "Leiden",
	"population": 900000,
	"color": "#15ADF5"
}, {
	"city": "Utrecht",
	"population": 120000,
	"color": "#03D216"
}];

console.log(d3jsData)

const d3jsSvg = d3.select("svg");

const width = +d3jsSvg.attr("width");
const height = +d3jsSvg.attr("height");

const render = (data) => {
	const xValue = (obj) => obj.city;
	const yValue = (obj) => obj.population;

	const margin = {
		top: 50,
		right: 40,
		bottom: 70,
		left: 150
	};

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = d3.scaleBand()
					.domain(data.map(xValue))
					.range([0, innerWidth])
					.padding(0.2);

	const yScale = d3.scaleLinear()
					.domain([0, d3.max(data, yValue)])
					.range([innerHeight, 0]);

	const group = d3jsSvg.append("g")
					.attr("transform", `translate(${margin.left}, ${margin.top})`);

	const xAxis = group.append("g")
		.attr("transform", `translate(0, ${innerHeight})`)
		.call(d3.axisBottom(xScale));

	const yAxis = group.append("g")
		.call(d3.axisLeft(yScale)
			//.tickFormat(d => console.log(d))
		)
		.append("text")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("font-size", "20px")
		.attr("text-anchor", "end")
		.text("value");


	xAxis.append("text")
					.attr("fill", "#635F5D")
					.attr("y", 60)
					.attr("x", innerWidth / 2)
					.text("Steden");

	group.selectAll("rect")
		.data(data)
		.enter().append("rect")
		.attr("x", obj => xScale(xValue(obj)))
		.attr("y", obj => yScale(yValue(obj)))
		.attr("aria-label", obj => `${obj.city}: ${obj.population}`)
		.attr("title", obj => `${obj.city}: ${obj.population}`)
		.attr("width", xScale.bandwidth())
		.attr("height", obj => innerHeight - yScale(yValue(obj)))
		.attr("fill", obj => obj.color);
}

render(d3jsData);