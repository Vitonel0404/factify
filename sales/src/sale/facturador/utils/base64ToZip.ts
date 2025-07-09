import * as fs from 'fs';
import * as path from "path";
import * as unzipper from 'unzipper';

export async function base64ToZip(base64String: string, route_cdr: string, filename: string): Promise<{ status: boolean; message?: string; error?: string }> {
  try {
    const _root = path.resolve(__dirname, '..', '..', '..', '..', '..');
    const filePath = path.join(_root, 'documents', route_cdr, filename + ".zip");
    const _paht_cdr = path.join(filePath, '..')
    await ensureDirectoryExists(_paht_cdr);
    const decodedData = Buffer.from(base64String, 'base64');
    await fs.promises.writeFile(filePath, decodedData);
    const stats = await fs.promises.stat(filePath);
    if (stats.size === 0) {
      return { status: false, error: 'Error: el archivo fue creado vacío.' };
    }
    await descomprimirCDR(route_cdr, filename);
    return { status: true, message: 'Archivo descomprimido creado correctamente.' };
  } catch (error) {
    return { status: false, error: `Error al crear el archivo: ${error}` };
  }
}

export async function descomprimirCDR(route_cdr: string, filename: string): Promise<void> {
  const _root = path.resolve(__dirname, '..', '..', '..', '..', '..');
  const zipfile = path.join(_root, "documents", route_cdr, `${filename}.zip`);
  const unzipFolder = path.join(_root, "documents", route_cdr);
  return new Promise<void>((resolve, reject) => {
    const stream = fs
      .createReadStream(zipfile)
      .pipe(unzipper.Extract({ path: unzipFolder }));

    stream.on('close', async () => {
      try {
        await eliminarCDRComprimido(route_cdr, filename);
        resolve();
      } catch (error) {
        reject(`Error al eliminar el archivo comprimido: ${error}`);
      }
    });

    stream.on('error', (err) => {
      reject(`Error al descomprimir el archivo: ${err}`);
    });
  });
}

export async function eliminarCDRComprimido(route_cdr: string, filename: string): Promise<void> {
  const _root = path.resolve(__dirname, '..', '..', '..', '..', '..');
  const zipfile = path.join(_root, "documents", route_cdr, `${filename}.zip`);

  try {
    await fs.promises.access(zipfile);
    await fs.promises.unlink(zipfile);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.warn(`El archivo no existe, no se elimina: ${zipfile}`);
    } else {
      console.error(`Error al eliminar el archivo: ${error}`);
      throw error;
    }
  }
}

async function ensureDirectoryExists(dirPath: string) {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error('Error al crear la carpeta:', error);
    throw error;
  }
}