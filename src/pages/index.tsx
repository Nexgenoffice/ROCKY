import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="max-w-2xl space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-[#D4C5B5] mb-4">
          Créez votre <br/>
          <span className="text-[#8B7355]">Compagnon Unique</span>
        </h1>
        <p className="text-xl text-[#9CA3AF] mb-10">
          Laissez libre cours à votre imagination. Personnalisez votre personnage avec des centaines de combinaisons possibles.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/creator">
            <button className="bg-[#8B7355] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#A68A6D] transition-all shadow-lg hover:shadow-[#8B7355]/20 hover:-translate-y-1">
              Commencer la création
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}