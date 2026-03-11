interface LinePatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

// Versão com animação de ondas
export function WaveLinePattern({ 
  className = "", 
  color = "#E3E8F7", 
  opacity = 0.6 
}: LinePatternProps) {
  return (
    <div className={`flex items-end justify-between w-full h-8 ${className}`}>
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={i}
          className="line-wave w-0.5 rounded-full"
          style={{
            backgroundColor: color,
            opacity: opacity,
            minHeight: '4px',
            animationDelay: `${i * 100}ms`,
            animationDuration: '2s'
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { height: 10%; }
          50% { height: 80%; }
        }
        .line-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Versão SVG animada (mais performática)
export function AnimatedSVGLinePattern({ 
  className = "", 
  color = "#E3E8F7", 
  opacity = 0.6 
}: LinePatternProps) {
  const width = 800;
  const height = 35;
  const lineCount = 50;
  
  return (
    <svg 
      className={className} 
      width="100%" 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYEnd meet"
    >
      {Array.from({ length: lineCount }, (_, i) => {
        const x = (i / (lineCount - 1)) * width;
        const baseHeight = 5 + Math.random() * 25;
        
        return (
          <line
            key={i}
            x1={x}
            y1={height}
            x2={x}
            y2={height - baseHeight}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity={opacity}
          >
            <animate
              attributeName="y2"
              values={`${height - 5};${height - (baseHeight * 2)};${height - 5}`}
              dur={`${2 + Math.random() * 2}s`}
              repeatCount="indefinite"
              begin={`${i * 0.1}s`}
            />
            <animate
              attributeName="opacity"
              values={`${opacity * 0.3};${opacity};${opacity * 0.3}`}
              dur={`${3 + Math.random()}s`}
              repeatCount="indefinite"
              begin={`${i * 0.05}s`}
            />
          </line>
        );
      })}
    </svg>
  );
}

// Versão com efeito de equalizador de áudio
export function EqualizerLinePattern({ 
  className = "", 
  color = "#F97D0E", 
  opacity = 0.7 
}: LinePatternProps) {
  return (
    <div className={`flex items-end justify-center gap-1 w-full h-8 ${className}`}>
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          className="equalizer-bar bg-current rounded-full"
          style={{
            width: '3px',
            color: color,
            opacity: opacity,
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes equalizer {
          0%, 100% { height: 8px; }
          25% { height: ${Math.random() * 20 + 10}px; }
          50% { height: ${Math.random() * 25 + 15}px; }
          75% { height: ${Math.random() * 30 + 5}px; }
        }
        .equalizer-bar {
          animation: equalizer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Versão com efeito de pulso
export function PulseLinePattern({ 
  className = "", 
  color = "#01165A", 
  opacity = 0.5 
}: LinePatternProps) {
  return (
    <div className={`flex items-end justify-between w-full h-8 overflow-hidden ${className}`}>
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="pulse-line w-1 rounded-full transition-all duration-300"
          style={{
            backgroundColor: color,
            opacity: opacity,
            height: '20%',
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes pulse {
          0% { 
            height: 20%; 
            transform: scaleY(1);
          }
          50% { 
            height: 90%; 
            transform: scaleY(1.2);
          }
          100% { 
            height: 20%; 
            transform: scaleY(1);
          }
        }
        .pulse-line {
          animation: pulse 3s ease-in-out infinite;
        }
        .pulse-line:hover {
          animation-duration: 1s;
        }
      `}</style>
    </div>
  );
}