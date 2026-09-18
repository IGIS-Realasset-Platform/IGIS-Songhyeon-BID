export const formatTaskFeedStakeholder = (stakeholder) => {
  if (!stakeholder) return '';
  if (typeof stakeholder === 'string') return stakeholder.trim();
  return [
    stakeholder.companyName || stakeholder.company_name || stakeholder.name,
    stakeholder.contactName || stakeholder.contact_name,
  ].map((value) => String(value || '').trim()).filter(Boolean).join(' - ')
    || String(stakeholder.category || '').trim();
};

// The table filter compares the displayed label, not the contact object used
// by the write form. Include visible posts so older entries remain filterable.
export const buildTaskFeedStakeholderFilterOptions = (stakeholders = [], posts = []) => (
  [...new Set([
    ...stakeholders.map(formatTaskFeedStakeholder),
    ...posts.map((post) => post.stakeholderLabel || formatTaskFeedStakeholder(post.stakeholder)),
  ].filter(Boolean))]
);
