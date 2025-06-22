export function NumeroALetras(cantidad : any) {
    let numero = '';
    cantidad = parseFloat(cantidad);

    if (cantidad === 0.00 || cantidad === 0) {
        return "CERO con 00/100 SOLES";
    } else {
        const ent = String(cantidad).split(".");
        const arreglo = separar_split(ent[0]);
        const longitud = arreglo.length;

        if (longitud === 1) {
            numero = unidades(arreglo[0]);
        } else if (longitud === 2) {
            numero = decenas(arreglo[0], arreglo[1]);
        } else if (longitud === 3) {
            numero = centenas(arreglo[0], arreglo[1], arreglo[2]);
        } else if (longitud === 4) {
            numero = unidadesdemillar(arreglo[0], arreglo[1], arreglo[2], arreglo[3]);
        } else if (longitud === 5) {
            numero = decenasdemillar(arreglo[0], arreglo[1], arreglo[2], arreglo[3], arreglo[4]);
        } else if (longitud === 6) {
            numero = centenasdemillar(arreglo[0], arreglo[1], arreglo[2], arreglo[3], arreglo[4], arreglo[5]);
        }

        ent[1] = ent[1] && /^\d+$/.test(ent[1]) ? ent[1] : '00';

        return `${numero} con ${ent[1]}/100 SOLES`;
    }
}

export function unidades(unidad : any) {
    const unidades = ['UN ', 'DOS ', 'TRES ', 'CUATRO ', 'CINCO ', 'SEIS ', 'SIETE ', 'OCHO ', 'NUEVE '];
    return unidades[parseInt(unidad) - 1];
}

export function decenas(decena : any, unidad : any) {
    const diez = ['ONCE ', 'DOCE ', 'TRECE ', 'CATORCE ', 'QUINCE ', 'DIECISEIS ', 'DIECISIETE ', 'DIECIOCHO ', 'DIECINUEVE '];
    const decenas = ['DIEZ ', 'VEINTE ', 'TREINTA ', 'CUARENTA ', 'CINCUENTA ', 'SESENTA ', 'SETENTA ', 'OCHENTA ', 'NOVENTA '];

    if (decena === '0' && unidad === '0') {
        return "";
    } else if (decena === '0' && unidad !== '0') {
        return unidades(unidad);
    } else if (decena === '1') {
        return unidad === '0' ? decenas[0] : diez[parseInt(unidad) - 1];
    } else if (decena === '2') {
        if (unidad === '0') {
            return decenas[parseInt(decena) - 1];
        } else if (unidad === '1') {
            return "VEINTIUNO";
        } else {
            return `VEINTI${unidades(unidad)}`;
        }
    } else {
        if (unidad === '0') {
            return `${decenas[parseInt(decena) - 1]} `;
        } else if (unidad === '1') {
            return `${decenas[parseInt(decena) - 1]}Y UNO`;
        } else {
            return `${decenas[parseInt(decena) - 1]}Y ${unidades(unidad)}`;
        }
    }
}

export function centenas(centena : any, decena : any, unidad : any) {
    const centenas = ["CIENTO ", "DOSCIENTOS ", "TRESCIENTOS ", "CUATROCIENTOS ", "QUINIENTOS ", "SEISCIENTOS ",
                      "SETECIENTOS ", "OCHOCIENTOS ", "NOVECIENTOS "];

    if (centena === '0' && decena === '0' && unidad === '0') {
        return "";
    } else if (centena === '1' && decena === '0' && unidad === '0') {
        return "CIEN ";
    } else if (centena === '0' && decena === '0' && unidad !== '0') {
        return unidades(unidad);
    } else if (decena === '0' && unidad === '0') {
        return centenas[parseInt(centena) - 1] + "";
    } else if (decena === '0') {
        return centenas[parseInt(centena) - 1] + decenas(decena, unidad).replace(" Y ", " ");
    } else if (centena === '0') {
        return decenas(decena, unidad);
    } else {
        return centenas[parseInt(centena) - 1] + decenas(decena, unidad);
    }
}

export function unidadesdemillar(unimill : any, centena : any, decena : any, unidad : any) {
    let numero = `${unidades(unimill)}MIL ${centenas(centena, decena, unidad)}`;
    numero = numero.replace("UN MIL ", "MIL ");
    return unidad === '0' ? numero.replace(" Y ", " ") : numero;
}

export function decenasdemillar(decemill : any, unimill : any, centena : any, decena : any, unidad : any) {
    return `${decenas(decemill, unimill)}MIL ${centenas(centena, decena, unidad)}`;
}

export function centenasdemillar(centenamill: any, decemill: any, unimill: any, centena: any, decena: any, unidad: any) {
    return `${centenas(centenamill, decemill, unimill)}MIL ${centenas(centena, decena, unidad)}`;
}

export function separar_split(texto: any) {
    return Array.from(texto);
}