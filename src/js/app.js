function preloadImage(path) {
    let img = new Image();
    img.src = path;
    return img;
}

// Constants Variables
const main_items = document.querySelectorAll('.main_content_item');
const main_content_img = document.querySelector('.main_content_img');
const folderIMG = './src/assets';
const images = {
    vk: preloadImage(`${folderIMG}/vk.svg`), telegram: preloadImage(`${folderIMG}/tg.svg`),
    discord: preloadImage(`${folderIMG}/ds.svg`), github: preloadImage(`${folderIMG}/git.svg`)
};
const preloader = document.querySelector('.preloader'), button = document.querySelector('.preloader-content_button');
const searchresult = /\#(?<id>[A-Za-z0-9_\-]{11})/.exec(window.location.hash);
const videoId = searchresult ? searchresult.groups.id : "AOLdn36K7Xk";
// Temporary Variables
let timer = null;

YT.ready(_ => {
    player = new YT.Player('player', {
        videoId: videoId,
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': videoId },
        events: {
            'onReady': e => {
                e.target.setVolume(25);
                button.innerText = 'Click';
                button.classList.add('ready');
                button.onclick = _ => {
                    preloader.remove()
                    player.unMute();
                    player.playVideo();
                };
            }
        }
    });
});

const enterMouseItems = items => {
    items.forEach(el => {
        el.onmouseenter = _ => {
            timer = setTimeout(_ => {
                main_content_img.src = images[el.id].src;
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
