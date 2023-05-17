const TIMEZONE = 'Asia/Ho_Chi_Minh';
const TIMEZONE_ABBR = 'ICT';

function setScrollValue() {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    document.documentElement.style.setProperty('--scroll-y-percent', window.scrollY / window.innerHeight);
    document.documentElement.classList.toggle("scrolled", window.scrollY > 0);
};

setScrollValue();
window.addEventListener('scroll', setScrollValue);
window.addEventListener('resize', setScrollValue);

document.querySelector('.down-arrow-inner').addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight * 0.3,
        behavior: 'smooth'
    });
});

function setClock() {
    const date = new Date();
    const { year, month, day, hour, minute, second } = getDayObject();

    const hourOffset = -date.getTimezoneOffset() / 60;
    const minuteOffset = new Date(date.getTime() - date.getTime() % 1000 - hourOffset * 60 * 60 * 1000);
    const myTimezoneOffset = (new Date(year, month - 1, day, hour, minute, second) - minuteOffset) / 1000 / 60 / 60;
    const timezoneDifferent = myTimezoneOffset - hourOffset;
    const timezoneDiff = timezoneDifferent === 0 ? "same time" : (timezoneDifferent > 0 ? `${formatTimeDiff(timezoneDifferent)} ahead` : `${formatTimeDiff(-timezoneDifferent)} behind`);
    const timezoneUTCOffset = " / UTC " + (myTimezoneOffset >= 0 ? "+" : "") + formatTimezoneUTCOffset(myTimezoneOffset);

    const hourHand = document.querySelector('.widget-clock-hour-hand');
    const minuteHand = document.querySelector('.widget-clock-minute-hand');
    const secondHand = document.querySelector('.widget-clock-second-hand');
    const dateText = document.querySelector('.widget-clock-date-text');
    const timezoneAbbr = document.querySelector('.widget-clock-timezone-abbr');
    const hourText = document.querySelector('.widget-clock-hour');
    const minuteText = document.querySelector('.widget-clock-minute');
    const secondText = document.querySelector('.widget-clock-second');
    const timezoneDiffText = document.querySelector('.widget-clock-timezone-diff');
    const timezoneUTCOffsetText = document.querySelector('.widget-clock-timezone-utc-offset');

    secondHand.style.transition = second === 0 ? 'none' : 'transform 0.3s ease';

    hourHand.style.transform = `rotate(${hour % 12 / 12 * 360 + minute / 60 * 30 + second / 60 / 60 * 30}deg)`;
    minuteHand.style.transform = `rotate(${minute / 60 * 360 + second / 60 * 6}deg)`;
    secondHand.style.transform = `rotate(${second / 60 * 360}deg)`;
    dateText.innerHTML = new Date(date.getTime() + timezoneDifferent * 60 * 60 * 1000).toLocaleDateString();
    timezoneAbbr.innerHTML = TIMEZONE_ABBR;
    hourText.innerHTML = hour.toString().padStart(2, "0");
    minuteText.innerHTML = minute.toString().padStart(2, "0");
    secondText.innerHTML = second.toString().padStart(2, "0");
    timezoneDiffText.innerHTML = timezoneDiff;
    timezoneUTCOffsetText.innerHTML = timezoneUTCOffset;
}

setClock();
setInterval(setClock, 1000);

function getDayObject() {
    const dayObject = {};
    new Intl.DateTimeFormat([], {
        timeZone: TIMEZONE, hour: "numeric", minute: "numeric", second: "numeric", hour12: false, day: "numeric", month: "numeric", year: "numeric"
    }).formatToParts(new Date()).forEach(({ type: type, value: value }) => {
        if (type !== "literal") dayObject[type] = Number(value);
    });
    return dayObject;
}

function formatTimeDiff(timeZoneDifferent) {
    if (timeZoneDifferent < 0) {
        return `-${formatTimeDiff(-timeZoneDifferent)}`;
    }

    const minutes = timeZoneDifferent % 1 * 60;
    timeZoneDifferent = Math.floor(timeZoneDifferent);

    if (minutes) {
        return `${timeZoneDifferent}h ${minutes}m`;
    } else {
        return `${timeZoneDifferent}h`;
    }
}

function formatTimezoneUTCOffset(myTimezoneOffset) {
    const minutes = myTimezoneOffset % 1 * 60;
    return `${myTimezoneOffset = Math.floor(myTimezoneOffset)}:${minutes.toString().padStart(2, "0")}`;
}

function setSquareSizeAndGap() {
    const bento = document.querySelector('.bento');

    const numColumns = getComputedStyle(bento).gridTemplateColumns.split(" ").length;
    const columnGap = parseInt(getComputedStyle(bento).columnGap);
    const squareSize = (bento.offsetWidth - columnGap * (numColumns - 1)) / numColumns;

    bento.style.setProperty("--square-size", `${squareSize}px`);
    bento.style.setProperty("--gap", `${columnGap}px`);
};

setSquareSizeAndGap();
window.addEventListener('resize', setSquareSizeAndGap);

function enableParallax(props) {
    const background = document.querySelector("#background");
    const tx = (props.clientX - window.innerWidth / 2) / window.innerWidth, ty = (props.clientY - window.innerHeight / 2) / window.innerHeight;
    background.style.setProperty("--tx", 20 * tx + "px"), background.style.setProperty("--ty", 20 * ty + "px");
}
function disableParallax(props) {
    const background = document.querySelector("#background");
    background.style.setProperty("--tx", "0px"), background.style.setProperty("--ty", "0px");
};

document.addEventListener("mousemove", enableParallax);
document.addEventListener("mouseleave", disableParallax);
