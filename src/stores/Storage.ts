class StorageAccount {

    public sync: boolean = false;
    public storageType: string = 'local';

    public walletData: string[] = [
        "nara",
        "walletType",
        "validateEncryptString",
        "sync",
    ];


    constructor(sync?: boolean) {
        this.syncChange(sync || false);
    }

    public syncChange(sync?: boolean) {
        this.sync = sync || false;
        this.storageType = this.sync ? 'sync' : 'local';
    }

    public async getStateData() {
        let stateData = <any>{};
        try {
            let result = await chrome.storage[this.storageType].get(this.walletData);
            stateData = result;
        } catch (e) {
            this.walletData.forEach(keyName => {
                let value = localStorage.getItem(keyName);
                if (value) {
                    (stateData as any)[keyName] = value;
                }
            })
        }
        return stateData;
    }

    public async set(param: object) {
        let keys = Object.keys(param);
        let values = Object.values(param);

        keys.forEach((keyName, index) => {
            let value = (param as any)[keyName];
            if (value.constructor === Object || value.constructor === Array) {
                (param as any)[keyName] = JSON.stringify(value);
            }
        });

        try {
            await chrome.storage[this.storageType].set(param);
        } catch (error) {
            console.log(error);
            keys.forEach((keyName, index) => {
                localStorage.setItem(keyName, (param as any)[keyName]);
            });
        }

    }
}

export {StorageAccount};


















