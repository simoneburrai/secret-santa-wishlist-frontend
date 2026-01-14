export default function StepCard({ icon, title, desc, step }: { icon: any, title: string, desc: string, step: string }) {
  return (
    <div className="relative p-8 rounded-3xl bg-white/5 border border-primary/10 hover:border-primary/40 transition-all group flex flex-col items-center text-center gap-4">
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
        {step}
      </div>
      <div className="text-secondary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="opacity-70">{desc}</p>
    </div>
  );
}