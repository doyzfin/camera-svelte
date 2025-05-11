<script>
	import '../app.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	.app {
		display: flex;

		min-height: 100vh;
	}

	main {
		@apply bg-white;
	}
</style>
