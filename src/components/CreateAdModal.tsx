import { Check, GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Input } from './Form/Input';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Game {
    id: string;
    title: string;    
}

  
export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    useEffect(() => {
      axios('http://localhost:3333/games').then(response => {
          setGames(response.data);
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if(!data.name){
            return;
        }

        try{
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yersPlaying: Number(data.yersPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('Anúncio criado com sucesso!');
        }catch(err){
            alert('Erro ai criar o anúncio!');
        }
    }

    return(
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
            <Dialog.Content 
            className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>
                Publique um anúncio
            </Dialog.Title>
            
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold' htmlFor="game">Qual o game ?</label>
                        <select 
                            className='bg-zinc-900 py-3 px-4 rounded text-small placeholder:text-zinc-500 appearance-none' 
                            id='game'  
                            name='game'  
                            defaultValue=""                      
                        >
                            <option className='text-zinc-500 p-2' value="Selecione o game que deseja jogar" disabled>Selecione o game que deseja jogar</option>

                            {games.map(game => {
                                return <option key={game.id} value={game.id} >{game.title}</option>                                
                            })}
                        </select>                  
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input placeholder='Como te chamam dentro do game?' id="name" name="name" />
                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                        <label htmlFor="yersPlaying">Joga há quantos anos ?</label>
                        <Input type="number" id="yersPlaying" name="yersPlaying" placeholder='Tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                        <label htmlFor="discord">Qual é o seu Discord ?</label>
                        <Input placeholder='Usuario#0000' id="discord" name="discord" />
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>
                            <ToggleGroup.Root type="multiple" value={weekDays} onValueChange={setWeekDays} className='grid grid-cols-4 gap-2'>
                                <ToggleGroup.Item  
                                    value="0"
                                    className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Domingo'>
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item  
                                    value="1"
                                    className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Segunda'>
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item 
                                    value="2" 
                                    className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Terça'>
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item  
                                    value="3"
                                    className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Quarta'>
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item 
                                    value="4" 
                                    className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Quinta'>
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item 
                                    value="5" 
                                    className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Sexta'>
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="6"  
                                    className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Sabado'>
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input type="time" id='hourStart' name='hourStart' placeholder='De' />
                                <Input type="time" id='hourEnd' name='hourEnd' placeholder='Até'/>
                            </div>
                        </div>
                    </div>
                    <label className='mt-2 flex gap-2 items-center text-small' >
                        <Checkbox.Root 
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if(checked === true){
                                    setUseVoiceChannel(true)
                                }else{
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className='w-6 h-6 p-1 rounded bg-zinc-900 '
                        >
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400'/>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>
                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close 
                        type='button' 
                        className='px-5 h-12 rounded-md font-semibold bg-zinc-500 hover:bg-zinc-600'
                        title=''
                        >                    
                        Cancelar
                        </Dialog.Close>
                        <button type="submit" className='px-5 h-12 rounded-md font-semibold bg-violet-500 flex items-center gap-3 hover:bg-violet-600'>
                        <GameController className='w-6 h-6'/>
                        Encontrar duo 
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}