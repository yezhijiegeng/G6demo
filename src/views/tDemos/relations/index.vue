<template>
	<div style="width:100%;height:100%;">
		<div>关系图谱</div>
		<div id="container" class="w-full h-full"></div>
	</div>
</template>

<script>
import { Graph } from "@/assets/js/g6V5.min";

export default {
	data() {
		return {};
	},

	mounted() {

		// 色板
		const graphData = {
			"nodes": [
				{
					"id": "0",
					'name': "犬夜叉关系图谱",
				},
				{
					"id": "1"
				},
				{
					"id": "2"
				},
				{
					"id": "3"
				},
				{
					"id": "4",
					"combo": "A"
				},
				{
					"id": "5",
					"combo": "B"
				},
				{
					"id": "6",
					"combo": "A"
				},
				{
					"id": "7",
					"combo": "C"
				},
				{
					"id": "8",
					"combo": "C"
				},
				{
					"id": "9",
					"combo": "A"
				},
				{
					"id": "10",
					"combo": "B"
				},
				{
					"id": "11",
					"combo": "B"
				}
			],
			"edges": [
				{
					"id": "edge-102",
					"source": "0",
					"target": "1"
				},
				{
					"id": "edge-161",
					"source": "0",
					"target": "2"
				},
				{
					"id": "edge-237",
					"source": "1",
					"target": "4"
				},
				{
					"id": "edge-253",
					"source": "0",
					"target": "3"
				},
				{
					"id": "edge-133",
					"source": "3",
					"target": "4"
				},
				{
					"id": "edge-320",
					"source": "2",
					"target": "5"
				},
				{
					"id": "edge-355",
					"source": "1",
					"target": "6"
				},
				{
					"id": "edge-823",
					"source": "1",
					"target": "7"
				},
				{
					"id": "edge-665",
					"source": "3",
					"target": "8"
				},
				{
					"id": "edge-884",
					"source": "3",
					"target": "9"
				},
				{
					"id": "edge-536",
					"source": "5",
					"target": "10"
				},
				{
					"id": "edge-401",
					"source": "5",
					"target": "11"
				}
			],
			"combos": [
				{
					"id": "A",
					"style": {
						"type": "rect"
					}
				},
				{
					"id": "B",
					"style": {
						"type": "rect"
					}
				},
				{
					"id": "C",
					"style": {
						"type": "rect"
					}
				}
			]
		};

		const graph = new Graph({
			container: 'container',
			// width:1000,
			// height:1000,
			autoFit: 'center',
			data: graphData,
			node: {
				type: 'rect',
				style: {
					size: [60, 30],
					radius: 8,
					labelText: (d) => d.name ? d.name : d.id,
					labelBackground: true,
					ports: [{ placement: 'top' }, { placement: 'bottom' }],
				},
				palette: {
					field: (d) => d.combo,
				},
			},
			edge: {
				type: 'cubic-vertical',
				style: {
					endArrow: true,
				},
			},
			combo: {
				type: 'rect',
				style: {
					radius: 8,
					labelText: (d) => d.id,
				},
			},
			layout: {
				type: 'antv-dagre',
				ranksep: 50,
				nodesep: 5,
				sortByCombo: true,
			},
			behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
		});

		graph.render();
	},
};
</script>
