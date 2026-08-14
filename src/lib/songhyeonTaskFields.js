export function normalizeSonghyeonAssignee(value) {
  return String(value || '').trim() || '미정';
}

export function storedSonghyeonTaskValue(payload, field, fallbackValue) {
  return Object.prototype.hasOwnProperty.call(payload, field) ? payload[field] : fallbackValue;
}

export function songhyeonTaskValuesEqual(field, left, right) {
  const normalize = field === 'assignee' ? normalizeSonghyeonAssignee : (value) => value;
  return JSON.stringify(normalize(left)) === JSON.stringify(normalize(right));
}

export function visibleSonghyeonTaskChanges(changes = []) {
  return changes.filter((change) => (
    change.field !== 'sourceText'
    && !songhyeonTaskValuesEqual(change.field, change.oldValue, change.newValue)
  ));
}
