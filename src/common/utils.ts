export function getLocalStorage(key: string): string {
  return localStorage.getItem(key) || "";
}

export function setLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
