<footer>
	<a href="https://github.com/twentytwo777/" target="_blank" rel="noreferrer" class="author">
		<span class="author-placeholder">using voidptr_t = void*</span>
		<span class="author-name">twentytwo777 (author)</span>
	</a>
</footer>

<style>
	footer {
		display: flex;
		align-items: center;
		justify-content: center;

		padding-bottom: 10px;

		user-select: none;
		-webkit-user-select: none;
	}

	.author {
		width: 160px;

		position: relative;

		display: flex;

		color: #fff;
		font-size: 14px;

		overflow: hidden;
	}

	.author-placeholder,
	.author-name {
		text-align: center;
		transition:
			var(--default-transition-duration) transform,
			var(--default-transition-duration) opacity;
	}

	.author-placeholder {
		width: 100%;
	}

	.author-name {
		position: absolute;
		inset: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		opacity: 0;
		transform: translateY(100%);
	}

	.author:hover .author-placeholder {
		opacity: 0;
		transform: translateY(-100%);
	}

	.author:hover .author-name {
		opacity: 1;
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.author {
			font-size: 12px;
		}
	}
</style>
