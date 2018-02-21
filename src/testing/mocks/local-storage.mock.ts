export class LocalStorageServiceMock {
  get<T>(key: string): T {
    return null;
  };

  set(key: string, value: any): boolean {
    return true;
  };

  clearAll(): boolean {
    return true;
  };
}
