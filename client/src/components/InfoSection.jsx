import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

function InfoSection({ orientation, color, bgColor, children }) {
    gsap.registerPlugin(ScrollTrigger);
    const ref = useRef(null);

    useGSAP(() => {
        const onUpdateHandler = (self) => {
            const scaleValue = 0.9 + (0.1 * (1 - self.progress)); // Scale down by 10%
            ref.current.style.transform = `scale(${scaleValue})`;

        };

        gsap.to(ref.current, {
            scrollTrigger: {
                trigger: ref.current,
                start: 'top top',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
                pin: true,
                pinSpacing: false,
                onUpdate: onUpdateHandler,
            }
        });
    }, [ref]);

    return (
        <section ref={ref} className="infoSection" style={{ justifyContent: orientation, backgroundColor: bgColor, color: color }}>
            <p className="infoSectionText" style={{ textAlign: orientation }}>
                {children}
            </p>
        </section>
    );
}

export default InfoSection;
