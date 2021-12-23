type ExpiredItem = {
  value: any;
  expiredIn: number;
};

type LocalStorageType = {
  get(field: string): any;
  set(field: string, value: any, expiredIn?: number): void;
  remove(field: string): void;
};

export const LocalStorage: LocalStorageType = {
  get(field) {
    const unparsedItem = localStorage.getItem(field);
    if (!unparsedItem) {
      return null;
    }

    const item: string | ExpiredItem = JSON.parse(unparsedItem);

    if (typeof item !== "string" && +item?.expiredIn < Date.now() / 1000) {
      this.remove(field);
      return null;
    }

    return item;
  },

  set(field, value, expiredIn?) {
    if (expiredIn) {
      const currentExpiredIn: number = Date.now() / 1000 + expiredIn;
      const item: ExpiredItem = {
        value,
        expiredIn: currentExpiredIn,
      };

      localStorage.setItem(field, JSON.stringify(item));

      return;
    }

    localStorage.setItem(field, value.toString());
  },

  remove(field) {
    localStorage.removeItem(field);
  },
};
