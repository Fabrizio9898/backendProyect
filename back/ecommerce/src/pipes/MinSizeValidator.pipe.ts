import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MinSizeValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const maxSize=204800

    if(value.size>maxSize){
      throw new BadRequestException('El archivo debe ser menor a 200KB')
    }

    return value
  }
}
