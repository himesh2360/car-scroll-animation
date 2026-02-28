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

            // Advanced Scroll Logic with 3D Scale
            const car = carRef.current;

            gsap.to(car, {
                x: "125vw",
                scale: 2.2, // Make car significantly bigger on scroll
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=250%", // Extended for smoother zoom
                    scrub: 2.5,
                    pin: true,
                    onUpdate: (self) => {
                        const velocity = self.getVelocity();
                        // Dynamic Rotation (Steering) - more responsive
                        const rotationSpeed = gsap.utils.clamp(-20, 20, velocity / 100);
                        // Suspension Bounce + Depth Shift
                        const bounce = Math.sin(self.progress * 50) * 5;

                        gsap.to(car, {
                            rotation: rotationSpeed,
                            y: bounce,
                            overwrite: "auto",
                            duration: 0.4,
                        });
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
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden px-4 md:px-0">
            {/* Professional Background Road Path */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center">
                <div
                    ref={roadRef}
                    className="w-[150%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-3 origin-left blur-[1px] shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                ></div>
            </div>

            <div className="relative z-0 w-full max-w-7xl mx-auto text-center mt-[-10vh]">
                <h1
                    ref={headlineRef}
                    className="text-7xl md:text-[11rem] font-black tracking-tighter text-white uppercase leading-[0.8] mb-20 text-glow opacity-80"
                >
                    WELCOME TO<br />
                    <span className="text-zinc-600">ITZFIZZ</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
                    <StatCard icon={<Zap className="w-5 h-5 text-yellow-500" />} value="98%" label="SPEED INCREASE" />
                    <StatCard icon={<Clock className="w-5 h-5 text-blue-500" />} value="1.2s" label="LATENCY REDUCTION" />
                    <StatCard icon={<Gauge className="w-5 h-5 text-emerald-500" />} value="24/7" label="UPTIME STATUS" />
                </div>
            </div>

            {/* Premium Car Asset - Positioned in front of text */}
            <div
                ref={carRef}
                className="absolute bottom-1/4 -left-[500px] w-[35rem] h-auto z-50 pointer-events-none drop-shadow-[0_50px_100px_rgba(0,0,0,1)]"
            >
                <img
                    src="/car.png"
                    alt="Sports Car"
                    className="w-full h-auto mix-blend-screen brightness-125 contrast-125 drop-shadow-[0_0_80px_rgba(255,255,255,0.05)]"
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
