import backendApi from "../api/backendApi";
import {Get_Signed_URL} from "../constants/queries/order";
import {errorToast} from "./toasts";

function makeXhrRequests(file: any, url: any): Promise<any>{
    return new Promise(function (resolve, reject){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        xhr.send(file);
    });
}

export function uploadFileToS3(files: Array<any>, url: Array<any>): Array<Promise<any>>{
    return files.filter((file: any) => (file!==undefined)).map((file, i) => {
        console.log("Uploading to", url[i]);
        return makeXhrRequests(file, url[i]);
    })
}

export function uploadSingleFileToS3(file: any, url: any): Promise<any>{
    return makeXhrRequests(file, url);
}

export const getSignedUrl = async (data: any) => {
    console.log("Data is", data);
    const getUrl = await backendApi.post('/', {
        query: Get_Signed_URL,
        variables: {
            docType: data
        }
    });
    if (getUrl.data.errors?.length) throw new Error(getUrl.data.errors[0].message);
    return getUrl.data.data.getSignedUrl.url;
}
