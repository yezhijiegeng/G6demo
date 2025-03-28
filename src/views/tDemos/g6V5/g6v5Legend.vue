<template>
	<div>
		<div id="container"></div>
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
			nodes: [
				{ id: 'node-1', style: { x: 280, y: 60, fill: '#E4504D', labelText: 'degree: 0' } },
				{ id: 'node-2-1', style: { x: 330, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
				{ id: 'node-2-2', style: { x: 230, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
				{ id: 'node-3-1', style: { x: 380, y: 220, fill: '#0f0', labelText: 'degree: 2' } },
				{ id: 'node-3-2', style: { x: 180, y: 220, fill: '#0f0', labelText: 'degree: 2' } },

				{
					id: 'degree引导',
					style: {
						x: 525,
						y: 110,
						fill: null,
						labelText: '这里可以修改degree ->',
						labelFontWeight: 700,
						labelFontSize: 10,
					},
				},
			],
			edges: [
				{ source: 'node-1', target: 'node-2-1' },
				{ source: 'node-1', target: 'node-2-2' },
				{ source: 'node-2-1', target: 'node-3-1' },
				{ source: 'node-2-2', target: 'node-3-2' },
			],
		};

		const graph = new Graph({
			container: "container",
			data: graphData,
			node: {
				type: "star",
			},
			edge: {
				type: 'line',
				style: {
					stroke: "lightgreen",
					fill: "orange",
					// startArrow: false,
					// endArrow: false,
				},
			},
			node: {
				style: { label: true, labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
				state: {
					custom: { fill: '#ffa940' },
				},
			},
			edge: {
				stroke: '#8b9baf',
				state: {
					custom: { stroke: '#ffa940' },
				},
			},
			behaviors: [
				{
					type: 'click-select',
					key: 'click-select',
					degree: 1, // 选中扩散范围
					state: 'active', // 选中的状态
					neighborState: 'neighborActive', // 相邻节点附着状态
					unselectedState: 'inactive', // 未选中节点状态
				},
			],

			plugins: [{ type: 'grid-line', size: 30 }],
			animation: true,
			// layout: {
			// 	type: "d3-force",
			// },
		});

		graph.render();
	},
};
</script>
