export class SubListCollect {
  private uids: string[] = [];

  // 添加oldSubList、newSubList、curId
  addSubList(subList: string[]) {
    this.uids = [...this.uids, ...subList];
  }
}
