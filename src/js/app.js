const main_items = document.querySelectorAll('.main_content_item');
const main_content_img = document.querySelector('.main_content_img');
const images = {
    vk: './src/assets/vk.svg',
    telegram: './src/assets/tg.svg',
    discord: './src/assets/ds.svg',
    github: './src/assets/git.svg'
};

const enterMouseItems = items => {
    items.forEach(el => {
        el.onmouseover = _ => {
            main_content_img.src = images[el.id];
            main_content_img.classList.add('active');
        };

        el.onmouseout = _ => {
            main_content_img.classList.remove('active');
        };
    });
};

enterMouseItems(main_items);