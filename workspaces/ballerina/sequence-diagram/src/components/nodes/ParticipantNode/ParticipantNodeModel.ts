
import { NodeTypes } from "../../../resources/constants";
import { getParticipantId } from "../../../utils/diagram";
import { Participant } from "../../../utils/types";
import { BaseNodeModel } from "../BaseNode";

export class ParticipantNodeModel extends BaseNodeModel {
    readonly participant: Participant;
    constructor(participant: Participant) {
        super({
            id: getParticipantId(participant),
            type: NodeTypes.PARTICIPANT_NODE,
        });
        this.participant = participant;
    }
}
