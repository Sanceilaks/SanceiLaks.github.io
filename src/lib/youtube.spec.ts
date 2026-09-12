import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_VIDEO_ID, YOUTUBE_API_SRC, loadYoutubeApi, parseVideoId } from './youtube';

describe('parseVideoId', () => {
	it('returns the default id when the hash is empty', () => {
		expect(parseVideoId('')).toBe(DEFAULT_VIDEO_ID);
	});

	it('returns the default id when the hash is not an 11-character video id', () => {
		expect(parseVideoId('#nope')).toBe(DEFAULT_VIDEO_ID);
		expect(parseVideoId('#short')).toBe(DEFAULT_VIDEO_ID);
		expect(parseVideoId('dQw4w9WgXcQ')).toBe(DEFAULT_VIDEO_ID);
	});

	it('extracts an 11-character YouTube id from the hash', () => {
		expect(parseVideoId('#dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
		expect(parseVideoId('#dQw4w9WgXcQxxx')).toBe('dQw4w9WgXcQ');
	});

	it('accepts underscores and hyphens in the id', () => {
		expect(parseVideoId('#aB3-_9XyZ12')).toBe('aB3-_9XyZ12');
	});

	it('keeps the original default video', () => {
		expect(DEFAULT_VIDEO_ID).toBe('8GlR5nRvmJc');
	});
});

describe('loadYoutubeApi', () => {
	it('resolves via YT.ready when the API is already present', async () => {
		const YT = {
			Player: class {},
			ready(cb: () => void) {
				cb();
			}
		};
		const host = { YT, document: {} } as unknown as import('./youtube').YoutubeHost;

		await expect(loadYoutubeApi(host)).resolves.toBe(YT);
	});

	it('injects the iframe API script and resolves onYouTubeIframeAPIReady', async () => {
		const script = { src: '' };
		const appended: unknown[] = [];
		const host = {
			document: {
				querySelector: () => null,
				createElement: vi.fn(() => script),
				head: {
					appendChild(node: unknown) {
						appended.push(node);
					}
				}
			}
		} as unknown as import('./youtube').YoutubeHost;

		const pending = loadYoutubeApi(host);

		expect(host.document.createElement).toHaveBeenCalledWith('script');
		expect(script.src).toBe(YOUTUBE_API_SRC);
		expect(appended).toEqual([script]);

		const YT = { Player: class {} };
		(host as { YT: unknown }).YT = YT;
		host.onYouTubeIframeAPIReady?.();

		await expect(pending).resolves.toBe(YT);
	});

	it('does not inject a second script if one is already on the page', async () => {
		const host = {
			document: {
				querySelector: vi.fn(() => ({})),
				createElement: vi.fn(),
				head: { appendChild: vi.fn() }
			}
		} as unknown as import('./youtube').YoutubeHost;

		const pending = loadYoutubeApi(host);
		expect(host.document.createElement).not.toHaveBeenCalled();

		const YT = { Player: class {} };
		(host as { YT: unknown }).YT = YT;
		host.onYouTubeIframeAPIReady?.();
		await expect(pending).resolves.toBe(YT);
	});
});
