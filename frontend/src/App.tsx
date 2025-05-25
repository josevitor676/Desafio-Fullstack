
import { TabelaDesenvolvedor } from './components/tabela/TabelaDesenvolvedor'
import { TabelaNivel } from './components/tabela/TabelaNivel'
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'

function App() {
  return (
    <div className="w-screen h-screen p-2">
      <p className='mb-5'>TESTE GAZIN TECH</p>
      <Tabs defaultValue="niveis" className="">
        <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="niveis" className='hover:border-none border-none p-2'>Niveis</TabsTrigger>
        <TabsTrigger value="desenvolvedores" className='hover:border-none border-none p-2'>Desenvolvedores</TabsTrigger>
      </TabsList>
      <TabelaNivel />
      <TabelaDesenvolvedor />
      </Tabs>
    </div>
  )
}

export default App