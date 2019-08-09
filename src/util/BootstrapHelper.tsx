import { BootstrapStatic } from "../data/fpl/BootstrapStatic";

export default class BootstrapHelper {
    public static getElement(elementId: number, bootstrapStatic?: BootstrapStatic) {
        if (bootstrapStatic) {
            return bootstrapStatic.elements.find((el) => el.id === elementId);
        }
        return undefined;
    }

    public static getPosition(elementType: number) {
        const positions = ['NA', 'GK', 'D', 'M', 'F'];
        return positions[elementType];
    }
}