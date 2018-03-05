const height = 800;
const width = 1300;
const padding = 130;

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

const tooltip = d3.select('body')
  .append('div')
  .style('opacity', 0)
  .classed('tooltip', true);

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

svg.selectAll('text')
  .attr('font-size', '15px');

const setLegend = () => {
	svg.append('circle')
		.attr('r', 10)
    .attr('cx', width * 0.32)
    .attr('cy', height - padding / 2.5)
	  .attr('fill', 'blue');

	svg.append('circle')
		.attr('r', 10)
    .attr('cx', width * 0.57)
    .attr('cy', height - padding / 2.5)
	  .attr('fill', 'grey');

	svg.append('text')
	  .attr('text-anchor', 'left')
	  .attr('font-size', '1.2em')
	  .attr('transform', `translate(${width * 0.34},${height - padding / 2.6})`)
	  .text('Has Allegations');
	svg.append('text')
	  .attr('text-anchor', 'left')
	  .attr('font-size', '1.2em')
	  .attr('transform', `translate(${width * 0.59},${height - padding / 2.6})`)
	  .text('Has No Allegations');
};


const setHeaders = () => {
	svg.append('text')
		.attr('text-anchor', 'middle')
		.attr('font-size', '4em')
	  .attr('transform', `translate(${width / 2},${padding / 1.8})`)
	  .text('Doping Allegations');

	svg.append('text')
	  .attr('text-anchor', 'middle')
	  .attr('font-size', '1.5em')
	  .attr('transform', `translate(${width / 2},${padding/1.2})`)
	  .text('35 Fastest times up Alpe d\'Huez Normalized to 13.8km distance');

	svg.append('text')
	  .attr('text-anchor', 'middle')
	  .attr('font-size', '2.5em')
	  .attr('transform', `translate(${width / 2},${height - padding/1.7})`)
	  .text('Seconds Behind Fastest Time');

	svg.append('text')
	  .attr('text-anchor', 'middle')
	  .attr('font-size', '2.5em')
	  .attr('transform', `
	  	rotate(-90) 
	  	translate(${-height/2}, ${padding / 1.5})
	  `)
	  .text('Placing');
};

const axisConfig = (xScale, yScale) => {
	const yAxis = d3.axisLeft(yScale)
		.tickSize(-width + padding * 2)
		.tickSizeOuter(0);

	const xAxis = d3.axisBottom(xScale)
		.tickSize(-height + padding * 2)
		.tickSizeOuter(0);

	svg.append('g')
		.attr('transform', `translate(0, ${height - padding})`)
		.style('z-index', 1)
	  .call(xAxis);

	svg.append('g')
		.attr('transform', `translate(${padding}, 0)`)
		.style('z-index', -1)
	  .call(yAxis);
};

const circleConfig = () => {
	svg.selectAll('circle')
	  .on('mouseover', d => {
	  	tooltip
	  	  .style('opacity', 1)
	  	  .style('left', `${d3.event.x}px`)
	  	  .style('top', `${d3.event.y}px`)
	  	  .html(`
	  	  	<div id="tip-content">
		  	  	<p>Name: ${d.Name}</p>
		  	  	<p>Year: ${d.Year}, Time: ${d.Time}</p>
		  	  	<br>
		  	  	<p>${d.Doping || 'No doping allegations.'}</p>
	  	  	</div>
	  	  `);
	  })
	  .on('mouseout', () => {
	  	tooltip.style('opacity', 0);
	  });
}

const initializeY = data => {
	const timeMin = d3.min(data, d => d.Seconds);
	data.forEach(d => d.secondsBehind = d.Seconds - timeMin);
};
