export default function getLanguageName(languageCode) {
  const displayName = new Intl.DisplayNames(["vi"], { type: "language" });
  return displayName.of(languageCode);
}
