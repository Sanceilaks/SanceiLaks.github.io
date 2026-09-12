import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Footer from './Footer.svelte';

describe('Footer.svelte', () => {
	it('links to the author with the original placeholder copy', async () => {
		render(Footer);

		await expect
			.element(page.getByRole('link', { name: /using voidptr_t = void\*/ }))
			.toHaveAttribute('href', 'https://github.com/twentytwo777/');
		await expect.element(page.getByText('twentytwo777 (author)')).toBeInTheDocument();
	});
});
