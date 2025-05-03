import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Facture } from './entities/facture.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { CreateFactureDto } from './dto/create-facture.dto';
import { Article } from 'src/articles/entities/article.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class FacturesService {
  constructor(
    @InjectModel('factures', 'db1') private factureModel: Model<Facture>,
    @InjectModel('articles', 'db1') private ArticuleModel: Model<Article>,
    @InjectModel('users', 'db1') private userModel: Model<User>) { }

    async create(createFactureDto: CreateFactureDto): Promise<Facture> {
      const objectId = new ObjectId(createFactureDto.Fac_idUser);
      const User = await this.userModel.findOne({ _id: objectId });
    
      if (!User) {
        throw new ConflictException('User does not exist');
      }
    
      if (createFactureDto.Fac_Articles && createFactureDto.Fac_Articles.length > 0) {
        const articleIds = createFactureDto.Fac_Articles.map(article =>
          new ObjectId(article.Fac_idArticle)
        );
    
        const existingArticles = await this.ArticuleModel.find({ _id: { $in: articleIds } });
    
        const existingArticleIds = existingArticles.map(art => art.id.toString());
        const missingArticles = articleIds.filter(id =>
          !existingArticleIds.includes(id.toString())
        );
    
        if (missingArticles.length > 0) {
          throw new ConflictException(
            `Los siguientes artículos no existen: ${missingArticles.join(', ')}`
          );
        }
    
        let totalFactura = 0;
        let totalCosto = 0;
    
        for (const articleDto of createFactureDto.Fac_Articles) {
          const articleData = existingArticles.find(
            a => a.id.toString() === articleDto.Fac_idArticle.toString()
          );
    
          if (!articleData) {
            throw new ConflictException(
              `Artículo con ID ${articleDto.Fac_idArticle} no encontrado.`
            );
          }
    
          const cantidad = Number(articleDto.Fac_Amount);
          const balance = Number(articleData.Art_balance);
          const precioVenta = Number(articleData.Art_sale_price);
          const costoArticulo = Number(articleData.Art_cost);
    
          if (cantidad === 0) {
            throw new ConflictException(
              `La cantidad no puede ser cero para el artículo: ${articleData.Art_Name}`
            );
          }
    
          if (cantidad < 0 && balance + cantidad < 0) {
            throw new ConflictException(
              `No hay suficiente saldo para el artículo: ${articleData.Art_Name}`
            );
          }
    
          // Se asignan valores fijos
          articleDto.Fac_Unit_Price = precioVenta;
          articleDto.Fac_cost = costoArticulo;
    
          // Calcular totales positivos
          articleDto.Fac_Total_Product = Math.abs(cantidad * precioVenta);
          articleDto.Fac_Total_cost = Math.abs(cantidad * costoArticulo);
    
          // Validar precio de venta en salidas
          if (cantidad < 0 && precioVenta < costoArticulo) {
            throw new ConflictException(
              `El precio de venta del artículo "${articleData.Art_Name}" no puede ser menor al costo (${costoArticulo}).`
            );
          }
    
          totalFactura += Number(articleDto.Fac_Total_Product);
          totalCosto += Number(articleDto.Fac_Total_cost);
    
          // Actualizar inventario
          await this.ArticuleModel.updateOne(
            { _id: articleData._id },
            { $inc: { Art_balance: cantidad } }
          );
        }
    
        // Asignar totales
        createFactureDto.Fac_Total = totalFactura;
        createFactureDto.Fac_Total_cost = totalCosto;
      }
    
      const facture = new this.factureModel(createFactureDto);
    
      try {
        await facture.save();
        return facture;
      } catch (error) {
        throw new InternalServerErrorException('Unexpected error when entering facture');
      }
    }
    
    
    

  async findAll() {
    const factures = await this.factureModel.find()
    if (!factures) {
      throw new ConflictException('dont exist factures')
    }
    return factures;
  }

  async findOne(id: string) {
    const objectId = new ObjectId(id)
    const facture = await this.factureModel.findOne({ _id: objectId })
    if (!facture) {
      throw new ConflictException('dont exist facture')
    }
    return facture;
  }

  async update(id: string, updateFactureDto: UpdateFactureDto) {
    const objectId = new ObjectId(id)
    const facture = await this.factureModel.findById(objectId)
    if (!facture) {
      throw new ConflictException('dont exist facture')
    }
    const updatedFacture = await this.factureModel.findByIdAndUpdate(objectId, updateFactureDto, { new: true })
    if (!updatedFacture) {
      throw new ConflictException('dont exist facture')
    }
    return updatedFacture;
  }

  async remove(id: string) {
    const objectId = new ObjectId(id)
    const Facture = await this.factureModel.findByIdAndDelete({ _id: objectId })
    if (!Facture) {
      throw new ConflictException('dont exist facture')
    }
  }
}
