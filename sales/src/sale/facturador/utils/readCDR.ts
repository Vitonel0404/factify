import * as fs from "fs";
import * as path from "path";
import { parseStringPromise } from 'xml2js';

export async function leerCdrXml(route_cdr: string, filename: string): Promise<{ status: boolean; response_sunat_code?: string; response_sunat_description?: string; error?: string }> {
    const proyectoDirname = path.resolve(__dirname, '..', '..', '..', '..');
    const xmlFilePath = path.join(proyectoDirname, 'media', 'facturador', route_cdr,'R-'+filename + '.xml');
    

    if (!fs.existsSync(xmlFilePath)) {
        return { status: false, error: `El archivo ${xmlFilePath} no existe.` };
    }

    try {
        const xmlContent = fs.readFileSync(xmlFilePath, 'utf-8');
        
        const parsedXml = await parseStringPromise(xmlContent, { explicitArray: false });

        const responseCode = parsedXml?.['ar:ApplicationResponse']?.['cac:DocumentResponse']?.['cac:Response']?.['cbc:ResponseCode'];
        const description = parsedXml?.['ar:ApplicationResponse']?.['cac:DocumentResponse']?.['cac:Response']?.['cbc:Description'];

        if (responseCode && description) {
            return {
                status: true,
                response_sunat_code: responseCode.trim(),
                response_sunat_description: description.trim()
            };
        } else {
            return { status: false, error: "Error al leer respuesta de SUNAT" };
        }
    } catch (error) {
        console.error(`Error al procesar el archivo XML: ${error}`);
        return { status: false, error: `Error al procesar el archivo XML: ${(error as Error).message}` };
    }
}