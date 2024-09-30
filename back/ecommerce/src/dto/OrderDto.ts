import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { CreateProductDto } from "./ProductDto";

export class OrderDto{
    @IsNotEmpty()
    @IsUUID()
    userId: string;
  
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateProductDto)
    products: CreateProductDto[];

  

}