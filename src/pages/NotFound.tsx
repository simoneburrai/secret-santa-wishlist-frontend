import type { JSX } from "react"

export default function NotFound() : JSX.Element{
    return <div className="flex-1 flex items-center">
        <h1 className="text-primary"><span className="font-bold">404</span> Pagina non Trovata</h1>
        <button className="btn-santa">Torna alla Home</button>
    </div>
}
