(function() {
    'use strict';

    let lastSkipTime = 0;

    function clickSkipWithRandomDelay() {
        const skipBtn = document.querySelector('.ytp-ad-skip-button');
        if (!skipBtn) return;

        const now = Date.now();
        if (now - lastSkipTime < 5000) {
            return;
        }

        const delay = Math.floor(Math.random() * 1400) + 100;

        setTimeout(() => {
            skipBtn.click();
            console.log("click")
            lastSkipTime = Date.now();
        }, delay);
    }

    function muteUnskippableAd() {
        const video = document.querySelector('video');
        if (!video) return;

        const adShowing = document.querySelector('.ad-showing');
        const skipBtn = document.querySelector('.ytp-ad-skip-button');

        if (adShowing && video && !skipBtn && !video.muted) {
            video.muted = true;
            console.log('mute ad');

            setTimeout(() => {
                video.muted = false;
                console.log('cancel mute');
            }, 5000);
        }
    }

    setInterval(() => {
        console.log("doing")
        clickSkipWithRandomDelay();
        muteUnskippableAd();
    }, 1000);

})();
