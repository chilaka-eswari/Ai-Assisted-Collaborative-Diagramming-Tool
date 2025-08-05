import React, { useRef, useState, useEffect } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.8;
    canvas.style.border = '1px solid #000';

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctxRef.current = ctx;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setStartPos({ x: offsetX, y: offsetY });
    setIsDrawing(true);

    if (tool === 'pen') {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    const ctx = ctxRef.current;

    if (tool === 'pen') {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (tool === 'rectangle') {
      const { offsetX, offsetY } = nativeEvent;
      const ctx = ctxRef.current;
      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, width, height);
    }

    ctxRef.current.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Collaborative Whiteboard</h1>
      <div className="mb-4 space-x-2">
        <button onClick={() => setTool('pen')} className="px-4 py-1 border">Pen</button>
        <button onClick={() => setTool('rectangle')} className="px-4 py-1 border">Rectangle</button>
        <button onClick={clearCanvas} className="px-4 py-1 border text-red-600">Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Whiteboard;
