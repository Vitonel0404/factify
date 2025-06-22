import * as fs from "fs";
import * as path from "path";
import { NumeroALetras } from "../utils/letterNumber";
import { datosCodigoTributo, fnTaxAmount, pricePriceAmount, price_amount } from "../utils/multipleVars";
import * as Handlebars from "handlebars";

export function create_invoice(routeFile: any, empresa: any, cliente: any, venta: any, detalle: any) {
    const xml = desarrollo_xml(empresa, cliente, venta, detalle);
    const _root = path.resolve(__dirname, '..', '..', '..', '..');


    const doc = venta.tipo_documento_codigo == '03' ? 'BOLETAS' : 'FACTURAS'
    const route = path.join(_root, 'media', 'facturador', doc, 'XML', routeFile + '.xml');

    fs.writeFileSync(route, xml);
}

// function desarrollo_xml(empresa: any, cliente: any, venta: any, detalles: any) {
//     const totalVenta = venta['total_a_pagar'].split('.');
//     const TotalLetras = NumeroALetras(totalVenta[0]);
//     venta['total_letras'] = TotalLetras;
//     const codigo_moneda = 'PEN';

//     const linea_inicio = `<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" 
//         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ccts="urn:un:unece:uncefact:documentation:2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" 
//         xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2" 
//         xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">`;
//     const linea_fin = '</Invoice>';
 
        
//     const tag_total_pago = 'LegalMonetaryTotal';

//     let xml = `<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>
//     ${linea_inicio}
//     <ext:UBLExtensions>
//         <ext:UBLExtension>
//             <ext:ExtensionContent></ext:ExtensionContent>
//         </ext:UBLExtension>
//     </ext:UBLExtensions>
//     <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
//     <cbc:CustomizationID schemeAgencyName="PE:SUNAT">2.0</cbc:CustomizationID>
//     <cbc:ID>${venta["serie"]}-${venta["numero"]}</cbc:ID>
//     <cbc:IssueDate>${venta["fecha_emision"]}</cbc:IssueDate>
//     <cbc:IssueTime>${venta["hora_emision"]}</cbc:IssueTime>`;

//     if (venta["fecha_vencimiento"] !== null) {
//         xml += `
//     <cbc:DueDate>${venta["fecha_vencimiento"]}</cbc:DueDate>
//     `;
//     }

//     xml += `
//     <cbc:InvoiceTypeCode listID="0101" listAgencyName="PE:SUNAT" listName="Tipo de Documento" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01" name="Tipo de Operacion" listSchemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo51">${venta["tipo_documento_codigo"]}</cbc:InvoiceTypeCode>
//     <cbc:Note languageLocaleID="1000">${venta["total_letras"]}</cbc:Note>
//     <cbc:DocumentCurrencyCode listID="ISO 4217 Alpha" listName="Currency" listAgencyName="United Nations Economic Commission for Europe">${codigo_moneda}</cbc:DocumentCurrencyCode>`;

//     xml += `
//     <cac:Signature>
//         <cbc:ID>${empresa['ruc']}</cbc:ID>
//         <cac:SignatoryParty>
//             <cac:PartyIdentification>
//                 <cbc:ID>${empresa['ruc']}</cbc:ID>
//             </cac:PartyIdentification>
//             <cac:PartyName>
//                 <cbc:Name>${empresa['razon_social']}</cbc:Name>
//             </cac:PartyName>
//         </cac:SignatoryParty>
//         <cac:DigitalSignatureAttachment>
//             <cac:ExternalReference>
//                 <cbc:URI>${empresa['ruc']}</cbc:URI>
//             </cac:ExternalReference>
//         </cac:DigitalSignatureAttachment>
//     </cac:Signature>
//     <cac:AccountingSupplierParty>
//         <cac:Party>
//             <cac:PartyIdentification>
//                 <cbc:ID schemeID="6">${empresa['ruc']}</cbc:ID>
//             </cac:PartyIdentification>
//             <cac:PartyName>
//                 <cbc:Name>${empresa['nombre_comercial']}</cbc:Name>
//             </cac:PartyName>
//             <cac:PartyLegalEntity>
//                 <cbc:RegistrationName>${empresa['razon_social']}</cbc:RegistrationName>
//                 <cac:RegistrationAddress>
//                     <cbc:ID schemeName="Ubigeos" schemeAgencyName="PE:INEI">${empresa['ubigeo']}</cbc:ID>
//                     <cbc:AddressTypeCode listAgencyName="PE:SUNAT" listName="Establecimientos anexos">0000</cbc:AddressTypeCode>
//                     <cbc:CityName>${empresa['provincia']}</cbc:CityName>
//                     <cbc:CountrySubentity>${empresa['departamento']}</cbc:CountrySubentity>
//                     <cbc:District>${empresa['distrito']}</cbc:District>
//                     <cac:AddressLine>
//                         <cbc:Line>${empresa['domicilio_fiscal']}</cbc:Line>
//                     </cac:AddressLine>
//                     <cac:Country>
//                         <cbc:IdentificationCode listID="ISO 3166-1" listAgencyName="United Nations Economic Commission for Europe" listName="Country">PE</cbc:IdentificationCode>
//                     </cac:Country>
//                 </cac:RegistrationAddress>
//             </cac:PartyLegalEntity>
//         </cac:Party>
//     </cac:AccountingSupplierParty>
//     <cac:AccountingCustomerParty>
//         <cac:Party>
//             <cac:PartyIdentification>
//                 <cbc:ID schemeID="${cliente['codigo_tipo_entidad']}" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${cliente['numero_documento']}</cbc:ID>
//             </cac:PartyIdentification>
//             <cac:PartyLegalEntity>
//                 <cbc:RegistrationName>${cliente['razon_social_nombres']}</cbc:RegistrationName>
//             </cac:PartyLegalEntity>
//         </cac:Party>
//     </cac:AccountingCustomerParty>`;

//     // Forma de pago  --  INICIO
//     xml += `
//     <cac:PaymentTerms>
//         <cbc:ID>FormaPago</cbc:ID>
//         <cbc:PaymentMeansID>Contado</cbc:PaymentMeansID>
//     </cac:PaymentTerms>`;
//     // Forma de pago  --  FIN

//     const total_igv = venta['total_igv'] !== null ? venta['total_igv'] : 0.0;

//     xml += `
//     <cac:TaxTotal>
//         <cbc:TaxAmount currencyID="${codigo_moneda}">${total_igv}</cbc:TaxAmount>`;

//     if (venta['total_gravada'] !== null && venta['total_gravada'] !== '') {
//         xml += `
//         <cac:TaxSubtotal>
//             <cbc:TaxableAmount currencyID="${codigo_moneda}">${venta['total_gravada']}</cbc:TaxableAmount>
//             <cbc:TaxAmount currencyID="${codigo_moneda}">${total_igv}</cbc:TaxAmount>
//             <cac:TaxCategory>
//                 <cac:TaxScheme>
//                     <cbc:ID schemeName="Codigo de tributos" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05">1000</cbc:ID>
//                     <cbc:Name>IGV</cbc:Name>
//                     <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
//                 </cac:TaxScheme>
//             </cac:TaxCategory>
//         </cac:TaxSubtotal>`;
//     }

//     if (venta['total_exonerada'] !== null && venta['total_exonerada'] !== '') {
//         xml += `
//         <cac:TaxSubtotal>
//             <cbc:TaxableAmount currencyID="${codigo_moneda}">${venta['total_exonerada']}</cbc:TaxableAmount>
//             <cbc:TaxAmount currencyID="${codigo_moneda}">0.00</cbc:TaxAmount>
//             <cac:TaxCategory>
//                 <cac:TaxScheme>
//                     <cbc:ID schemeName="Codigo de tributos" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05">9997</cbc:ID>
//                     <cbc:Name>EXO</cbc:Name>
//                     <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
//                 </cac:TaxScheme>
//             </cac:TaxCategory>
//         </cac:TaxSubtotal>`;
//     }

//     if (venta['total_inafecta'] !== null && venta['total_inafecta'] !== '') {
//         xml += `
//         <cac:TaxSubtotal>
//             <cbc:TaxableAmount currencyID="${codigo_moneda}">${venta['total_inafecta']}</cbc:TaxableAmount>
//             <cbc:TaxAmount currencyID="${codigo_moneda}">0.00</cbc:TaxAmount>
//             <cac:TaxCategory>
//                 <cac:TaxScheme>
//                     <cbc:ID schemeName="Codigo de tributos" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05">9998</cbc:ID>
//                     <cbc:Name>INA</cbc:Name>
//                     <cbc:TaxTypeCode>FRE</cbc:TaxTypeCode>
//                 </cac:TaxScheme>
//             </cac:TaxCategory>
//         </cac:TaxSubtotal>
//         `;
//     }

//     xml += `
//     </cac:TaxTotal>`;

//     const total_gravada = venta['total_gravada'] || 0;
//     const total_exonerada = venta['total_exonerada'] || 0;
//     const total_inafecta = venta['total_inafecta'] || 0;

//     xml += `
//     <cac:${tag_total_pago}>
//         <cbc:LineExtensionAmount currencyID="${codigo_moneda}">${(parseFloat(total_gravada) + parseFloat(total_exonerada) + parseFloat(total_inafecta)).toFixed(2)}</cbc:LineExtensionAmount>
//         <cbc:TaxInclusiveAmount currencyID="${codigo_moneda}">${parseFloat(venta['total_a_pagar']).toFixed(2)}</cbc:TaxInclusiveAmount>
//         <cbc:AllowanceTotalAmount currencyID="${codigo_moneda}">0.00</cbc:AllowanceTotalAmount>
//         <cbc:ChargeTotalAmount currencyID="${codigo_moneda}">0.00</cbc:ChargeTotalAmount>
//         <cbc:PrepaidAmount currencyID="${codigo_moneda}">0.00</cbc:PrepaidAmount>
//         <cbc:PayableAmount currencyID="${codigo_moneda}">${parseFloat(venta['total_a_pagar']).toFixed(2)}</cbc:PayableAmount>
//     </cac:${tag_total_pago}>
//         `;

//     let i = 1;
//     const percent = parseFloat(venta['igv_value']) / 100;

//     for (const element of detalles) {
//         let icbper = 0.00;

//         // Suponiendo que datosCodigoTributo, pricePriceAmount y fnTaxAmount son funciones definidas previamente
//         const codigos = datosCodigoTributo(element['tipo_igv_codigo']);

//         const descuento = 0;
//         const priceAmount = price_amount(parseFloat(element['precio_base']), parseInt(codigos['codigo_tributo']), percent, icbper, descuento);
//         const PriceTypeCode = codigos['codigo_tributo'] === 9996 ? '02' : '01';

//         const taxAmount = fnTaxAmount(parseInt(element['cantidad']), parseFloat(element['precio_base']), parseInt(codigos['codigo_tributo']), percent, descuento);
//         const price_priceAmount = element['precio_base'];

//         xml += `
//     <cac:InvoiceLine>
//         <cbc:ID>${i}</cbc:ID>
//         <cbc:InvoicedQuantity unitCode="NIU">${(parseFloat(element['cantidad'])).toFixed(2)}</cbc:InvoicedQuantity>
//         <cbc:LineExtensionAmount currencyID="${codigo_moneda}">${(parseFloat(element['cantidad']) * parseFloat(element['precio_base'])).toFixed(2)}</cbc:LineExtensionAmount>
//         <cac:PricingReference>
//             <cac:AlternativeConditionPrice>
//                 <cbc:PriceAmount currencyID="${codigo_moneda}">${Math.abs(parseFloat(priceAmount)).toFixed(6)}</cbc:PriceAmount>
//                 <cbc:PriceTypeCode listName="Tipo de Precio" listAgencyName="PE:SUNAT" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16">${PriceTypeCode}</cbc:PriceTypeCode>
//             </cac:AlternativeConditionPrice>
//         </cac:PricingReference>
//         <cac:TaxTotal>
//             <cbc:TaxAmount currencyID="${codigo_moneda}">${(taxAmount + icbper * parseFloat(element['cantidad'])).toFixed(2)}</cbc:TaxAmount>
//             <cac:TaxSubtotal>
//                 <cbc:TaxableAmount currencyID="${codigo_moneda}">${(parseFloat(element['precio_base']) * parseFloat(element['cantidad'])).toFixed(2)}</cbc:TaxableAmount>
//                 <cbc:TaxAmount currencyID="${codigo_moneda}">${taxAmount.toFixed(2)}</cbc:TaxAmount>
//                 <cac:TaxCategory>
//                     <cbc:Percent>${(percent * 100).toFixed(2)}</cbc:Percent>
//                     <cbc:TaxExemptionReasonCode>${element['tipo_igv_codigo']}</cbc:TaxExemptionReasonCode>
//                     <cac:TaxScheme>
//                         <cbc:ID>${codigos['codigo_tributo']}</cbc:ID>
//                         <cbc:Name>${codigos['nombre']}</cbc:Name>
//                         <cbc:TaxTypeCode>${codigos['codigo_internacional']}</cbc:TaxTypeCode>
//                     </cac:TaxScheme>
//                 </cac:TaxCategory>
//             </cac:TaxSubtotal>
//         </cac:TaxTotal>
//         <cac:Item>
//             <cbc:Description>${element['producto']}</cbc:Description>
//             <cac:SellersItemIdentification>
//                 <cbc:ID>${element['codigo_producto']}</cbc:ID>
//             </cac:SellersItemIdentification>
//             <cac:CommodityClassification>
//                 <cbc:ItemClassificationCode>31201501</cbc:ItemClassificationCode>
//             </cac:CommodityClassification>
//         </cac:Item>
//         <cac:Price>
//             <cbc:PriceAmount currencyID="${codigo_moneda}">${Math.abs(parseFloat(price_priceAmount)).toFixed(6)}</cbc:PriceAmount>
//         </cac:Price>
//     </cac:InvoiceLine>`;
//         i += 1;
//     }

//     xml += `
// ${linea_fin}
// `;

//     return xml;
// }

function desarrollo_xml(empresa : any , cliente : any, venta : any, detalles : any) {
    const totalVenta = venta['total_a_pagar'].split('.');
    const TotalLetras = NumeroALetras(totalVenta[0]);
    venta['total_letras'] = TotalLetras;
    const codigo_moneda = 'PEN';

    const total_igv = venta['total_igv'] !== null ? venta['total_igv'] : 0.0;
    const total_gravada = venta['total_gravada'] || 0;
    const total_exonerada = venta['total_exonerada'] || 0;
    const total_inafecta = venta['total_inafecta'] || 0;

    const total_line_extension = (parseFloat(total_gravada) + parseFloat(total_exonerada) + parseFloat(total_inafecta)).toFixed(2);
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
    const _template = path.join(_facturador, 'templates','invoice.hbs');
    const xmlTemplate = fs.readFileSync(_template, 'utf-8');
    const template = Handlebars.compile(xmlTemplate);

    const xml = template({
        empresa,
        cliente,
        venta,
        detalles: detallesPreparados,
        total_igv,
        codigo_moneda,
        total_line_extension,
        total_a_pagar
    });

    return xml;
}