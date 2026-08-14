const leadAliases = {
  기획추진실: '기획추진센터',
  '자산·현장 지원조직': '자산·운영 담당조직',
};

export function normalizeSonghyeonTaskLead(value) {
  const lead = String(value || '').trim();
  return leadAliases[lead] || lead;
}

export function activeSonghyeonTaskLeads(tasks = []) {
  return [...new Set(tasks.map((task) => normalizeSonghyeonTaskLead(task.leadDept)).filter(Boolean))];
}
