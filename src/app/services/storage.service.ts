import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private store: Storage | null = null;
    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        const storage = await this.storage.create();
        this.store = storage;
    }
    async removeKey(key: string) {
        return await this.store.remove(key);
    }

    async set(key: string, value: any) {
        return await this.store?.set(
            key,
            value,
        );
    }

    async get(key: string) {
        return await this.store?.get(key);
    }

    getData(key: string) {
        return this.storage.get(key);
    }

    addItem(key, item, limit = 0) {
        return new Promise(async (resolve) => {
            const items = await this.storage.get(key);
            if (!items || !Array.isArray(items)) {
                this.storage.set(key, [item]);
            } else {
                items.push(item);
                if (limit > 0){
                    const newItems = items.slice(Math.max(items.length - limit, 0));
                    this.storage.set(key, newItems);
                } else {
                    this.storage.set(key, items);
                }
            }
        });
    }
}
