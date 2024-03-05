'use client'
import React from 'react';
import { IoMdSend } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, TContactForm } from '@/schemas/contact_form.schema';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactForm = () => {

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TContactForm>({
    resolver: zodResolver(ContactFormSchema)
  });

  const onSubmit = async (data: TContactForm) => {
   try {
    await axios.post('/api/contact/', data)
    toast.success('Mensagem Enviada com sucesso!')
    reset()
   } catch (error) {
    toast.error(`${error}`);
   }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full max-w-[480px]'>

      <div className='flex flex-col gap-6'>
        <div className='relative'>
          <MdDriveFileRenameOutline className="absolute top-6 left-2 text-red-900" />
          <input maxLength={38} type="text" placeholder='nome' className='p-8 w-full h-14 bg-slate-900 text-gray-200 rounded-sm focus:outline-none focus:ring-2 ring-red-900 shadow-lg' {...register('name')} />

          {errors.message && <span className='text-yellow-800'>{errors.name?.message}</span>}
        </div>

        <div className='relative'>
          <BiMailSend className="absolute top-6 left-2 text-red-900" />
          <input maxLength={38} type="email" placeholder='email' className='p-8 w-full h-14 bg-slate-900 text-gray-200 rounded-sm focus:outline-none focus:ring-2 ring-red-900 shadow-lg' {...register('email')} />
          {errors.message && <span className='text-yellow-800'>{errors.email?.message}</span>}
        </div>

        <div className='relative'>
          <TbMessage className="absolute top-9 left-2 text-red-900" />
          <textarea maxLength={350} placeholder='Deixe sua mensagem' className='resize-none text-gray-200 p-8 w-full min-h-80 max-h-80 bg-slate-900 rounded-sm focus:outline-none focus:ring-2 ring-red-900 shadow-lg' {...register('message')} />
          {errors.message && <span className='text-yellow-800'>{errors.message?.message}</span>}
        </div>

      </div>

      <button type='submit' className='flex items-center justify-center gap-1 ml-auto p-2 h-14 w-24 font-medium rounded-sm border-1 border-red-950 bg-slate-900 text-slate-400 hover:text-white' disabled={isSubmitting}>
        Enviar
        <IoMdSend />
      </button>
    </form>
  )
}

export default ContactForm;
