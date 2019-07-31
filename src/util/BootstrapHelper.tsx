import Bootstrap from "../data/fpl/Bootstrap";

export default class BootstrapHelper {
    public static getElement(elementId: number, bootstrap?: Bootstrap) {
        if (bootstrap) {
            return bootstrap.elements.find((el) => el.id === elementId);
        }
        return undefined;
    }

    public static getPosition(elementType: number) {
        const positions = ['NA', 'GK', 'D', 'M', 'F'];
        return positions[elementType];
    }
}