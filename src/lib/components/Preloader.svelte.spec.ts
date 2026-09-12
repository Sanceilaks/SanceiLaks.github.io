import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Preloader from './Preloader.svelte';

describe('Preloader.svelte', () => {
	it('renders the original click me button', async () => {
		render(Preloader, { ready: false, onstart: () => {}, ondone: () => {} });

		await expect.element(page.getByRole('button', { name: 'click me' })).toBeVisible();
	});

	it('does nothing when clicked before the player is ready', async () => {
		const onstart = vi.fn();
		render(Preloader, { ready: false, onstart, ondone: () => {} });

		await page.getByRole('button', { name: 'click me' }).click();

		expect(onstart).not.toHaveBeenCalled();
		expect(document.querySelector('.preloader')?.classList.contains('active')).toBe(false);
	});

	it('starts the session and activates the overlay when ready', async () => {
		const onstart = vi.fn();
		render(Preloader, { ready: true, onstart, ondone: () => {} });

		await page.getByRole('button', { name: 'click me' }).click();

		expect(onstart).toHaveBeenCalledOnce();
		expect(document.querySelector('.preloader')?.classList.contains('active')).toBe(true);
	});

	it('calls ondone when the overlay animation ends', async () => {
		const ondone = vi.fn();
		render(Preloader, { ready: true, onstart: () => {}, ondone });

		await page.getByRole('button', { name: 'click me' }).click();
		document.querySelector('.preloader-overlay')?.dispatchEvent(new Event('animationend'));

		expect(ondone).toHaveBeenCalledOnce();
	});
});
