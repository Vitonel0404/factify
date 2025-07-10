import { promises as fs } from 'fs';
import * as path from "path";
import * as AdmZip from 'adm-zip';
import * as soap from 'soap';

export async function enviarSunat(empresa : any, path_filename : string, filename : string) {

    const _root = process.env.DOCUMENTS_ROOT || path.resolve(__dirname, '..', '..', '..', '..', '..');
    const fileToZip = path.join(_root, 'documents', empresa.ruc, path_filename+'.xml');
    if (!fs.access(fileToZip)) {
        return { status: false, error: 'El archivo XML no existe en la ruta especificada.' };
    }

    try {
        const zipFilePath = path.join(_root, 'documents', empresa.ruc, `${path_filename}.zip`);
        const zipFile = new AdmZip();
        zipFile.addLocalFile(fileToZip);
        zipFile.writeZip(zipFilePath);

        const url = empresa.is_production
            ?   path.join(_root, 'sales', 'media', 'services','prod', 'billService.wsdl')
            :  path.join(_root, 'sales','media', 'services','dev', 'billService.wsdl');

        const username = empresa.usu_secundario_produccion_user;
        const password = empresa.usu_secundario_produccion_password;

        const fileBuffer = await fs.readFile(zipFilePath);
        const fileBase64 = fileBuffer.toString('base64');

        const client = await soap.createClientAsync(url);
        client.setSecurity(new soap.WSSecurity(username, password));

        const resultBase64String = await client.sendBillAsync({
            fileName: `${filename}.zip`,
            contentFile: fileBase64
        });
        eliminarFirmaComprimido(empresa.ruc, path_filename);
        return { status: true, result_base64_string: resultBase64String, filename };
    } catch (error) {
        console.error(`Error al enviar documento a SUNAT: ${error}`);
        return { status: false, error: `Error inesperado al enviar a SUNAT` };
    }
}

async function eliminarFirmaComprimido(ruc: string, fileToZip: string): Promise<void> {
    const proyectoDirname = process.env.DOCUMENTS_ROOT || path.resolve(__dirname, '..', '..', '..', '..', '..');
    const zip = path.join(proyectoDirname, 'documents', ruc, fileToZip+'.zip');
    try {
        await fs.access(zip);
        await fs.unlink(zip);
    } catch (error) {
        console.error(`Error al eliminar archivos: ${error}`);
    }
}
