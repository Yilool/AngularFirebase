import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { libro } from 'src/app/interfaces/libro';
import { LibroService } from 'src/app/services/libro.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  libro = new libro();

  constructor(
    private libroService: LibroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.libroService.getLibro(id).subscribe((res: libro) => {
        this.libro = res;
        this.libro.id = id;
      });
    }
  }

  registrar(data: NgForm) {
    let response: Observable<any>;

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.libro.id) {
      response = this.libroService.putLibro(this.libro);
    } else {
      response = this.libroService.postLibro(this.libro);
    }

    response.subscribe((res) => {
      Swal.fire({
        title: this.libro.titulo,
        text: 'Actualizado',
        icon: 'success',
      });
      this.router.navigate(['/biblioteca']);
    });
  }
}
