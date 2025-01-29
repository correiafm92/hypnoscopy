import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(72 * 60 * 60); // 72 hours in seconds
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (isFormOpen) {
      // Add Respondi script when modal opens
      const bodyScript = document.querySelector('body');
      const hasScript = document.querySelector('#respondi_src');
      if (!hasScript) {
        const script = document.createElement('script');
        script.setAttribute("async", "");
        script.id = 'respondi_src';
        script.src = 'https://embed.respondi.app/embed.js';
        document.body.appendChild(script);
      }
    }
  }, [isFormOpen]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 space-y-8 max-w-4xl mx-auto">
      <p className={`text-xl md:text-2xl text-center mb-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        Papo direto, sem site com apresentações bonitinhas. Pegue seu café e aperte o play no video
      </p>
      
      <div className="video-container w-full">
        <iframe
          src="https://www.youtube.com/embed/go0aOyHOvjI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-2xl"
        ></iframe>
      </div>

      <button
        onClick={() => setIsFormOpen(true)}
        className="inline-block px-8 py-4 bg-green-500 text-white font-semibold rounded-lg 
                 transform transition-all duration-300 hover:bg-green-600 hover:scale-105 
                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Negócio fechado
      </button>

      <div className="bg-white text-black px-6 py-3 rounded-lg shadow-md mt-4 fade-in">
        <p className="text-sm font-medium">
          Essa proposta acabará em {formatTime(timeLeft)}
        </p>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <div 
            data-respondi-container="" 
            data-respondi-mode="regular" 
            data-respondi-src="https://form.respondi.app/kPZ73POt" 
            data-respondi-width="100%" 
            data-respondi-height="100%"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;