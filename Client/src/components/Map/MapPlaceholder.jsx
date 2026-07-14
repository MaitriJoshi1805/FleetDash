import { MdLocationOn } from "react-icons/md";

function MapPlaceholder() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg h-[450px] flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">
            Live Fleet Map
          </h2>

          <p className="text-sm text-slate-400">
            Real-time vehicle tracking
          </p>
        </div>

        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
          ● Live
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center">

        <MdLocationOn
          size={90}
          className="text-blue-500"
        />

        <h3 className="text-2xl font-bold text-white mt-4">
          Map Loading...
        </h3>

        <p className="text-slate-400 mt-2">
          Live vehicle locations will appear here.
        </p>

      </div>

    </div>
  );
}

export default MapPlaceholder;