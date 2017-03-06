declare const window:any;

let ssrWindowData = new Array();
if (typeof(window) !== 'undefined' && window.DotvueInitialData){
    ssrWindowData = window.DotvueInitialData
    delete window.DotvueInitialData
}

export let ssrData = new Array()

export default class DotvueInitialData{

    data: any;

    Get () {
        return this.data;
    }

    async Set (promise: Promise<any>) {
        ssrData.push(null)
        let ssrDataIndex = ssrData.length - 1

        if (ssrWindowData.length > 0)
            this.data = ssrWindowData.shift()
        else
            this.data = await promise;

        ssrData[ssrDataIndex] = this.data
    }

}
