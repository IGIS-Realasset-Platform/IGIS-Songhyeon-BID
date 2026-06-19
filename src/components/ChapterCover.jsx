import React, { useState } from 'react';

export default function ChapterCover({ chapterNum, title, isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden" style={{ background: 'linear-gradient(90deg, #c1e2dd, #587d94)' }}>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center text-[#0f172a]">
                <span className="inline-block text-[22px] md:text-[26px] font-extrabold mb-[14px] uppercase tracking-wider">
                    Chapter {chapterNum}
                </span>
                <h2 className="text-[34px] md:text-[54px] lg:text-[66px] font-black leading-[1.3] break-keep">
                    {title}
                </h2>
                <div className="w-[120px] h-[3px] bg-[#0f172a] mt-[30px] opacity-80" />
            </div>
        </section>
    );
}
