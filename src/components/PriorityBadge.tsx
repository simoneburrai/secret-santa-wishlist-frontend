import { getPriority } from "../utils/priorityConstants";

export default function PriorityBadge({ level }: { level: number }) {
    const { label, color } = getPriority(level);
    
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${color}`}>
            {label}
        </span>
    );
}