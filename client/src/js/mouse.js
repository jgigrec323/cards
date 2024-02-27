import { gsap } from "gsap";

export const moving = () => {
    const mouse = document.querySelector(".mouse");
    const cursorScale = document.querySelector(".cursor-scale");

    window.addEventListener("mousemove", (e) => {
        const coord = { x: e.clientX, y: e.clientY };
        gsap.to(mouse, {
            x: coord.x - mouse.offsetWidth / 2,
            y: coord.y - mouse.offsetHeight / 2,
            stagger: 0.5,
            duration: 0.6,
            ease: "power3.out",
        });
    });

    cursorScale.addEventListener("mouseenter", () => {
        gsap.to(mouse, {
            background: "gold",
            scale: 2.3,
            rotation: 90,
            stagger: 0.1,

            yoyo: true,
            duration: 0.2,
            ease: "ease.out",
        });
    });

    cursorScale.addEventListener("mouseleave", () => {
        gsap.to(mouse, {
            background: "black",
            scale: 1,
            rotation: 0,
            duration: 0.2,
            ease: "power1.out",
        });
    });
};