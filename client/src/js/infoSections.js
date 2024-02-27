import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const container = document.querySelector(".infoSection");

gsap.registerPlugin(ScrollTrigger);
const scrollTrigger = new ScrollTrigger({
  trigger: container,
  markers: true,
  scrub: true,
});

gsap.from(container, {
  top: "+=100px",
  duration: 2,
  scrollTrigger,
});

console.log(gsap, container);
