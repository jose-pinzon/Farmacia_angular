export interface VentaI {
  ok:      boolean;
  msg?:string

}

export interface VentaInterface {
  id?: number | string;
  vendedor_id: number | string;
  vendedor:string;
  cliente_id: number;
  cliente:string;
  producto_id: number;
  producto:string;
  precioOriginal:number;
}



export interface body_venta{
  cliente_id?:number;
  vendedor_id?:number | string;
  precio_bruto:number;
  descripcion?:string;
  descuento:number;
  iva:number;
  productos:producto[];
  total:number;
}




export interface producto{
  id:number,
  cantidad:number,
  total:number
}
