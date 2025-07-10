import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from "path";

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @UseGuards(CompanyGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('certificate'
      , 1, {
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {

        const ruc = req.body.ruc;
        
        if (!ruc) {
          return cb(new Error('El RUC es obligatorio'), '');
        }

        const basePath: string = process.env.CERTIFICATES_ROOT || '';

        const destPath = path.join(basePath, ruc);

        fs.mkdirSync(destPath, { recursive: true });

        cb(null, destPath);
      },
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }
  ),
  )
  create(@Body() data: any, @UploadedFiles() files: Express.Multer.File[]) {
    const certificate_url = files && files.length > 0  ? `/certificated/${files[0].filename}` : null;
    return this.certificateService.create(data, certificate_url);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }

}
