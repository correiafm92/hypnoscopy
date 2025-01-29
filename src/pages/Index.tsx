import { useEffect, useState } from "react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(72 * 60 * 60); // 72 hours in seconds

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

      <a
        href="https://form.respondi.app/kPZ73POt"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 bg-green-500 text-white font-semibold rounded-lg 
                 transform transition-all duration-300 hover:bg-green-600 hover:scale-105 
                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Negócio fechado
      </a>

      <div className="bg-white text-black px-6 py-3 rounded-lg shadow-md mt-4 fade-in">
        <p className="text-sm font-medium">
          Essa proposta acabará em {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
};

export default Index;