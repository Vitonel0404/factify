import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseOrderDetailDto } from './create-purchase_order_detail.dto';

export class UpdatePurchaseOrderDetailDto extends PartialType(CreatePurchaseOrderDetailDto) {}
