import {add,sub} from './module1'
import {mul} from './module2'
import module3 from './module3'
import data from '../json/data.json'

console.log(add(1,2));
console.log(sub(1,2));
console.log(mul(1,2));
console.log(module3.name,module3.age);
module3.setName('wade')
console.log(module3.name,module3.age);
console.log(data,typeof data)

setTimeout(()=>{
  console.log(1)
},1000)
