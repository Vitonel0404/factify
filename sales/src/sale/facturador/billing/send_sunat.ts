import * as fs from "fs";
import * as path from "path";
import * as AdmZip from 'adm-zip';
import * as soap from 'soap';

export async function enviarSunat(empresa : any, path_filename : string, filename : string) {

    const proyectoDirname = path.resolve(__dirname, '..', '..', '..', '..');
    const fileToZip = path.join(proyectoDirname, 'media', 'facturador', path_filename+'.xml');
    if (!fs.existsSync(fileToZip)) {
        return { status: false, error: 'El archivo XML no existe en la ruta especificada.' };
    }

    try {
        const zipFilePath = path.join(proyectoDirname, 'media', 'facturador', `${path_filename}.zip`);
        const zipFile = new AdmZip();
        zipFile.addLocalFile(fileToZip);
        zipFile.writeZip(zipFilePath);

        const url = empresa.is_production
            ?   path.join(proyectoDirname, 'media', 'services','prod', 'billService.wsdl')
            :  path.join(proyectoDirname, 'media', 'services','dev', 'billService.wsdl');

        const username = empresa.usu_secundario_produccion_user;
        const password = empresa.usu_secundario_produccion_password;

        const fileBuffer = fs.readFileSync(zipFilePath);
        const fileBase64 = fileBuffer.toString('base64');

        const client = await soap.createClientAsync(url);
        client.setSecurity(new soap.WSSecurity(username, password));

        const resultBase64String = await client.sendBillAsync({
            fileName: `${filename}.zip`,
            contentFile: fileBase64
        });
        eliminarFirmaComprimido(path_filename);
        return { status: true, result_base64_string: resultBase64String, filename };
    } catch (error) {
        console.error(`Error al enviar documento a SUNAT: ${error}`);
        return { status: false, error: `Error inesperado al enviar a SUNAT` };
    }
}

function eliminarFirmaComprimido(fileToZip: string): void {
    const proyectoDirname = path.resolve(__dirname, '..', '..', '..', '..');
    const zip = path.join(proyectoDirname, 'media', 'facturador', fileToZip+'.zip');
    try {
        if (fs.existsSync(zip)) {
            fs.unlinkSync(zip);
        }
    } catch (error) {
        console.error(`Error al eliminar archivos: ${error}`);
    }
}
