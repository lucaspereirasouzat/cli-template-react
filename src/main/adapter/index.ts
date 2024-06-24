import routes from '../router'

interface Options {
  [key: string]: boolean
}

export default (name: string, options: Options, fullpath: string): void => {
  const { test, properties, onlyTest,multipleMethods, ...rest } = options
  const allroutes = routes()
  console.log(multipleMethods);

  const keys = Object.keys(rest)
  keys.forEach(element => {
    try {
      if(allroutes[element]){
        if(multipleMethods){
          (multipleMethods as any as string).split(',').map(item => {
            allroutes[element]?.handle(fullpath, `${name}/${item}`, test, properties, onlyTest);
          })
          return
        }
        allroutes[element]?.handle(fullpath, name, test, properties, onlyTest);
      }
    } catch (error) {
      console.log(error)
    }
  })
}
