import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( imagen:string | null   ): string {
      let imagen_mostrar: string;
      if (imagen) {
        imagen_mostrar = `http://localhost:8000/storage/medium_${imagen}`
      }else{
        imagen_mostrar = `assets/images/no-imagen-detalle.png`
      }

      return imagen_mostrar;
  }

}
