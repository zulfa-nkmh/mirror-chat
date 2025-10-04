"use client";

import React, { useState, useEffect } from 'react';

const TEXT_TO_TYPE = "This Page is Under Development";
const TYPING_SPEED = 150; 
const DELETING_SPEED = 50;
const PAUSE_BEFORE_DELETE = 1000; 
const PAUSE_BEFORE_TYPE = 500; 

const TypewriterLoop = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const fullText = TEXT_TO_TYPE;
    const currentIndex = loopNum % 1; 

    // --- LOGIKA UTAMA ANIMASI ---
    const handleType = () => {
      
      const currentText = fullText.substring(0, displayText.length + (isDeleting ? -1 : 1));

      setDisplayText(currentText);

      // Kecepatan
      let speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
      if (isDeleting && currentText === '') {
        // Selesai menghapus, jeda sebentar, lalu mulai mengetik lagi
        setIsDeleting(false);
        setLoopNum(loopNum + 1); // Lanjut ke loop berikutnya
        speed = PAUSE_BEFORE_TYPE;
      } else if (!isDeleting && currentText === fullText) {
        // Selesai mengetik, jeda sebentar, lalu mulai menghapus
        setIsDeleting(true);
        speed = PAUSE_BEFORE_DELETE;
      }
      
      timer = setTimeout(handleType, speed);
    };

    timer = setTimeout(handleType, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    // Bersihkan timer ketika komponen di-unmount atau loopNum berubah
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum]); // Dependency array

  return (
    <div style={{ fontSize: '2em', fontFamily: 'monospace' }}>
      <h1>{displayText}
        {/* Cursor berkedip, hanya muncul saat tidak menghapus */}
        <span className="cursor" style={{ borderRight: '0.1em solid black', animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
      </h1>
      
      {/* animasi cursor */}
      <style jsx global>{`
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: black; }
        }
      `}</style>
    </div>
  );
};

export default TypewriterLoop;