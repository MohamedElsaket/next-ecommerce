import React from "react";

export default function layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="border border-slate-700 shadow-2xl p-8 mx-4 rounded-xl">
        {children}
      </div>
    </div>
  );
}
