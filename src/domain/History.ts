import { Entity } from "./core/Entity";

export type HistoryDTO = {
  clienteCnh: string;
  carroPlaca: string;
  dataAlocacao: Date;
  dataDevolucao?: Date;
};

export class History extends Entity<HistoryDTO> {
  constructor(props: HistoryDTO, _id?: string) {
    super(props, _id);
  }

  static create(props: HistoryDTO, _id?: string) {
    return new History(props, _id);
  }
}
