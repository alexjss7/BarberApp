import { Product } from '../schemas/ProductSchema';
import { getRealm } from '../RealmConfig';
import Realm from 'realm';

class ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    const realm = await getRealm();
    return realm.objects<Product>('Product').sorted('name').toJSON();
  }

  async saveProduct(productData: { _id?: Realm.BSON.ObjectId, name: string, type: string, quantity: number, price: number }): Promise<Product> {
    const realm = await getRealm();
    let product: Product;
    realm.write(() => {
      product = realm.create<Product>('Product', {
        _id: productData._id || new Realm.BSON.ObjectId(),
        name: productData.name,
        type: productData.type,
        quantity: productData.quantity,
        price: productData.price,
      }, Realm.UpdateMode.Modified);
    });
    return product!;
  }

  async deleteProduct(id: Realm.BSON.ObjectId): Promise<void> {
    const realm = await getRealm();
    realm.write(() => {
      const product = realm.objectForPrimaryKey<Product>('Product', id);
      if (product) {
        realm.delete(product);
      }
    });
  }

  async updateProductQuantity(id: Realm.BSON.ObjectId, newQuantity: number): Promise<Product> {
    const realm = await getRealm();
    let updatedProduct: Product | undefined;
    realm.write(() => {
      updatedProduct = realm.objectForPrimaryKey<Product>('Product', id);
      if (updatedProduct) {
        updatedProduct.quantity = newQuantity;
      }
    });
    return updatedProduct!;
  }
}

export default new ProductRepository();