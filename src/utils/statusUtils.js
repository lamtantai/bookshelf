const statusMapping = {
  "Muốn đọc": "want-to-read",
  "Đang đọc": "reading",
  "Đã đọc": "read",
};

export function getStatusInEnglish(statusInVietnamese) {
  return statusMapping[statusInVietnamese];
}

export function getStatusInVietnamese(statusInEnglish) {
  const reversedMapping = Object.fromEntries(
    Object.entries(statusMapping).map(([key, value]) => [value, key]),
  );
  return reversedMapping[statusInEnglish];
}

export function checkValidStatus(status) {
  return Object.values(statusMapping).includes(status);
}
