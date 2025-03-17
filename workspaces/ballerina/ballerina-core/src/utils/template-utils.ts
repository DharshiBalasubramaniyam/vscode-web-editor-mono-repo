/* eslint-disable @typescript-eslint/no-explicit-any */
import * as hbs from "handlebars";
import { Parameter, templates } from "..";

async function getInsertTemplate(insertTempName: string) {
    return templates[insertTempName];
}

const hbsInstance = hbs.create();
hbsInstance.registerHelper('checkConfigurable', (listenerParam: Parameter[]) => {
    const data = listenerParam.find((params) => params.name === 'listenerConfig');
    return !!data;
});
hbsInstance.registerHelper('checkBootstrapServers', (listenerParam: Parameter[]) => {
    const data = listenerParam?.find((params) => params.name === 'bootstrapServers');
    return !!data;
});

export async function getInsertComponentSource(insertTempName: string, config: { [key: string]: any }) {
    const hbTemplate = hbsInstance.compile(await getInsertTemplate(insertTempName));
    return hbTemplate(config);
}
