const linkIcon = document.querySelector('.content-link-icon');
const images = {
    vk: 'src/assets/vk.svg',
    telegram: 'src/assets/telegram.svg',
    discord: 'src/assets/discord.svg',
    github: 'src/assets/github.svg'
};

let iterator = document.querySelectorAll('.content-link').values();
let timer = null;

YT.ready(() => {
    const hash = /\#(?<id>[A-Za-z0-9_\-]{11})/.exec(window.location.hash);
    const videoId = hash ? hash.groups.id : '1PuWLayNJKc';
    new YT.Player('player', {
        videoId,
        playerVars: {
            loop: 1,
            controls: 0,
            autoplay: 0,
            playlist: videoId
        },
        events: {
            onReady(e) {
                const preloaderButton = document.querySelector('.preloader-btn');
                const preloader = document.querySelector('.preloader');
                const preloaderOverlay = document.querySelector('.preloader-overlay');
                preloaderButton.addEventListener('click', () => {
                    e.target.playVideo();
                    e.target.setVolume(25);
                    preloader.classList.add('active');
                    preloaderOverlay.addEventListener('animationend', () => {
                        preloader.remove();
                    });
                });
            }
        }
    });
});

for (let next = iterator.next(); !next.done; next = iterator.next()) {
    next.value.addEventListener('mouseenter', () => {
        linkIcon.src = images[next.value.dataset.id];
        timer = setTimeout(() => {
            linkIcon.classList.add('active');
        }, 200);
    });

    next.value.addEventListener('mouseout', () => {
        clearTimeout(timer);
        linkIcon.classList.remove('active');
    });
};