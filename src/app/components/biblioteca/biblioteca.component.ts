import { Component, OnInit } from '@angular/core';
import { libro } from 'src/app/interfaces/libro';
import { LibroService } from 'src/app/services/libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css'],
})
export class BibliotecaComponent implements OnInit {
  biblioteca: libro[] = [];
  cargando = false;

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.cargando = true;
    this.libroService.getLibros().subscribe((res) => {
      this.biblioteca = res;
      this.cargando = false;
    });
  }

  borrar(libro: libro, i: number) {
    Swal.fire({
      title: 'Confirme la operación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.value) {
        this.biblioteca.splice(i, 1);
        this.libroService.deleteLibro(libro.id).subscribe();
      }
    });
  }
}
