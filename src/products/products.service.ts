import { BadRequestException, Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';


@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  findAll() {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    this.assertValidId(id);
    const product = await  this.productModel.findById(id).exec()
    if(!product) throw new BadRequestException('Product not found');
    return product;
  }

  async update(id: string, dto: UpdateProductDto){
    this.assertValidId(id);
    const product = await  this.productModel.findByIdAndUpdate(
      id, dto, {
        new: true,
        runValidators: true,
      }
    ).exec()
    if(!product) throw new BadRequestException('Product not found');
    return product;
  }

  async remove(id: string){
    this.assertValidId(id);
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if(!product) throw new BadRequestException('Product not found');
    return product;
  }


  private assertValidId(id: string){
    if(!isValidObjectId(id)) throw new BadRequestException(id);
  };
}
