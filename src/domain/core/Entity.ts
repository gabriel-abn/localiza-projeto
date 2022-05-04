export abstract class Entity<T> {
  public props: T;
  private privateId: string;

  constructor(props: T, privateID?: string) {
    this.privateId = privateID;
    this.props = props;
  }

  protected set id(_id: string) {
    this.privateId = _id;
  }
}
