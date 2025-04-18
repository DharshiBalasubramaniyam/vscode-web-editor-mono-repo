
import {
    AbstractModelFactory,
    BaseModel,
    BaseModelGenerics,
    CanvasEngine,
    CanvasEngineListener,
    CanvasModel,
    CanvasModelGenerics,
    FactoryBank,
    FactoryBankListener,
    LayerModel,
    LayerModelGenerics,
} from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import { LOADING_OVERLAY } from "../../resources/constants";

export interface OverlayLayerModelGenerics extends LayerModelGenerics {
    ENGINE: DiagramEngine;
}

export class OverlayLayerModel<G extends OverlayLayerModelGenerics = OverlayLayerModelGenerics> extends LayerModel<G> {
    constructor() {
        super({
            type: LOADING_OVERLAY,
        });
    }

    getChildModelFactoryBank(
        _engine: G["ENGINE"],
    ): FactoryBank<
        AbstractModelFactory<
            BaseModel<BaseModelGenerics>,
            CanvasEngine<CanvasEngineListener, CanvasModel<CanvasModelGenerics>>
        >,
        FactoryBankListener<
            AbstractModelFactory<
                BaseModel<BaseModelGenerics>,
                CanvasEngine<CanvasEngineListener, CanvasModel<CanvasModelGenerics>>
            >
        >
    > {
        throw new Error("Method not implemented.");
    }
}
