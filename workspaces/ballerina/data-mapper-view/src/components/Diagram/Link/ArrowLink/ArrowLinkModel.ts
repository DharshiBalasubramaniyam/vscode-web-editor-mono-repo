import { DefaultLinkModel } from "@projectstorm/react-diagrams";
import { Point } from "@projectstorm/geometry";

export class ArrowLinkModel extends DefaultLinkModel {
    constructor() {
      super({
        type: 'arrow'
      });
    }

    getSVGPath(): string {
		if (this.points.length === 2) {
			const sourcePoint: Point = new Point(this.getFirstPoint().getPosition().x,
				this.getFirstPoint().getPosition().y);
			const targetPoint: Point = new Point(this.getLastPoint().getPosition().x,
				this.getLastPoint().getPosition().y - 5);

            return `M${sourcePoint.x},${sourcePoint.y} L${sourcePoint.x},${targetPoint.y}`;
		}
	}
}
