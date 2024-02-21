import { AtributoNivel } from "./atributo-nivel.model";

export class PlanetaInfo {
    id: string;
    descripcion: string;
    landingPage: string;
    planeta: string;
    atributos: AtributoNivel[] = [];
}