export const links = [
	{ id: 'vk', href: 'https://vk.com/voidptr_t', label: '#include <vk>' },
	{ id: 'telegram', href: 'https://t.me/vptr_t', label: 'import <telegram>' },
	{
		id: 'discord',
		href: 'https://discord.com/users/405339648416546816',
		label: 'use discord::{me}'
	},
	{ id: 'github', href: 'https://github.com/Sanceilaks', label: 'using github' }
] as const;

export type LinkId = (typeof links)[number]['id'];
