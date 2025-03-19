import React from "react";

export default function layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <main className="w-full h-full">
      <div className="w-[320px] md:w-[400px] mx-auto my-40">
        <div className="border border-slate-400 rounded-lg p-6 md:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
