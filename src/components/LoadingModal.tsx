import Lottie from "lottie-react";
import animationData from "../assets/santa-loader.json"; // Il tuo file JSON

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export default function LoadingModal({ isOpen, message = "Caricamento in corso..." }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-64 h-64">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <p className="mt-4 text-white font-black text-xl animate-pulse tracking-widest uppercase">
        {message}
      </p>
    </div>
  );
}