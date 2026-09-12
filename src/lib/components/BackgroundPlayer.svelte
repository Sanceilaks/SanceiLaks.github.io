<script lang="ts">
	import { onMount } from 'svelte';
	import { loadYoutubeApi, parseVideoId } from '$lib/youtube';

	let { player = $bindable(null) }: { player: YT.Player | null } = $props();

	onMount(() => {
		let instance: YT.Player | undefined;
		let cancelled = false;

		loadYoutubeApi().then((api) => {
			if (cancelled) return;
			const videoId = parseVideoId(window.location.hash);
			instance = new api.Player('player', {
				videoId,
				playerVars: {
					loop: 1,
					controls: 0,
					autoplay: 0,
					playlist: videoId
				},
				events: {
					onReady(event) {
						player = event.target;
					}
				}
			});
		});

		return () => {
			cancelled = true;
			player = null;
			instance?.destroy();
		};
	});
</script>

<div id="player"></div>
