export const LoadingScreen = ({ message = "Loading content" }) => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center p-4" style={{height: '100vh'}}>
        {/* Animated bars */}
        <div className="d-flex align-items-end gap-2 mb-3" style={{ height: "40px" }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-primary bg-opacity-10 rounded"
              style={{
                width: "8px",
                height: `${20 + i * 10}px`,
                animation: `breath 1.6s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
  
        {/* Text */}
        <p className="text-muted mb-0">{message}</p>
  
        {/* CSS */}
        <style jsx>{`
          @keyframes breath {
            0%, 100% { transform: scaleY(1); opacity: 0.6; }
            50% { transform: scaleY(1.8); opacity: 1; background-color: rgba(13, 148, 134, 0.3); }
          }
        `}</style>
      </div>
    );
  };