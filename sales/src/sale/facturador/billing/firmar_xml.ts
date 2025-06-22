import * as fs from "fs";
import * as path from "path";
import { SignedXml } from 'xml-crypto';
import * as forge from 'node-forge';

export async function firmarXML(filename: string, firmado: string, certificate_filename: string, password: string) {

  const proyectoDirname = path.resolve(__dirname, '..', '..', '..', '..');

  const routeCertificado = path.join(proyectoDirname, 'media', 'certificate', certificate_filename);
  const routeXML = path.join(proyectoDirname, 'media', 'facturador', filename);

  const ArrayBuffer = getP12(routeCertificado);

  const DER = forge.util.decode64(
    forge.util.binary.base64.encode(new Uint8Array(ArrayBuffer))
  );

  const p12Asn1 = forge.asn1.fromDer(DER);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);
  let privateKey = null;
  let certificate = null;

  p12.safeContents.forEach((safeContent: any) => {
    safeContent.safeBags.forEach((bag: any) => {
      // Extrae la clave privada solo si aún no se ha extraído
      if (bag.type === forge.pki.oids.pkcs8ShroudedKeyBag && !privateKey) {
        privateKey = forge.pki.privateKeyToPem(bag.key);
      }
      // Extrae solo el primer certificado
      if (bag.type === forge.pki.oids.certBag && !certificate) {
        certificate = forge.pki.certificateToPem(bag.cert);
      }
    });
  });


  if (!privateKey) {
    throw new Error("No se pudo extraer la clave privada del archivo .p12");
  }

  const privateKeyClean = privateKey.replace(/\r/g, "").replace(/\n/g, "\n");
  const certClean = certificate.replace(/\r/g, "").replace(/\n/g, "\n");

  const sig: any = new SignedXml({
    signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
    canonicalizationAlgorithm: 'http://www.w3.org/2001/10/xml-exc-c14n#',
    privateKey: privateKeyClean,
    publicCert: certClean,
  });

  sig.addReference({
    xpath: "//*[local-name(.)='CreditNote']",
    digestAlgorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
    transforms: [
      'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
      'http://www.w3.org/2001/10/xml-exc-c14n#',
    ],
    isEmptyUri: true
  });

  let xmlContent = fs.readFileSync(routeXML, 'utf-8');
  sig.computeSignature(xmlContent, {
    location: { reference: "//*[local-name(.)='ExtensionContent']", action: "append" },
    prefix: "ds",
  });

  const routeSave = path.join(proyectoDirname, 'media', 'facturador', firmado);

  fs.writeFileSync(routeSave, sig.getSignedXml(), { encoding: 'utf-8' });
}


function getP12(filePath: string): ArrayBuffer {
  try {
    const p12Buffer = fs.readFileSync(filePath);
    const arrayBuffer = p12Buffer.buffer.slice(
      p12Buffer.byteOffset,
      p12Buffer.byteOffset + p12Buffer.byteLength
    );
    return arrayBuffer;
  } catch (error) {
    throw new Error(`Error al leer el archivo P12: ${error.message}`);
  }
}
