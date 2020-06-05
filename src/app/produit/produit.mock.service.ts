import {Injectable} from '@angular/core';
import {Produit} from '../shared/produit';

@Injectable()
export class ProduitMockService{

  private PRODUITS: Produit[] = [];

  constructor(){
    let p1: Produit = new Produit(1, 'livre', 50, 20);
    let p2: Produit = new Produit(2, 'cahier', 200, 5.6);
    let p3: Produit = new Produit(3, 'stylo', 48, 2.10);
    this.PRODUITS.push(p1);
    this.PRODUITS.push(p2);
    this.PRODUITS.push(p3);
  }

  public getProduits(): Produit[]{
    return this.PRODUITS;
  }
}
