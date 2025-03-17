import * as React from "react";

export const AZURE_COSMOS_DB_LOGO_WIDTH = 20;
export const AZURE_COSMOS_DB_LOGO_HEIGHT = 20;

export function AzureCosmosDBLogo(props: { cx?: number, cy?: number, scale?: number }) {
    const { cx, cy, scale } = props;
    return (
        <svg transform={scale ? `scale(${scale})` : ''} x={!cx ? 0 : cx - (AZURE_COSMOS_DB_LOGO_WIDTH / 2)} y={!cy ? 0 : cy - (AZURE_COSMOS_DB_LOGO_HEIGHT / 2)} width={AZURE_COSMOS_DB_LOGO_WIDTH} height={AZURE_COSMOS_DB_LOGO_HEIGHT} >
            <g id="Azure-cosmosdb" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="azure-cosmos-db" transform="translate(-1204.000000, -554.000000)" fillRule="nonzero">
                    <g id="Dropdown/Select/Default-Copy-19" transform="translate(1194.000000, 544.000000)">
                        <g id="Logo/Circle" transform="translate(10.000000, 10.000000)">
                            <path d="M9.30277335,5.6849711 C12.4514043,4.99710983 15.5046223,7.06069364 16.1725137,10.3034682 C16.8404051,13.5462428 14.8367308,16.6907514 11.6880999,17.3786127 C8.53946887,18.066474 5.48625095,16.0028902 4.81835953,12.7601156 C4.15046811,9.51734104 6.15414237,6.37283237 9.30277335,5.6849711 Z" id="Path" fill="#5AB3D9"/>
                            <g id="Group" transform="translate(4.668636, 6.372832)" fill="#98C9E2">
                                <path d="M0.149724023,6.38728324 C0.388256673,7.46820809 0.865321973,8.45086705 1.53321339,9.18786127 L3.44147459,9.18786127 C4.30019213,9.18786127 4.96808355,8.5 4.96808355,7.61560694 C4.96808355,6.73121387 4.30019213,6.0433526 3.44147459,6.0433526 L3.20294194,6.0433526 C3.25064847,5.94508671 3.25064847,5.79768786 3.25064847,5.69942197 C3.25064847,4.8150289 2.58275705,4.12716763 1.72403951,4.12716763 L0.102017493,4.12716763 C-0.041102097,4.8150289 -0.041102097,5.60115607 0.149724023,6.38728324 Z" id="Path"/>
                                <path d="M4.63413784,2.94797688 C4.63413784,3.88150289 5.34973579,4.61849711 6.25615986,4.61849711 L11.5992912,4.61849711 C11.5992912,4.42196532 11.5515847,4.17630058 11.5038782,3.97976879 C11.1699325,2.21098266 10.0726823,0.835260116 8.68919289,0 L7.97359494,0 C7.40111658,0 6.92405128,0.49132948 6.92405128,1.08092486 C6.92405128,1.17919075 6.92405128,1.27745665 6.97175781,1.37572254 L6.25615986,1.37572254 C5.34973579,1.3265896 4.63413784,2.06358382 4.63413784,2.94797688 Z" id="Path"/>
                                <path d="M11.5515847,5.84682081 L8.35524718,5.84682081 C7.63964923,5.84682081 7.06717087,6.43641618 7.06717087,7.1734104 C7.06717087,7.41907514 7.1148774,7.61560694 7.21029046,7.81213873 C6.68551863,7.95953757 6.30386639,8.5 6.30386639,9.08959538 C6.30386639,9.8265896 6.87634475,10.416185 7.5919427,10.416185 L8.45066024,10.416185 C10.2158019,9.53179191 11.3607586,7.81213873 11.5515847,5.84682081 Z" id="Path"/>
                            </g>
                            <path d="M5.86790319,4.80057803 C4.57982688,4.80057803 3.57798975,3.71965318 3.57798975,2.44219653 C3.57798975,2.19653179 3.38716363,2 3.14863098,2 C2.91009833,2 2.71927221,2.19653179 2.71927221,2.44219653 C2.71927221,3.76878613 1.66972855,4.80057803 0.42935877,4.80057803 C0.19082612,4.80057803 0,4.99710983 0,5.24277457 C0,5.48843931 0.19082612,5.6849711 0.42935877,5.6849711 C1.71743508,5.6849711 2.71927221,6.76589595 2.71927221,8.0433526 C2.71927221,8.28901734 2.91009833,8.48554913 3.14863098,8.48554913 C3.38716363,8.48554913 3.57798975,8.28901734 3.57798975,8.0433526 C3.57798975,6.71676301 4.62753341,5.6849711 5.86790319,5.6849711 C6.10643584,5.6849711 6.29726196,5.48843931 6.29726196,5.24277457 C6.29726196,5.04624277 6.10643584,4.80057803 5.86790319,4.80057803 Z" id="Path" fill="#B7D333"/>
                            <path d="M19.082612,16.9855491 C18.4147206,16.9855491 17.8422422,16.3959538 17.8422422,15.7080925 C17.8422422,15.5606936 17.7468292,15.4624277 17.6037096,15.4624277 C17.46059,15.4624277 17.3651769,15.5606936 17.3651769,15.7080925 C17.3651769,16.3959538 16.7926986,16.9855491 16.1248071,16.9855491 C15.9816876,16.9855491 15.8862745,17.083815 15.8862745,17.2312139 C15.8862745,17.3786127 15.9816876,17.4768786 16.1248071,17.4768786 C16.7926986,17.4768786 17.3651769,18.066474 17.3651769,18.7543353 C17.3651769,18.9017341 17.46059,19 17.6037096,19 C17.7468292,19 17.8422422,18.9017341 17.8422422,18.7543353 C17.8422422,18.066474 18.4147206,17.4768786 19.082612,17.4768786 C19.2257316,17.4768786 19.3211447,17.3786127 19.3211447,17.2312139 C19.3211447,17.083815 19.1780251,16.9855491 19.082612,16.9855491 Z" id="Path" fill="#2072B8"/>
                            <path d="M19.9413295,8.53468208 C19.6073838,7.45375723 18.271601,6.9132948 16.0771006,6.9132948 C15.5046223,6.9132948 14.8844374,6.96242775 14.2642525,7.01156069 C14.5981982,7.30635838 14.8844374,7.65028902 15.12297,7.99421965 C15.4569157,7.99421965 15.7431549,7.94508671 16.0771006,7.94508671 C17.9853618,7.94508671 18.8440794,8.43641618 18.9394924,8.82947977 C19.2257316,9.86127168 16.4587529,12.3179191 11.2110346,13.9884393 C8.92112111,14.7254335 6.6789142,15.1184971 4.86606606,15.1184971 C2.95780486,15.1184971 2.09908732,14.6271676 2.00367426,14.234104 C1.81284814,13.5953757 2.76697874,12.4653179 4.67523994,11.3352601 C4.67523994,10.8930636 4.770653,10.4508671 4.86606606,10.0578035 C2.33761997,11.433526 0.57247836,13.1531792 1.00183713,14.5780347 C1.33578284,15.6589595 2.67156568,16.199422 4.86606606,16.199422 C6.77432726,16.199422 9.11194723,15.7572254 11.4972737,15.0202312 C13.9303068,14.234104 16.1248071,13.2023121 17.6991226,12.0722543 C19.4642642,10.7947977 20.2275687,9.56647399 19.9413295,8.53468208 Z" id="Path" fill="#2072B8"/>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}
