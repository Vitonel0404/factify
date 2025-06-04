import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document_type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document_type.dto';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { DataSource, Repository } from 'typeorm';
import { DocumentType } from './entities/document_type.entity';

@Injectable()
export class DocumentTypeService {
  private readonly documentTypeRepository : Repository<DocumentType>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection : DataSource){
    this.documentTypeRepository = this.connection.getRepository(DocumentType);
  }

  create(createDocumentTypeDto: CreateDocumentTypeDto) {
    try {
      const new_documentType = this.documentTypeRepository.create(createDocumentTypeDto);
      return this.documentTypeRepository.save(new_documentType);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.documentTypeRepository.find({
        where:{is_eliminated : false}
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_document_type: number) {
    try {
      return this.documentTypeRepository.findOneBy({id_document_type});
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_document_type: number, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    try {
      const document_type = await this.documentTypeRepository.findOne({ where: { id_document_type } });

      if (!document_type) throw new NotFoundException(`Document type with id ${id_document_type} not found`);

      const updated = Object.assign(document_type, updateDocumentTypeDto);
      
      return await this.documentTypeRepository.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_document_type: number) {
    try {
      const result = await this.documentTypeRepository.update(
        { id_document_type },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Document type with id ${id_document_type} not found`);
      return { message: 'Document was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
