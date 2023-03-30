// Generated by https://quicktype.io

export interface TipoMedicamentoI {
  ok:  boolean;
  msg?: string;
  tipo?:TipoMedicamento
}



export interface TipoMedicamentoInterface {
  ok:              boolean;
  tipoMedicamento: TipoMedicamento[];
}

export interface TipoMedicamento {
  id:          number;
  tipo:        string;
  descripcion: string;
  createdAt:   string;
  updatedAt:   string;
  deletedAt:   null;
}

