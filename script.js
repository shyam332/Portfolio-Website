const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const fullscreenToggle = document.querySelector(".brand-fullscreen");
const fullscreenNotice = document.querySelector(".fullscreen-notice");

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
        siteNav.classList.toggle("is-open", !isExpanded);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            siteNav.classList.remove("is-open");
        });
    });
}

if (fullscreenToggle) {
    const updateFullscreenControl = () => {
        const isFullscreen = document.fullscreenElement !== null;
        const action = isFullscreen ? "Exit fullscreen mode" : "Enter fullscreen mode";
        fullscreenToggle.setAttribute("aria-label", action);
        fullscreenToggle.setAttribute("title", action);
        fullscreenToggle.setAttribute("aria-pressed", String(isFullscreen));
    };

    const showFullscreenNotice = (message) => {
        if (!fullscreenNotice) return;
        fullscreenNotice.textContent = message;
        fullscreenNotice.hidden = false;
        window.clearTimeout(showFullscreenNotice.timeoutId);
        showFullscreenNotice.timeoutId = window.setTimeout(() => {
            fullscreenNotice.hidden = true;
        }, 5000);
    };

    document.addEventListener("fullscreenchange", updateFullscreenControl);
    fullscreenToggle.addEventListener("click", async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            } else {
                showFullscreenNotice("Fullscreen mode is not supported by this browser.");
            }
        } catch {
            showFullscreenNotice("Could not enter fullscreen. Check your browser permissions and try again.");
        }
    });
}

if (themeToggle) {
    const applyTheme = (isNight) => {
        document.documentElement.dataset.theme = isNight ? "dark" : "light";
        themeToggle.setAttribute("aria-pressed", String(isNight));
        const nextTheme = isNight ? "day" : "night";
        themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
        themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
    };

    applyTheme(localStorage.getItem("portfolio-theme") === "dark");

    themeToggle.addEventListener("click", () => {
        const isNight = document.documentElement.dataset.theme !== "dark";
        applyTheme(isNight);
        localStorage.setItem("portfolio-theme", isNight ? "dark" : "light");
    });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}
