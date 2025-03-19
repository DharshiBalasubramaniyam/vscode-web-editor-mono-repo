
import styled from "@emotion/styled";

export namespace FormStyles {
    export const Container = styled.div`
        display: flex;
        flex-direction: column;
        gap: 18px;
        height: calc(100vh - 100px);
        overflow-y: scroll;
        padding: 16px;
    `;

    export const Row = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    `;

    export const Footer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-top: 8px;
        width: 100%;
    `;

    export const Title = styled.div`
        font-size: 14px;
        margin-top: 12px;
    `;

    export const DrawerContainer = styled.div`
        width: 400px;
    `;

    export const ButtonContainer = styled.div`
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: flex-end;
    `;

    export const DataMapperRow = styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 10px 0;
    `;
}
