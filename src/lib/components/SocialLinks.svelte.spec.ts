import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SocialLinks from './SocialLinks.svelte';

describe('SocialLinks.svelte', () => {
	it('renders the original social links', async () => {
		render(SocialLinks);

		await expect
			.element(page.getByRole('link', { name: '#include <vk>' }))
			.toHaveAttribute('href', 'https://vk.com/voidptr_t');
		await expect
			.element(page.getByRole('link', { name: 'import <telegram>' }))
			.toHaveAttribute('href', 'https://t.me/vptr_t');
		await expect
			.element(page.getByRole('link', { name: 'use discord::{me}' }))
			.toHaveAttribute('href', 'https://discord.com/users/405339648416546816');
		await expect
			.element(page.getByRole('link', { name: 'using github' }))
			.toHaveAttribute('href', 'https://github.com/Sanceilaks');
	});

	it('reveals the matching icon after hovering for 200ms', async () => {
		render(SocialLinks);

		await page.getByRole('link', { name: 'using github' }).hover();

		const icon = document.querySelector('.content-link-icon') as HTMLImageElement | null;
		expect(icon).toBeTruthy();
		expect(icon?.classList.contains('active')).toBe(false);

		await new Promise((resolve) => setTimeout(resolve, 220));

		expect(icon?.classList.contains('active')).toBe(true);
		expect(icon?.getAttribute('src')).toBeTruthy();
	});

	it('hides the icon immediately on mouse leave', async () => {
		render(SocialLinks);

		const link = page.getByRole('link', { name: 'using github' });
		await link.hover();
		await new Promise((resolve) => setTimeout(resolve, 220));

		const icon = document.querySelector('.content-link-icon') as HTMLImageElement | null;
		expect(icon?.classList.contains('active')).toBe(true);

		await page.getByRole('link', { name: '#include <vk>' }).hover();
		expect(icon?.classList.contains('active')).toBe(false);
	});
});
