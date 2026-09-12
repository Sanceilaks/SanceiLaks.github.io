<script lang="ts">
	import BackgroundPlayer from '$lib/components/BackgroundPlayer.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	let player = $state<YT.Player | null>(null);
	let showPreloader = $state(true);

	function start() {
		player?.playVideo();
		player?.setVolume(25);
	}
</script>

<BackgroundPlayer bind:player />

<main>
	<SocialLinks />
	<Footer />
</main>

{#if showPreloader}
	<Preloader ready={player !== null} onstart={start} ondone={() => (showPreloader = false)} />
{/if}
