// ==UserScript==
// @name         YouTube Auto Skip Ads Free with Delay & Mute
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动跳过可跳过广告（随机延迟点击），静音不可跳过广告前几秒
// @author       YourName
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 记录上次跳过广告时间，避免频繁点击
    let lastSkipTime = 0;

    // 跳过广告按钮的延迟点击
    function clickSkipWithRandomDelay() {
        const skipBtn = document.querySelector('.ytp-ad-skip-button');
        if (!skipBtn) return;

        const now = Date.now();
        if (now - lastSkipTime < 5000) {
            // 距离上次跳过太近，不操作，5秒间隔防止多次点击
            return;
        }

        // 随机延迟100ms到1500ms
        const delay = Math.floor(Math.random() * 1400) + 100;

        setTimeout(() => {
            skipBtn.click();
            lastSkipTime = Date.now();
            console.log(`延迟${delay}ms，自动点击跳过广告`);
        }, delay);
    }

    // 静音不可跳过的广告
    function muteUnskippableAd() {
        const video = document.querySelector('video');
        if (!video) return;

        const adShowing = document.querySelector('.ad-showing');
        const skipBtn = document.querySelector('.ytp-ad-skip-button');

        // 有广告显示且没有跳过按钮时静音
        if (adShowing && video && !skipBtn && !video.muted) {
            video.muted = true;
            console.log('静音不可跳过广告开始');

            // 5秒后取消静音
            setTimeout(() => {
                video.muted = false;
                console.log('取消静音');
            }, 5000);
        }
    }

    // 主检测循环，每秒运行一次
    setInterval(() => {
        clickSkipWithRandomDelay();
        muteUnskippableAd();
    }, 1000);

})();
