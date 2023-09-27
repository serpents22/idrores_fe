<template>
	<div id="app">
		<Qalendar 
			class="bg-white rounded-sm"
			:events="events"
			:config="config"
		/>
	</div>
</template>
<script>
	import { Qalendar } from "qalendar";
	import "qalendar/dist/style.css";

	export default {
		name: 'app',
		data() {
			return {
				events: [
					{
						title: "Meeting with Dora",
						with: "Albert Einstein",
						time: { start: "2023-08-27 04:52", end: "2023-08-27 05:37" },
						color: "green",
						isEditable: true,
						id: "de471c78cb5c",
						description:
						"Think of me as Yoda. Only instead of being little and green, I wear suites and I'm awesome.",
					},
					{
						title: "Advanced algebra",
						with: "Pheobe Buffay",
						time: { start: "2023-08-28 20:05", end: "2023-08-28 21:35" },
						colorScheme: "sports",
						isEditable: true,
						id: "6d3c0980a5cf",
						description:
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
					},
					{
						title: "Break",
						with: "Marshall Eriksen",
						time: { start: "2023-08-29 22:10", end: "2023-08-29 22:55" },
						colorScheme: "meetings",
						isEditable: true,
						id: "9f1b209982f1",
						location: "Zoom",
					},
				],
				config: {
					week: {
					// Takes the value 'sunday' or 'monday'
					// However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
					startsOn: 'monday',
					// Takes the values 5 or 7.
					nDays: 7,
					// Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
					// This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
					scrollToHour: 23,
					},
					locale: 'en-US',
					// see configuration section
				}
			}
		},
		components: {
			Qalendar,
		},
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
		}
	}
</script>
<style>

</style>