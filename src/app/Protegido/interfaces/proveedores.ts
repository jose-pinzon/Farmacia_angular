// Generated by https://quicktype.io



export interface ProvedorI {
  ok:         boolean;
  provedores: Provedor[];
}

export interface Provedor {
  id:         number;
  nombre:     string;
  apellido_p: string;
  apellido_m: string;
  email:      string;
}

export interface ProvedorIshow {
  ok:       boolean;
  Provedor: Provedor;
}

export interface Provedor {
  id:             number;
  nombre:         string;
  apellido_p:     string;
  apellido_m:     string;
  identificacion: string;
  direccion:      string;
  telefono:       number;
  foto:           string;
  email:          string;
  createdAt:      string;
  updatedAt:      string;
  deletedAt:      null;
}



export interface ProvedorMsg {
  ok:         boolean;
  msg:         string;
}
