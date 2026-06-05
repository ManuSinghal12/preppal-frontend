import { createContext, useContext, useState, useCallback } from "react"

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = "success") => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
    }, [])

    const colors = { success: "bg-green-600", error: "bg-red-600", info: "bg-blue-600" }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
                {toasts.map(t => (
                    <div key={t.id} className={`${colors[t.type] || colors.info} text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium max-w-xs animate-fade-in`}>
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)
