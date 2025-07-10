import { Inject, Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { DataSource, Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class CertificateService {

  private readonly certificateRepository: Repository<Certificate>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.certificateRepository = this.connection.getRepository(Certificate);
  }

  async create(createCertificateDto: CreateCertificateDto, certificate_url: any) {
    createCertificateDto.filename_url = certificate_url
    try {
      const new_certificate = this.certificateRepository.create(createCertificateDto)
      return this.certificateRepository.save(new_certificate);
    } catch (error) {
      console.log(error.error);
      throw new Error(error.message);
    }
  }

  findAll() {
    return `This action returns all certificate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificate`;
  }
}
