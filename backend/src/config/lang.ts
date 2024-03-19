function langToId(lang: String) {
  switch (lang) {
    case "cpp":
      return 54;
    case "java":
      return 91;
    case "js":
      return 93;
    case "py":
      return 92;
    default:
      return -1;
  }
}

export default langToId;
