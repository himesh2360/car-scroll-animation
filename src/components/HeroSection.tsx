"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge, Zap, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const roadRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial Entrance
            const tl = gsap.timeline();

            tl.fromTo(
                headlineRef.current,
                { opacity: 0, scale: 0.95, filter: "blur(20px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "expo.out" }
            );

            tl.fromTo(
                ".stat-card",
                { opacity: 0, y: 40, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(1.7)" },
                "-=1.2"
            );

            // Advanced Scroll Logic with Wipe Reveal
            const car = carRef.current;
            const mask = maskRef.current;

            gsap.to(car, {
                x: "135vw",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=350%", // Longer for more control
                    scrub: 3,     // Higher inertia for smooth feel
                    pin: true,
                    onUpdate: (self) => {
                        const velocity = self.getVelocity();
                        // Dynamic Rotation (Steering)
                        const rotationSpeed = gsap.utils.clamp(-8, 8, velocity / 150);
                        // Suspension Bounce
                        const bounce = Math.sin(self.progress * 60) * 4;

                        gsap.to(car, {
                            rotation: rotationSpeed,
                            y: bounce,
                            overwrite: "auto",
                            duration: 0.5,
                        });

                        // Wipe Reveal: Update clip-path based on car position
                        if (mask) {
                            const revealPercent = self.progress * 135;
                            gsap.to(mask, {
                                clipPath: `inset(0 ${Math.max(0, 100 - revealPercent)}% 0 0)`,
                                overwrite: "auto",
                                duration: 0.1
                            });
                        }
                    },
                },
            });

            // Road Path Growth
            gsap.fromTo(roadRef.current,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=100%",
                        scrub: 1
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-4 md:px-0">
            {/* Professional Background Road Path */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center">
                <div
                    ref={roadRef}
                    className="w-[150%] h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent -rotate-1 origin-left blur-[1px]"
                ></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto text-center mt-[-10vh]">
                <div ref={maskRef} style={{ clipPath: 'inset(0 100% 0 0)', position: 'relative' }}>
                    <h1
                        ref={headlineRef}
                        className="text-7xl md:text-[11.5rem] font-black tracking-tighter text-white uppercase leading-[0.85] mb-20 text-glow"
                    >
                        WELCOME TO<br />
                        <span className="text-zinc-600">ITZFIZZ</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
                    <StatCard icon={<Zap className="w-5 h-5 text-yellow-500" />} value="98%" label="SPEED INCREASE" />
                    <StatCard icon={<Clock className="w-5 h-5 text-blue-500" />} value="1.2s" label="LATENCY REDUCTION" />
                    <StatCard icon={<Gauge className="w-5 h-5 text-emerald-500" />} value="24/7" label="UPTIME STATUS" />
                </div>
            </div>

            {/* Premium Car Asset - Positioned in front of text */}
            <div
                ref={carRef}
                className="absolute bottom-1/4 -left-[500px] w-[35rem] h-auto z-50 pointer-events-none"
            >
                <img
                    src="/car.png"
                    alt="Sports Car"
                    className="w-full h-auto mix-blend-screen"
                />
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-pulse">
                <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Scroll to Drive</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
    return (
        <div className="stat-card glass-card p-8 flex flex-col items-center justify-center group hover:bg-white/10 transition-colors">
            <div className="mb-4 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <span className="text-5xl font-bold text-white mb-2 tabular-nums">{value}</span>
            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">{label}</span>
        </div>
    );
}
