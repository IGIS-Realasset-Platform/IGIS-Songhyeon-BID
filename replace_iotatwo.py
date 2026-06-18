import re

with open('src/components/SectionIotaTwo.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern 1 for Overlay Text
pattern1 = r'({\/\* Seventh Item Area \*\/}.*?{\/\* Seventh Image Area \*\/}\s*<HoverImage src="\.\/img\/iotatwo_09\.jpg"[^\n]*\n)'
repl1 = """{/* Seventh Item Area - Mobile Text */}
                    <div className="flex flex-col w-full bs-fade-up mt-24 md:mt-32 md:hidden">
                        <h2 className="text-[28px] md:text-[40px] font-inter font-light text-black tracking-[-0.03em] leading-[1.2] mb-6 md:mb-8 break-keep">
                            {lang === 'kr' ? (
                                <>IOTA Two 메인 로비:<br className="md:hidden" /> 도시의 흐름이 만나는 건물의 중심</>
                            ) : (
                                <>IOTA Two Main Lobby:<br className="md:hidden" /> Where the City's Flow Meets Architecture</>
                            )}
                        </h2>

                        <div className="w-full max-w-full text-[14px] md:text-[17px] font-extralight text-gray-600 leading-[1.8] tracking-[-0.01em] font-inter mb-10 md:mb-14">
                            {lang === 'kr' ? (
                                <div className="break-keep">
                                    <p className="mb-4">
                                        IOTA Two의 메인로비는 외부 도시 레벨과 자연스럽게 연결되는 개방형 진입공간(Open Urban Lobby)으로 설계되었습니다.<br className="hidden md:block" />
                                        남산에서 내려오는 녹지와 서울역으로 이어지는 보행축이 내부로 스며들며, 실내에서도 자연과 도시의 흐름을 동시에 느낄 수 있는 공간적 연속성을 구현합니다.<br className="hidden md:block" />
                                        수직으로 확장된 천정고와 자연광, 그리고 그린 마감재의 조화는 입주자에게 도시 속에서도 여유와 품격을 동시에 경험하게 하는 환영의 공간을 완성합니다.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="mb-4">
                                        The Main Lobby of IOTA Two is conceived as an open urban gateway, seamlessly integrating the flow of the city into the architecture.<br className="hidden md:block" />
                                        Greenery descending from Namsan extends inward, merging with the pedestrian axis toward Seoul Station, creating a sense of spatial continuity between nature and the urban realm.<br className="hidden md:block" />
                                        The grand vertical height, natural light, and refined green finishes offer tenants a tranquil yet sophisticated arrival experience at the heart of the city.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Seventh Image Area with Desktop Overlay Text */}
                    <div className="relative w-full mt-0 md:mt-32 bs-fade-up overflow-hidden">
                        <HoverImage src="./img/iotatwo_09.jpg" alt="IOTA Two Main Lobby" wrapperClassName="w-full relative overflow-hidden group cursor-pointer" />
                        
                        {/* Desktop Gradient Overlay (Optional for better contrast) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none hidden md:block z-10"></div>
                        
                        {/* Desktop Text Overlay */}
                        <div className="absolute bottom-10 left-10 lg:bottom-20 lg:left-24 z-20 text-white hidden md:flex flex-col max-w-[1200px] pointer-events-none pr-10">
                            <h2 className="text-[40px] font-inter font-light tracking-[-0.03em] leading-[1.2] mb-8 break-keep">
                                {lang === 'kr' ? (
                                    <>IOTA Two 메인 로비: 도시의 흐름이 만나는 건물의 중심</>
                                ) : (
                                    <>IOTA Two Main Lobby: Where the City's Flow Meets Architecture</>
                                )}
                            </h2>

                            <div className="w-full text-[17px] font-extralight text-stone-200 leading-[1.8] tracking-[-0.01em] font-inter">
                                {lang === 'kr' ? (
                                    <div className="break-keep">
                                        <p className="mb-4 opacity-100">
                                            IOTA Two의 메인로비는 외부 도시 레벨과 자연스럽게 연결되는 개방형 진입공간(Open Urban Lobby)으로 설계되었습니다.<br />
                                            남산에서 내려오는 녹지와 서울역으로 이어지는 보행축이 내부로 스며들며, 실내에서도 자연과 도시의 흐름을 동시에 느낄 수 있는 공간적 연속성을 구현합니다.<br />
                                            수직으로 확장된 천정고와 자연광, 그리고 그린 마감재의 조화는 입주자에게 도시 속에서도 여유와 품격을 동시에 경험하게 하는 환영의 공간을 완성합니다.
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="mb-4 opacity-100">
                                            The Main Lobby of IOTA Two is conceived as an open urban gateway, seamlessly integrating the flow of the city into the architecture.<br />
                                            Greenery descending from Namsan extends inward, merging with the pedestrian axis toward Seoul Station, creating a sense of spatial continuity between nature and the urban realm.<br />
                                            The grand vertical height, natural light, and refined green finishes offer tenants a tranquil yet sophisticated arrival experience at the heart of the city.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
"""

# Pattern 2 for Appending 13 and 14
pattern2 = r'({\/\* Ninth Image Area \*\/}\s*<HoverImage src="\.\/img\/iotatwo_12\.jpg" alt="Office Open Lounge" \/>\s*)(\<\/div>\s*\<\/section>)'
repl2 = r"""\1

                    {/* Tenth Item Area */}
                    <div className="flex flex-col w-full bs-fade-up mt-24 md:mt-32">
                        <h2 className="text-[28px] md:text-[40px] font-inter font-light text-black tracking-[-0.03em] leading-[1.2] mb-6 md:mb-8 break-keep">
                            {lang === 'kr' ? (
                                <>Office Elevator Hall:<br className="md:hidden" /> 기술과 자연의 균형, 정제된 환대의 공간</>
                            ) : (
                                <>Office Elevator Hall:<br className="md:hidden" /> A Refined Balance of Technology and Nature</>
                            )}
                        </h2>

                        <div className="w-full max-w-full text-[14px] md:text-[17px] font-extralight text-gray-600 leading-[1.8] tracking-[-0.01em] font-inter mb-10 md:mb-14">
                            {lang === 'kr' ? (
                                <div className="break-keep">
                                    <p className="mb-4">
                                        IOTA Two의 오피스 EV 홀은 글로벌 기업들이 추구하는 정제된 감성과 기능적 완결성을 동시에 담았습니다.<br className="hidden md:block" />
                                        벽면을 감싸는 자연석 질감의 엄선된 소재는 차가운 금속과 빛의 반사 속에서도 따뜻한 안정감을 전하며, 수직적으로 구성된 공간 리듬은 기술과 인간, 속도와 여유의 균형을 표현합니다.<br className="hidden md:block" />
                                        이는 단순한 이동 공간을 넘어, 브랜드의 품격과 공간의 정체성을 각인시키는 시퀀스로 기능합니다.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="mb-4">
                                        The Office Elevator Hall of IOTA Two conveys the refined sensibility and technical precision favored by global technology companies.<br className="hidden md:block" />
                                        The carefully selected natural materials envelop the walls, creating warmth amid the sleek reflection of metal and light.<br className="hidden md:block" />
                                        Its vertical rhythm expresses the balance between technology and humanity, efficiency and composure.<br className="hidden md:block" />
                                        More than a passageway, it serves as a spatial sequence that defines identity and instills calm sophistication from the moment of transition.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tenth Image Area (Width 800px) */}
                    <div className="w-[800px] max-w-full mb-12 md:mb-24">
                        <HoverImage src="./img/iotatwo_13.jpg" alt="Office Elevator Hall Focus" />
                    </div>

                </div>

                {/* Full Width Image Area (iotatwo_14) */}
                <div className="w-full">
                    <HoverImage src="./img/iotatwo_14.jpg" alt="Office Elevator Hall View" className="w-full h-auto object-cover block" wrapperClassName="w-full relative overflow-hidden group cursor-pointer" />
                </div>

                {/* Closing dummy div just for regex to match properly and structure consistency */}
                <div className="hidden">
\2"""

new_content = re.sub(pattern1, repl1, content, flags=re.DOTALL)
new_content = re.sub(pattern2, repl2, new_content, flags=re.DOTALL)

with open('src/components/SectionIotaTwo.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Files updated successfully")
