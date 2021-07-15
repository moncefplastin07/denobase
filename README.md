# Denobase
Denobase is a database written in TypeScript for Deno.    

# Usage
For this tutorial, we will use 'db' as the Database.         
```Typescript
import { Database, Get } from "https://deno.land/x/denobase@1.0.0/mod.ts"
let db = new Database("dataStore")
```
'Get' is the return type for '.get()' method.   
### Set (key: string, value: string | number): boolean
```Typescript
let set: boolean = db.set("test", "Hello Deno!") // true
```
### Get (key: string): string | number | undefined
```Typescript
let get: Get = db.get("test") // "Hello Deno!"
```
### Has (key: string): boolean
```Typescript
let has: boolean = db.has("test") // true
let falsehas: boolean = db.has("testt") // false
```
### Delete (key: string): boolean
```Typescript
let testSet: boolean = db.set("testDelete", "Hello World!") //true
let testDelete: boolean = db.delete("testDelete") // true
let testHas: boolean = db.has("testDelete") // false
```
### All (): object
```Typescript
let all: object = db.all() // { test: "Hello Deno!" }
```
### Clear (): boolean
```Typescript
let clear: boolean = db.clear() // true
let testAll = db.all() // {}
```
### Write (): boolean
This method will write all the data to a .json file.
The file name will be the same as the database name.
```Typescript
db.set("set", "Hello!")
db.write()
```
dataStore.json    
```json
{ "set": "Hello!" }
```
### Read (): Promise\<boolean\>
Denobase use Map for the database.         
If you don't use 'read', denobase will create an empty Map.        
Use 'read' to read json data from the json file that is created using 'write'.           
#### Example
main.ts     
```Typescript
import { Database } from "https://deno.land/x/denobase@1.0.0/mod.ts"
let db = new Database("denobase")
db.set("color", "Red")
db.write()
```
It will create a new json file     
denobase.json         
```json
{ "color": "Red" }
```    
If you try to log all value in the database, it will return an empty object because it create a new Map.    
```Typescript
import { Database } from "https://deno.land/x/denobase@1.0.0/mod.ts"
let db = new Database("denobase")
db.all() // {}
```
If you use 'read'
```Typescript
import { Database } from "https://deno.land/x/denobase@1.0.0/mod.ts"
let db = new Database("denobase")
await db.read()
db.all() // { color: "Red" }
```
Note:      
- Always use 'await' and put it after creating new database.    
- Always make sure the database name is the same
