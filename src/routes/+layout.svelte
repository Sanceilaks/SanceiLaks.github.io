<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>voidptr_t</title>
	<link rel="icon" href="/logo.png" />
</svelte:head>

{@render children()}
