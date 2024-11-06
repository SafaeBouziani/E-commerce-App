import { Component, OnInit } from '@angular/core';
import { Commande } from '../models/commande';
import { CommandeService } from '../services/commande.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'] // Fix typo from `styleUrl` to `styleUrls`
})
export class OrdersComponent implements OnInit {
  commandes: Commande[] = [];
  selectedCommande: Commande | null = null;
  productNameMap: Map<number, Promise<string>> = new Map();

  constructor(private commandeService: CommandeService, private ps: ProductService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.commandeService.getAllCommandes().subscribe((data: Commande[]) => {
      this.commandes = data;
    });
  }

  showDetails(commande: Commande) {
    this.selectedCommande = commande;
    this.loadProductNames();
  }

  closeDetails() {
    this.selectedCommande = null;
  }

  loadProductNames() {
    if (this.selectedCommande) {
      // Clear previous product names to avoid mix-up between different commandes
      this.productNameMap.clear();

      // Iterate over each item in selectedCommande and load product names
      for (const item of this.selectedCommande.details) {
        const productId = item.productid;
        // Store each product name as a Promise in the map
        this.productNameMap.set(productId, this.fetchProductName(productId));
      }
    }
  }

  fetchProductName(productId: number): Promise<string> {
    return new Promise((resolve) => {
      this.ps.getProductById(productId).subscribe((product: Product) => {
        resolve(product.title);
      });
    });
  }
}
