import React, { useState } from 'react';

export default function Section13({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden" style={{ background: 'linear-gradient(90deg, #e04c9a, #f45407)' }}>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center text-white">
                <span className="inline-block text-[22px] md:text-[26px] font-normal mb-[14px]">
                    PART 2
                </span>
                <h2 className="text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[1.3] break-keep">
                    BID의 탄생 배경과 제도적 메커니즘
                </h2>
                <div className="w-[120px] h-[3px] bg-white mt-[30px] opacity-80" />
            </div>
        </section>
    );
}
