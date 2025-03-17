
import { PersistERModel } from "../../interfaces/extended-lang-client";

export interface PersistDiagramAPI {
    getPersistERModel: () => Promise<PersistERModel>;
    showProblemPanel: () => void;
}
