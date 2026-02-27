import HeroSection from "@/components/HeroSection";
import { MoveRight, Shield, Zap, Globe } from "lucide-react";

export default function Home() {
    return (
        <main className="relative">
            <HeroSection />

            {/* Features Showcase Section */}
            <section className="py-32 px-10 bg-transparent relative z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                                ENGINEERED FOR <span className="text-zinc-600">PERFORMANCE</span>
                            </h2>
                            <p className="text-lg text-zinc-400 font-medium">
                                Our architecture ensures that every millisecond is accounted for,
                                delivering a seamless experience across all platforms with
                                unrivaled efficiency.
                            </p>
                        </div>
                        <button className="flex items-center gap-4 px-8 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors uppercase text-sm tracking-widest">
                            Explore Stack <MoveRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-white" />}
                            title="End-to-End Security"
                            desc="Bank-grade encryption for all your data streams."
                        />
                        <FeatureCard
                            icon={<Globe className="w-6 h-6 text-white" />}
                            title="Global Scalability"
                            desc="Deploy to 100+ edge locations in under a minute."
                        />
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-white" />}
                            title="Neural Processing"
                            desc="Powered by the latest deep-learning algorithms."
                        />
                    </div>
                </div>
            </section>

            <section className="h-[50vh] flex items-center justify-center bg-[#050505]">
                <span className="text-[10px] uppercase tracking-[1em] text-zinc-700 font-black">END OF EXPERIMENT</span>
            </section>
        </main>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string, desc: string }) {
    return (
        <div className="stat-card glass-card p-10 hover:border-white/20 transition-all cursor-default">
            <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit">{icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}
