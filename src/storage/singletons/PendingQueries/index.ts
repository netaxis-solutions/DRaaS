import { makeAutoObservable, action, observable } from "mobx";

class PendingQueries {
  byFetchType: Map<string, any> = new Map();
  i: number = 0;

  constructor() {
    makeAutoObservable(this, {
      some: false,
      i: false,
      add: action,
      remove: action,
    });
  }

  get empty() {
    for (const q of this.byFetchType.values()) {
      if (q.size) {
        return false;
      }
    }
    return true;
  }

  get length() {
    let total = 0;
    for (const q of this.byFetchType.values()) {
      total += q.size;
    }
    return total;
  }

  add(fetchType: string, queryParams: object | null) {
    let queries = this.byFetchType.get(fetchType);
    if (!queries) {
      queries = observable(new Map(), { deep: false });
      this.byFetchType.set(fetchType, queries);
    }
    const queryId = this.i++;
    queries.set(queryId, queryParams);
    return queryId;
  }

  remove(fetchType: string, queryId: number) {
    const queries = this.byFetchType.get(fetchType);
    if (queries) {
      queries.delete(queryId);
    }
  }

  some(fetchType: string, callBack: Function) {
    const queries = this.byFetchType.get(fetchType);
    if (queries && queries.size) {
      if (callBack) {
        for (const queryParams of queries.values()) {
          if (callBack(queryParams) === true) {
            return true;
          }
        }
        return false;
      }
      return true;
    }
    return false;
  }
}

export default new PendingQueries();
