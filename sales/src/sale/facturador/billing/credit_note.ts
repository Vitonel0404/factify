import * as fs from "fs";
import * as path from "path";
import { NumeroALetras } from "../utils/letterNumber";
import { datosCodigoTributo, fnTaxAmount, price_amount } from "../utils/multipleVars";
import * as Handlebars from "handlebars";

export async function  create_credit_note_xml(routeFile: any, empresa: any, cliente: any, venta: any, detalle: any) {
    const xml = await desarrollo_xml(empresa, cliente, venta, detalle);
    const _root = path.resolve(__dirname, '..', '..', '..', '..');
    const doc = 'NOTA_CREDITO'
    const route = path.join(_root, 'media', 'facturador', doc, 'XML', routeFile + '.xml');
    fs.writeFileSync(route, xml);
}

async function desarrollo_xml(empresa : any , cliente : any, venta : any, detalles : any) {
    const totalVenta = venta['total_a_pagar'].split('.');
    const TotalLetras = NumeroALetras(totalVenta[0]);
    venta['total_letras'] = TotalLetras;
    const codigo_moneda = 'PEN';

    const total_igv = venta['total_igv'] !== null ? venta['total_igv'] : 0.0;
    // const total_gravada = venta['total_gravada'] || 0;
    // const total_exonerada = venta['total_exonerada'] || 0;
    // const total_inafecta = venta['total_inafecta'] || 0;

    // const total_line_extension = (parseFloat(total_gravada) + parseFloat(total_exonerada) + parseFloat(total_inafecta)).toFixed(2);
    const total_a_pagar = parseFloat(venta['total_a_pagar']).toFixed(2);

    const detallesPreparados = detalles.map((element : any, index : any) => {
        const codigos = datosCodigoTributo(element['tipo_igv_codigo']);
        const priceAmount = price_amount(parseFloat(element['precio_base']), parseInt(codigos['codigo_tributo']), parseFloat(venta['igv_value']) / 100, 0, 0);
        const taxAmount = fnTaxAmount(parseInt(element['cantidad']), parseFloat(element['precio_base']), parseInt(codigos['codigo_tributo']), parseFloat(venta['igv_value']) / 100, 0);
        const base_priceAmount = parseFloat(element['precio_base'])
        return {
            ...element,
            line_extension_amount: (parseFloat(element['cantidad']) * parseFloat(element['precio_base'])).toFixed(2),
            price_amount: Math.abs(parseFloat(priceAmount)).toFixed(6),
            base_priceAmount : (base_priceAmount).toFixed(6),
            tax_amount: (taxAmount).toFixed(2),
            taxable_amount: (parseFloat(element['precio_base']) * parseFloat(element['cantidad'])).toFixed(2),
            price_type_code: codigos['codigo_tributo'] === 9996 ? '02' : '01',
            percent: (parseFloat(venta['igv_value'])).toFixed(2),
            codigo_tributo: codigos['codigo_tributo'],
            nombre: codigos['nombre'],
            codigo_internacional: codigos['codigo_internacional'],
            index: index + 1,
            codigo_moneda : codigo_moneda
        };
    });

    const _facturador = path.resolve(__dirname, '..');
    const _template = path.join(_facturador, 'templates','credit_note.hbs');
    
    const xmlTemplate = fs.readFileSync(_template, 'utf-8');
    const template = Handlebars.compile(xmlTemplate);

    const xml = template({
        empresa,
        cliente,
        venta,
        detalles: detallesPreparados,
        total_igv,
        codigo_moneda,
        // total_line_extension,
        total_a_pagar
    });

    return xml;
}