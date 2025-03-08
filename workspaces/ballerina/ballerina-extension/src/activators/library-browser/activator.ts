/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

// import { BallerinaExtension } from "../../core";
// import https from "https";
import {
    LibraryDataResponse,
    LibrariesListResponse,
    LibraryKind,
    LibrarySearchResponse
} from '@dharshi/ballerina-core';

export const cachedLibrariesList = new Map<string, LibrariesListResponse>();
export const cachedSearchList = new Map<string, LibrarySearchResponse>();
export const cachedLibraryData = new Map<string, LibraryDataResponse>();
export const DIST_LIB_LIST_CACHE = "DISTRIBUTION_LIB_LIST_CACHE";
export const LANG_LIB_LIST_CACHE = "LANG_LIB_LIST_CACHE";
export const STD_LIB_LIST_CACHE = "STD_LIB_LIST_CACHE";
export const LIBRARY_SEARCH_CACHE = "LIBRARY_SEARCH_CACHE";
const BAL_VERSION_CAPTURING_REGEXP = /\/ballerina-(\d{4}.\d+.\d+)/g;
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

// const balVersion = "slbeta6"; // Default version
// const BASE_URL = "https://api.central.ballerina.io";
const BASE_URL = "http://localhost:9091/bala";
// const DOC_API_PATH = "/2.0/docs";
// let LibrariesListEndpoint = `${BASE_URL}${DOC_API_PATH}/stdlib/${balVersion}`;
// let LibrariesSearchEndpoint = `${LibrariesListEndpoint}/search`;

export function activate() {
    // const balHome = ballerinaExtInstance.getBallerinaHome();
    // const match = BAL_VERSION_CAPTURING_REGEXP.exec(balHome);
    // if (match) {
    //     [, balVersion] = match;
    //     LibrariesListEndpoint = DOC_API_PATH + '/stdlib/' + balVersion;
    //     LibrariesSearchEndpoint = LibrariesListEndpoint + '/search';
    // }

    // LibrariesListEndpoint = DOC_API_PATH + '/stdlib/' + balVersion;
    // LibrariesSearchEndpoint = LibrariesListEndpoint + '/search';
}

export async function getLibrariesList(kind?: LibraryKind): Promise<LibrariesListResponse | undefined> {

    return new Promise(async (resolve, reject) => {

        if (kind === LibraryKind.langLib && cachedLibrariesList.has(LANG_LIB_LIST_CACHE)) {
            return resolve(cachedLibrariesList.get(LANG_LIB_LIST_CACHE));
        } else if (kind === LibraryKind.stdLib && cachedLibrariesList.has(STD_LIB_LIST_CACHE)) {
            return resolve(cachedLibrariesList.get(STD_LIB_LIST_CACHE));
        } else if (cachedLibrariesList.has(DIST_LIB_LIST_CACHE)) {
            return resolve(cachedLibrariesList.get(DIST_LIB_LIST_CACHE));
        }

        try {
            const response = await fetch(`${BASE_URL}/libraryList/${kind ? kind : "all"}`, options);
            console.log("sending req to ", `${BASE_URL}/libraryList/${kind ? kind : "all"}`);

            if (!response.ok) {
                console.log(response);
                return reject(response);
            }

            const payload = await response.json();
            console.log("libraries list fetched success:", Object.keys(payload));
            return resolve(payload);
        } catch (error) {
            console.error("Error fetching libraries list:", error);
            return reject(error);
        }
    });
}

export function getAllResources(): Promise<LibrarySearchResponse | undefined> {


    return new Promise(async (resolve, reject) => {

        if (cachedSearchList.has(LIBRARY_SEARCH_CACHE)) {
            return resolve(cachedSearchList.get(LIBRARY_SEARCH_CACHE));
        }

        try {
            const response = await fetch(`${BASE_URL}/allResourses`, options);
            console.log("sending req to ", `${BASE_URL}/allResourses`);

            if (!response.ok) {
                console.log("Failed to fetch the all resources");
                return reject(response);
            }

            const payload = await response.json();
            console.log("all resources fetched success:", Object.keys(payload));
            return resolve(payload);
        } catch (error) {
            console.error("Error fetching all resources:", error);
            return reject(error);
        }

    });
}

export function getLibraryData(orgName: string, moduleName: string, version: string)
    : Promise<LibraryDataResponse | undefined> {

    return new Promise(async (resolve, reject) => {
        console.log("sending request....");
        if (cachedLibraryData.has(`${orgName}_${moduleName}_${version}`)) {
            return resolve(cachedLibraryData.get(`${orgName}_${moduleName}_${version}`));
        }

        try {
            const response = await fetch(`${BASE_URL}/librarydata/${orgName}/${moduleName}/${version}`, options);
            console.log("sending req to: ", `${BASE_URL}/librarydata/${orgName}/${moduleName}/${version}`);
            if (!response.ok) {
                console.log("Failed to fetch the libraries list");
                return reject(response);
            }

            const payload = await response.json();
            console.log("libaraies fetch success...", payload)
            cachedLibraryData.set(`${orgName}_${moduleName}_${version}`, payload);
            return resolve(payload);
        } catch (error) {
            console.error("Error fetching libraries list:", error);
            return reject(error);
        }

    });
}

export async function fetchAndCacheLibraryData() {
    // Cache the lang lib list
    getLibrariesList(LibraryKind.langLib).then((libs) => {
        if (libs && libs.librariesList.length > 0) {
            cachedLibrariesList.set(LANG_LIB_LIST_CACHE, libs);
        }
    });

    // Cache the std lib list
    getLibrariesList(LibraryKind.stdLib).then((libs) => {
        if (libs && libs.librariesList.length > 0) {
            cachedLibrariesList.set(STD_LIB_LIST_CACHE, libs);
        }
    });

    // Cache the distribution lib list (lang libs + std libs)
    getLibrariesList().then((libs) => {
        if (libs && libs.librariesList.length > 0) {
            cachedLibrariesList.set(DIST_LIB_LIST_CACHE, libs);
        }
    });

    // Cache the library search data
    getAllResources().then((data) => {
        if (data && data.modules.length > 0) {
            cachedSearchList.set(LIBRARY_SEARCH_CACHE, data);
        }
    });

}
