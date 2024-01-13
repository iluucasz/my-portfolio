import React from 'react'

const SkillsList = () => {
  return (
    <li className='flex flex-col gap-5 w-[400px] h-[300px] p-5 pl-10 bg-gradient-to-r from-[#3f171e] to-[#0f172a] text-red-900 border-2 border-red-900 shadow-md hover:scale-105 hover:text-red-700 hover:from-slate-900 hover:to-slate-900 transition-all cursor-pointer'>
      <h3 className='text-xl font-semibold mx-auto'>Comunicação</h3>
      <ul className='flex flex-col gap-3'>
        <li>Boa Gestão de Tempo</li>
        <li>Boa Comunicação em grupo</li>
        <li>Boa Organização</li>
        <li>AutoAvaliação</li>
        <li>Produtividade</li>
      </ul>
    </li>
  )
}

export default SkillsList;