import React, { useState } from 'react';

export default function Section75({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden" style={{ background: 'linear-gradient(90deg, #1e3a8a, #4f46e5)' }}>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center text-white">
                <span className="inline-block text-[22px] md:text-[26px] font-normal mb-[14px]">
                    PART 6
                </span>
                <h2 className="text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[1.3] break-keep">
                    실행 로드맵과 IGIS 관점의 시사점
                </h2>
                <div className="w-[120px] h-[3px] bg-white mt-[30px] opacity-80" />
            </div>
        </section>
    );
}
