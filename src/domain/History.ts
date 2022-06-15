import { Entity } from "./core/Entity";

export type HistoryDTO = {
  id?: string;
  clienteCnh: string;
  carroPlaca: string;
  dataAlocacao: Date;
  dataDevolucao?: Date;
  ativo: boolean
};

export class History extends Entity<HistoryDTO> {
  constructor(props: HistoryDTO, _id?: string) {
    super(props, _id);
  }

  static create(props: HistoryDTO, _id?: string) {
    return new History(props, _id);
  }
}
