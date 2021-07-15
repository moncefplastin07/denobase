import { require } from "https://deno.land/x/require/mod.ts"

let map = new Map()

export type Get = string | number | undefined;

export class Database {
  dbName: string;
  constructor(name: string) {
    name.replace(".json", "");
    name.replace(/\w/gm, "");
    this.dbName = name;
  }

  async read(): Promise<boolean> {
    try {
      map = new Map(Object.entries(await require(`${this.dbName}.json`)))
    } catch(err: any) {}
    return true
  }

  all(): object {
    let temp = {};
    map.forEach((v, k) => {
      let tempP = { [v]: k };
      Object.assign(temp, tempP);
    });
    return temp;
  }

  set(key: string, value: string | number): boolean {
    map.set(key, value);
    return true;
  }

  get(key: string): Get {
    return map.get(key);
  }

  delete(key: string): boolean {
    map.delete(key);
    return true;
  }

  has(key: string): boolean {
    return map.has(key);
  }

  clear(): boolean {
    map.clear();
    return true;
  }

  write(): boolean {
    Deno.writeTextFile(`${this.dbName}.json`, JSON.stringify(this.all())).then(
      (res) => {}
    );
    return true;
  }
}