/* eslint-disable prettier/prettier */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Invalid id');
    }
    return value;
  }
}
