import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {}

  // Método encargado del cierre de sesión
  LogOut() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: "Cerrar sesión",
        description: "Seguro que deseas cerrar tu sesión"
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      if (dialogRef.componentInstance.confirmed) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    })
  }
}
