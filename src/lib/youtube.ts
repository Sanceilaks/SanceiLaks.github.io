export const DEFAULT_VIDEO_ID = '8GlR5nRvmJc';
export const YOUTUBE_API_SRC = 'https://www.youtube.com/iframe_api';

export function parseVideoId(hash: string): string {
	const match = /#(?<id>[A-Za-z0-9_-]{11})/.exec(hash);
	return match?.groups?.id ?? DEFAULT_VIDEO_ID;
}

export type YoutubeHost = {
	YT?: typeof YT;
	onYouTubeIframeAPIReady?: () => void;
	document: Pick<Document, 'querySelector' | 'createElement'> & {
		head: Pick<ParentNode, 'appendChild'>;
	};
};

export function loadYoutubeApi(host: YoutubeHost = window): Promise<typeof YT> {
	if (host.YT?.ready) {
		return new Promise((resolve) => {
			host.YT!.ready(() => resolve(host.YT!));
		});
	}

	return new Promise((resolve) => {
		const previous = host.onYouTubeIframeAPIReady;
		host.onYouTubeIframeAPIReady = () => {
			previous?.();
			resolve(host.YT!);
		};

		if (!host.document.querySelector(`script[src="${YOUTUBE_API_SRC}"]`)) {
			const script = host.document.createElement('script') as HTMLScriptElement;
			script.src = YOUTUBE_API_SRC;
			host.document.head.appendChild(script);
		}
	});
}
