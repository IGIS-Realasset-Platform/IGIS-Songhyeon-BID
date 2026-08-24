import React from 'react';

export default function CaseTbdPage({ title, description }) {
  return (
    <section className="songhyeon-reference-dark flex min-h-[620px] animate-fade-in items-center justify-center pb-16">
      <div className="w-full max-w-[760px] border border-[#3A3A3C] bg-[#272726] px-8 py-16 text-center">
        <span className="inline-flex border border-[#4A4A4C] bg-[#242423] px-3 py-1 text-[11px] font-semibold text-[#9CC4E6]">TBD</span>
        <h1 className="mt-5 text-[28px] font-semibold text-white">{title}</h1>
        <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-6 text-[#A1A1AA]">{description}</p>
        <div className="mx-auto mt-8 h-px w-12 bg-[#6F9FC7]" />
        <p className="mt-6 text-[12px] text-[#86868B]">준비 중</p>
      </div>
    </section>
  );
}
