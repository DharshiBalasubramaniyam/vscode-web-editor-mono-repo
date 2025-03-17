import { SimpleBBox, ViewState } from ".";

export class EndViewState extends ViewState {
    public arrowFrom: 'Left' | 'Right';
    public isSend: boolean;

    constructor() {
        super();
    }
}
