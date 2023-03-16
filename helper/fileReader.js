var fs=require("fs")


const rootDir='C:/Users/USER/Documents/EJFolder/DieboldStatus/diebold_hardware_stat'

const exist=fs.existsSync(rootDir)
console.log("exist",exist);
const atms=[]

if(exist){
  const allFileContents = fs.readFileSync(rootDir, 'utf-8');
   let term_id=''
   let supply_array=''
   let fitness_array=''
   let sensor_array=''
    allFileContents.split(/\r?\n/).forEach(line =>  {

        if(line.includes('term_id')){
          term_id=line.slice(11,19)
        }
        else if(line.includes('fitness_array')){
            fitness_array=line.slice(17,57)
        }
        else if(line.includes('supply_array')){
          supply_array=line.slice(16,56)
        }
        else if(line.includes('sensor_array')){
          sensor_array=line.slice(16,56)
        }
        else if(line.toString()===';'){
           let obj={}
            obj.term_id=term_id
            obj.fitness_array=fitness_array.toString()
            obj.sensor_array=sensor_array.fitness_array
            obj.supply_array=supply_array
            atms.push(obj)
        }
      
    }
        )
}
        module.exports=atms