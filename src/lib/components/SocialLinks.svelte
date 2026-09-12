<script lang="ts">
	import { links, type LinkId } from '$lib/links';
	import discord from '$lib/assets/discord.svg?url';
	import github from '$lib/assets/github.svg?url';
	import telegram from '$lib/assets/telegram.svg?url';
	import vk from '$lib/assets/vk.svg?url';

	const icons: Record<LinkId, string> = { vk, telegram, discord, github };

	let iconSrc = $state('');
	let iconActive = $state(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	function enter(id: LinkId) {
		iconSrc = icons[id];
		timer = setTimeout(() => {
			iconActive = true;
		}, 200);
	}

	function leave() {
		if (timer !== null) clearTimeout(timer);
		iconActive = false;
	}
</script>

<div class="content">
	<img class="content-link-icon" class:active={iconActive} src={iconSrc || undefined} alt="" />
	{#each links as link (link.id)}
		<a
			data-id={link.id}
			href={link.href}
			target="_blank"
			rel="noreferrer"
			class="content-link"
			onmouseenter={() => enter(link.id)}
			onmouseout={leave}
			onfocus={() => enter(link.id)}
			onblur={leave}
		>
			{link.label}
		</a>
	{/each}
</div>

<style>
	.content {
		position: relative;

		flex: 1;

		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		row-gap: 10px;

		user-select: none;
		-webkit-user-select: none;
	}

	.content-link-icon {
		width: 192px;
		aspect-ratio: 1;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);

		opacity: 0;
		pointer-events: none;
		transition:
			opacity var(--default-transition-duration),
			transform var(--default-transition-duration);
	}

	.content-link-icon.active {
		opacity: 0.3;
		transform: translate(-50%, -50%) scale(1);
	}

	.content-link {
		color: #fff;
		font-size: 32px;
		font-weight: 600;

		transition:
			color var(--default-transition-duration),
			transform var(--default-transition-duration);
	}

	.content-link:hover {
		color: #007e39;
		transform: scale(0.9);
	}

	@media (max-width: 768px) {
		.content-link-icon {
			width: 128px;
		}

		.content-link {
			font-size: 24px;
		}
	}
</style>
