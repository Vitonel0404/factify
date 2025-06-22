import * as fs from "fs";
import * as path from "path";
import * as unzipper from 'unzipper';

export async function base64ToZip(base64String: string, route_cdr: string, filename: string): Promise<{ status: boolean; message?: string; error?: string }> {
    try {
        const _root = path.resolve(__dirname, '..', '..', '..', '..');
        const filePath = path.join(_root, 'media', 'facturador', route_cdr, filename + ".zip");

        const decodedData = Buffer.from(base64String, 'base64');
        fs.writeFileSync(filePath, decodedData);

        if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
            // Esperar a que se descomprima antes de continuar
            await descomprimirCDR(route_cdr, filename);
            return { status: true, message: "Archivo descomprimido creado correctamente" };
        } else {
            return { status: false, error: "Error: el archivo no fue creado correctamente o está vacío." };
        }
    } catch (error) {
        return { status: false, error: `Error al crear el archivo: ${error}` };
    }
}
export async function descomprimirCDR(route_cdr: string, filename: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const _root = path.resolve(__dirname, '..', '..', '..', '..');
        const zipfile = path.join(_root, "media", "facturador", route_cdr, filename + ".zip");
        const unzipe = path.join(_root, "media", "facturador", route_cdr);

        fs.createReadStream(zipfile)
            .pipe(unzipper.Extract({ path: unzipe }))
            .on('close', async () => {
                try {
                    await eliminarCDRComprimido(route_cdr, filename);
                    resolve();
                } catch (error) {
                    reject(`Error al eliminar el archivo comprimido: ${error}`);
                }
            })
            .on('error', (err) => {
                reject(`Error al descomprimir el archivo: ${err}`);
            });
    });
}


export async function eliminarCDRComprimido(route_cdr: string, filename: string): Promise<void> {
    const _root = path.resolve(__dirname, '..', '..', '..', '..');
    const zipfile = path.join(_root, "media", "facturador", route_cdr, filename + ".zip");

    try {
        if (fs.existsSync(zipfile)) {
            await fs.promises.unlink(zipfile);
        }
    } catch (error) {
        console.error(`Error al eliminar archivos: ${error}`);
    }
}