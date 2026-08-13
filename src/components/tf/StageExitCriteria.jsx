import { Square } from 'lucide-react';

const StageExitCriteria = ({ criteria }) => (
  <section className="border border-[#0057b8] bg-[#0057b8] text-[#E5E5E5]">
    <div className="grid lg:grid-cols-[0.42fr_1.58fr]">
      <header className="border-b border-white/20 p-5 lg:border-b-0 lg:border-r lg:p-6">
        <h2 className="text-lg font-black">다음 단계 진입 기준</h2>
        <p className="mt-3 text-xs font-medium leading-6 text-blue-100">아래 네 가지가 확인되면 서비스 기회 정의로 이동합니다.</p>
      </header>
      <div className="grid md:grid-cols-2">
        {criteria.map((criterion, index) => (
          <div key={criterion} className={`flex items-start gap-3 p-5 ${index % 2 === 0 ? 'md:border-r md:border-white/20' : ''} ${index < 2 ? 'border-b border-white/20' : ''}`}>
            <Square size={14} className="mt-0.5 shrink-0 text-blue-200" />
            <p className="text-xs font-bold leading-6">{criterion}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StageExitCriteria;

