// Constants Variables
const main_items = document.querySelectorAll('.main_content_item');
const main_content_img = document.querySelector('.main_content_img');
const folderIMG = './src/assets';
const images = { vk: `${folderIMG}/vk.svg`, telegram: `${folderIMG}/tg.svg`, discord: `${folderIMG}/ds.svg`, github: `${folderIMG}/git.svg` };
// Temporary Variables
let timer = null;

const enterMouseItems = items => {
    items.forEach(el => {
        el.onmouseenter = _ => {
            timer = setTimeout(_ => {
                main_content_img.src = images[el.id];
                main_content_img.classList.add('active');
            }, 200);
        };

        el.onmouseout = _ => {
            main_content_img.classList.remove('active');
            clearTimeout(timer);
        };
    });
};

enterMouseItems(main_items);