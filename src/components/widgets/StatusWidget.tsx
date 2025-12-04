"use client";

export default function StatusWidget() {
  return (
    <div className="w-full max-w-[180px] md:max-w-[224px] bg-white border-2 border-black p-3 md:p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-default flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-black">Status</span>
        <div className="w-3 h-3 bg-green-500 border border-black rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
      </div>
      <p className="font-mono text-xl md:text-2xl font-bold leading-none tracking-tighter">
        OPEN FOR<br/>WORK
      </p>
      <div className="mt-2 text-[8px] md:text-[10px] font-mono text-gray-400 text-right">
        LAST UPDATED: TODAY
      </div>
    </div>
  );
}
