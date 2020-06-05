import {Component,OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

// import { ProduitMockService } from './produit.mock.service';
import {ProduitService} from './produit.service';
import {Produit} from '../shared/produit';

@Component({
    selector: 'app-produit',
    templateUrl: './produit.component.html',
    styleUrls: ['./produit.component.css']
})

export class ProduitComponent implements OnInit{

produits: Produit[];

produitForm: FormGroup;

operation: string = 'add';

selectedProduit: Produit;

constructor(private produitService: ProduitService, private fb: FormBuilder, private route: ActivatedRoute){
  this.createForm();
}

createForm(){
  this.produitForm = this.fb.group({
    ref: ['', Validators.required],
    quantite: '',
    prixUnitaire: ''
  });
}
ngOnInit(){
  this.initProduit();
  this.produits = this.route.snapshot.data.produits;
}

loadProduit(){
  this.produitService.getProduit().subscribe(
    data => {this.produits = data},
    error => { console.log('an error was eccured.')},
    () => {console.log('loading produits was done.')}
  );
}

addProduit(){
  const p = this.produitForm.value;
  this.produitService.addProduit(p).subscribe(
    res =>{
      this.initProduit();
      this.loadProduit();
    }
  );
}

  updateProduit(){
    const p = this.produitForm.value;
    this.produitService.updateProduit(this.selectedProduit).subscribe(
      res =>{
        this.initProduit();
        this.loadProduit();
      }
    );
  }

  deleteProduit(){
  this.produitService.deleteProduit(this.selectedProduit.id).subscribe(
    res =>{
            this.selectedProduit = new Produit();
            this.loadProduit();
    }
  );
  }

  initProduit(){
  this.selectedProduit = new Produit();
  this.createForm();
  }

}
