import React from "react";

export default function layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex justify-center items-center w-full h-screen border border-slate-700 shadow-2xl">
      {children}
    </div>
  );
}
