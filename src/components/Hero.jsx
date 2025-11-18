import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900">
      {/* Fixed height on small screens to avoid pushing content; taller on md+ */}
      <div className="absolute inset-0 h-[420px] md:h-[560px]">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm mb-4 border border-white/20 backdrop-blur">Smart Budgeting</span>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
          Plan, track, and win your month
        </h1>
        <p className="text-blue-100 max-w-2xl mb-2 md:mb-6">
          Set your income, define custom categories with emojis, and track spending against your goals.
        </p>
      </div>
      {/* Stronger fade so content below never overlaps visually */}
      <div className="pointer-events-none absolute inset-0 h-[420px] md:h-[560px] bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
      {/* Reserve space below the hero equal to canvas height so next section starts after it */}
      <div className="h-[420px] md:h-[560px]" />
    </section>
  );
}
