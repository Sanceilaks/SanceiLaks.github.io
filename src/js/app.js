// Constants Variables
const button = document.querySelector('.preloader-content_button');
const image_folder = 'src/assets';
const images = {
    vk: preload_image(`${image_folder}/vk.svg`),
    telegram: preload_image(`${image_folder}/tg.svg`),
    discord: preload_image(`${image_folder}/ds.svg`),
    github: preload_image(`${image_folder}/git.svg`)
};
const image = document.querySelector('.main_content_img');
// Temporary Variables
let iterator = document.querySelectorAll('.main_content_item').values();
let timer = null;
// Methods
/**
 * 
 * @param {string} path 
 * @returns {HTMLImageElement}
 */
const preload_image = (path) => {
    const img = new Image();
    img.src = path;
    return img;
};

YT.ready(() => {
    const hash = /\#(?<id>[A-Za-z0-9_\-]{11})/.exec(window.location.hash);
    const video_id = hash ? hash.groups.id : '1PuWLayNJKc';
    player = new YT.Player('player', {
        videoId: video_id,
        playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: video_id
        },
        events: {
            onReady: (e) => {
                e.target.setVolume(25);
                button.innerText = 'Click';
                button.classList.add('ready');
                button.onclick = () => {
                    document.querySelector('.preloader').remove();
                    player.unMute();
                    player.playVideo();
                };
            }
        }
    });
});

for (;;) {
    const next = iterator.next();
    if (next.done) {
        iterator = null;
        break;
    };

    next.value.onmouseenter = () => {
        timer = setTimeout(() => {
            image.src = images[next.value.id].src;
            image.classList.add('active');
        }, 200);
    };

    next.value.onmouseout = () => {
        clearTimeout(timer);
        image.classList.remove('active');
    };
};