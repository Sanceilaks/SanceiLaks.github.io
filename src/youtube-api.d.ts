export {};

declare global {
	namespace YT {
		interface PlayerVars {
			loop?: 0 | 1;
			controls?: 0 | 1;
			autoplay?: 0 | 1;
			playlist?: string;
		}

		interface PlayerOptions {
			videoId: string;
			playerVars?: PlayerVars;
			events?: {
				onReady?: (event: { target: Player }) => void;
			};
		}

		class Player {
			constructor(element: string | HTMLElement, options: PlayerOptions);
			playVideo(): void;
			setVolume(volume: number): void;
			destroy(): void;
		}

		function ready(callback: () => void): void;
	}

	interface Window {
		YT?: typeof YT;
		onYouTubeIframeAPIReady?: () => void;
	}
}
