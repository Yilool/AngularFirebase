export class libro {
    id: string;
    titulo: string;
    autor: string;
    genero: string;
    prestado: boolean;

    constructor () {
        this.prestado = false;
    }
}