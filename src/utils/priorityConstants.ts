export const PRIORITY_LEVELS: Record<number, { label: string; color: string }> = {
    1: { label: "Bassa", color: "bg-slate-100 text-slate-600 border-slate-200" },
    2: { label: "Media", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    3: { label: "Alta", color: "bg-amber-100 text-amber-700 border-amber-200" },
    4: { label: "Molto Alta", color: "bg-rose-100 text-rose-700 border-rose-200" },
    5: { label: "Essenziale", color: "bg-violet-100 text-violet-700 border-violet-200" },
};

export const getPriority = (level: number) => 
    PRIORITY_LEVELS[level] || { label: "Nessuna", color: "bg-gray-100 text-gray-500 border-gray-200" };