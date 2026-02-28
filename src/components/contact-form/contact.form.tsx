'use client'
import { ContactFormSchema, TContactForm } from '@/schemas/contact_form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { IoMdSend } from "react-icons/io";
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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full'>

      {/* Name */}
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='name' className='text-xs font-medium uppercase tracking-wider text-white'>Nome</label>
        <input
          id='name'
          maxLength={38}
          type="text"
          placeholder='Seu nome'
          className='w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-sm text-gray-200 placeholder-gray-200 outline-none transition-all focus:border-red-800/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-red-900/40'
          {...register('name')}
        />
        {errors.name && <span className='text-xs text-red-400'>{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='email' className='text-xs font-medium uppercase tracking-wider text-white'>Email</label>
        <input
          id='email'
          maxLength={38}
          type="email"
          placeholder='seu@email.com'
          className='w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-sm text-gray-200 placeholder-gray-200 outline-none transition-all focus:border-red-800/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-red-900/40'
          {...register('email')}
        />
        {errors.email && <span className='text-xs text-red-400'>{errors.email.message}</span>}
      </div>

      {/* Message */}
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='message' className='text-xs font-medium uppercase tracking-wider text-white'>Mensagem</label>
        <textarea
          id='message'
          maxLength={350}
          placeholder='Escreva sua mensagem aqui...'
          className='w-full resize-none rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-sm leading-relaxed text-gray-200 placeholder-gray-200 outline-none transition-all focus:border-red-800/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-red-900/40 min-h-[180px]'
          {...register('message')}
        />
        {errors.message && <span className='text-xs text-red-400'>{errors.message.message}</span>}
      </div>

      {/* Submit */}
      <button
        type='submit'
        disabled={isSubmitting}
        className='group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-red-900 to-red-800 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:from-red-800 hover:to-red-700 hover:shadow-lg hover:shadow-red-900/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            Enviar mensagem
            <IoMdSend className='text-base transition-transform group-hover:translate-x-0.5' />
          </>
        )}
      </button>
    </form>
  )
}

export default ContactForm;
