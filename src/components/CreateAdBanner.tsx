import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return (
        <div className='bg-nlw-gradient self-stretch pt-1 rounded-lg mt-8 overflow-hidden'>
        <div className='bg-[#2a2634] py-6 px-8 flex justify-between items-center'>
          <div>
            <strong className='text-white text-2xl font-black'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players! </span>
          </div>
          <Dialog.Trigger className='bg-violet-500 hover:bg-violet-600 text-white py-3 px-4 rounded flex gap-3 items-center'>
            <MagnifyingGlassPlus size={24} className='' />
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    )
}