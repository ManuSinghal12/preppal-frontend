const Modal = ({ children, onClose }) => (
    <div
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}
    >
        <div style={{
            background: "white", borderRadius: 10, padding: 24,
            width: "90%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto", position: "relative", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" // Added subtle shadow
        }}>
            <button onClick={onClose}
                style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888" }}
            >x</button>
            {children}
        </div>
    </div>
)
export default Modal