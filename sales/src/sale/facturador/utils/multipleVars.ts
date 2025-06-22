export function datosCodigoTributo(codigo: any) {
    const datos = {};
    if (codigo === 10) {
        datos['codigo_tributo'] = '1000';
        datos['codigo_internacional'] = 'VAT';
        datos['nombre'] = 'IGV';
    } else if ([11, 12, 13, '14', 15, 16, 17].includes(codigo)) {
        datos['codigo_tributo'] = '9996';
        datos['codigo_internacional'] = 'FRE';
        datos['nombre'] = 'GRA';
    } else if (codigo === 20) {
        datos['codigo_tributo'] = '9997';
        datos['codigo_internacional'] = 'VAT';
        datos['nombre'] = 'EXO';
    } else if ([21, 31, 32, 33, 34, 36, 37].includes(codigo)) {
        datos['codigo_tributo'] = '9996';
        datos['codigo_internacional'] = 'FRE';
        datos['nombre'] = 'GRA';
    } else if (codigo === 30) {
        datos['codigo_tributo'] = '9998';
        datos['codigo_internacional'] = 'FRE';
        datos['nombre'] = 'INA';
    } else if (codigo === 40) {
        datos['codigo_tributo'] = '9995';
        datos['codigo_internacional'] = 'FRE';
        datos['nombre'] = 'EXP';
    }
    return datos;
}

export function pricePriceAmount(precio_base: any, codigo_de_tributo: any) {
    const price_priceAmount = (codigo_de_tributo === 9996) ? 0.0 : precio_base;
    return price_priceAmount;
}

export function fnTaxAmount(cantidad: any, precio_base: any, codigo_de_tributo: any, percent: any, descuento = 0) {
    let taxAmount = 0;

    if (codigo_de_tributo === 1000) {
        taxAmount = cantidad * (precio_base - descuento) * percent;
    } else if (codigo_de_tributo === 9995) {
        taxAmount = 0.0;
    } else if (codigo_de_tributo === 9996) {
        taxAmount = cantidad * (precio_base / (1 + percent)) * percent;
    } else if ([9997, 9998].includes(codigo_de_tributo)) {
        taxAmount = 0.0;
    }

    return taxAmount;
}

export function price_amount(precio_base: any, codigo_de_tributo: any, percent: any, icbper: any, descuento = 0) {
    precio_base = parseFloat(precio_base);
    codigo_de_tributo = parseFloat(codigo_de_tributo);
    percent = parseFloat(percent);
    icbper = parseFloat(icbper);
    let price_amount = '';

    if (codigo_de_tributo === 1000) {
        price_amount = ((precio_base - descuento) * (1 + percent) + icbper).toFixed(2);
    } else {
        price_amount = (precio_base - descuento + icbper).toFixed(2);
    }

    return price_amount;
}