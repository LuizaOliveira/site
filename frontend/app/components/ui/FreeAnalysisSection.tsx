'use client'

import { FormEvent, useMemo, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'

const ISSUE_OPTIONS = [
  'Progressão de Letras',
  'Progressão de nível (Titulação)',
  'Retificação de Titulação',
  'Licença Prêmio',
  'Demora para concessão de aposentadoria',
  'Retificação de Letra',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\(\d{2}\)\s\d{5}-\d{4}$/

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (!digits) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function FreeAnalysisSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [professionalType, setProfessionalType] = useState('')
  const [issues, setIssues] = useState<string[]>([])
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; professionalType?: string }>({})

  const whatsappNumber = useMemo(
    () => (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584997007924').replace(/\D/g, ''),
    []
  )

  function toggleIssue(issue: string) {
    setIssues((prev) =>
      prev.includes(issue) ? prev.filter((item) => item !== issue) : [...prev, issue]
    )
  }

  function validateForm() {
    const nextErrors: { name?: string; email?: string; phone?: string; professionalType?: string } = {}

    if (name.trim().length < 3) {
      nextErrors.name = 'Informe um nome valido (minimo 3 caracteres).'
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Informe um email valido.'
    }

    if (!PHONE_REGEX.test(phone.trim())) {
      nextErrors.phone = 'Telefone deve estar no formato (00) 90000-0000.'
    }

    if (!professionalType) {
      nextErrors.professionalType = 'Selecione o tipo de profissional.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm()) return

    const selectedIssues = issues.length ? issues.join(', ') : 'Nao informado'

    const message = [
      `Olá!! Me chamo ${name.trim()}, sou ${professionalType} e gostaria de solicitar uma análise gratuita do meu caso. Os assuntos que desejo verificar são:`,
      // '',
      // `Nome: ${name.trim()}`,
      // `Email: ${email.trim()}`,
      // `Telefone: ${phone.trim()}`,
      // `Tipo de profissional: ${professionalType}`,
      `Assuntos: ${selectedIssues}`,
    ].join('\n')

    if (!/^\d{12,13}$/.test(whatsappNumber)) {
      alert('Configure NEXT_PUBLIC_WHATSAPP_NUMBER com codigo do pais + DDD + numero.')
      return
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const baseInputClass =
    'w-full rounded-lg border border-gray-200 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200'

  return (
    <section className="w-full px-0 lg:px-4">
      {/* MOBILE LAYOUT */}
      <div className="lg:hidden px-0">
        {/* Container com espaço para sobreposição */}
        <div className="relative pt-0 pb-24 px-1">
          {/* IMAGEM */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="/group.svg"
              alt="Consultoria"
              className="object-cover w-full h-72 md:h-96 lg:h-64 shadow-lg"
            />
          </div>

          {/* CARD BRANCO SOBREPOSTO */}
          <div className="relative -mt-16 bg-white rounded-3xl p-6 shadow-lg border border-gray-200 z-10 overflow-hidden">
            
            {/* Badge */}
            <span className="inline-block text-xs px-4 py-1 rounded-full border border-orange-400 text-orange-500 mb-4">
              Fale conosco
            </span>

          {/* Título */}
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Tenha uma análise gratuita
          </h2>

          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Preencha os dados e marque o que precisa e receba uma análise
            gratuita do seu caso.
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>

            {/* Nome e Email */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Seu nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={`${baseInputClass} px-4 py-2.5 text-sm`}
                  placeholder="Seu nome"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`${baseInputClass} px-4 py-2.5 text-sm`}
                  placeholder="seuemail@dominio.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Telefone e Tipo Profissional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="min-w-0">
                <label className="text-sm font-medium text-gray-700 block mb-2">Telefone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(formatPhone(event.target.value))}
                  className={`${baseInputClass} px-3 py-2.5 text-sm`}
                  placeholder="(00) 90000-0000"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div className="min-w-0">
                <label className="text-sm font-medium text-gray-700 block mb-2">Tipo de profissional</label>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <label className="flex items-center gap-1.5 text-xs text-black whitespace-nowrap">
                    <input
                      type="radio"
                      name="tipo"
                      value="Professor(a)"
                      checked={professionalType === 'Professor(a)'}
                      onChange={(event) => setProfessionalType(event.target.value)}
                      className="accent-secondary"
                    />
                    Professor
                  </label>

                  <label className="flex items-center gap-1.5 text-xs text-black whitespace-nowrap">
                    <input
                      type="radio"
                      name="tipo"
                      value="Servidor(a)"
                      checked={professionalType === 'Servidor(a)'}
                      onChange={(event) => setProfessionalType(event.target.value)}
                      className="accent-secondary"
                    />
                    Servidor
                  </label>
                </div>
                {errors.professionalType && (
                  <p className="text-xs text-red-600 mt-1">{errors.professionalType}</p>
                )}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2.5 pt-2">
              {ISSUE_OPTIONS.map((issue) => (
                <label key={`mobile-${issue}`} className="flex items-center gap-2.5 text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={issues.includes(issue)}
                    onChange={() => toggleIssue(issue)}
                    className="accent-secondary"
                  />
                  <span>{issue}</span>
                </label>
              ))}
            </div>

            {/* Botão */}
            <div className="pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold px-6 py-3 rounded-full shadow-md w-full justify-center text-sm"
              >
                <Icon icon="mdi:whatsapp" width={18} />
                Enviar
              </button>
            </div>

          </form>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block max-w-7xl mx-auto bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="grid grid-cols-2 items-stretch">
          {/* CONTEÚDO ESQUERDA */}
          <div className="p-12">
            {/* Badge */}
            <span className="inline-block text-xs px-4 py-1 rounded-full border border-orange-400 text-orange-500 mb-6">
              Fale conosco
            </span>

            {/* Título */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tenha uma análise gratuita
            </h2>

            <p className="text-gray-600 mb-8 text-md">
              Preencha os dados e marque o que precisa e receba uma análise
              gratuita do seu caso.
            </p>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>

              {/* Linha 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Seu nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={`${baseInputClass} px-4 py-3`}
                    placeholder="Seu nome"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={`${baseInputClass} px-4 py-3`}
                    placeholder="seuemail@dominio.com"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Linha 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Telefone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(formatPhone(event.target.value))}
                    className={`${baseInputClass} px-4 py-3`}
                    placeholder="(00) 90000-0000"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Tipo de profissional
                  </label>
                  <div className="flex items-center gap-6 mt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="tipo"
                        value="Professor"
                        checked={professionalType === 'Professor'}
                        onChange={(event) => setProfessionalType(event.target.value)}
                        className="accent-black"
                      />
                      Professor
                    </label>

                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="tipo"
                        value="Servidor"
                        checked={professionalType === 'Servidor'}
                        onChange={(event) => setProfessionalType(event.target.value)}
                        className="accent-black"
                      />
                      Servidor
                    </label>
                  </div>
                  {errors.professionalType && (
                    <p className="text-xs text-red-600 mt-1">{errors.professionalType}</p>
                  )}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-8 pt-4">
                {ISSUE_OPTIONS.map((item) => (
                  <label
                    key={`desktop-${item}`}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={issues.includes(item)}
                      onChange={() => toggleIssue(item)}
                      className="mt-1 accent-secondary"
                    />
                    {item}
                  </label>
                ))}
              </div>

              {/* Botão */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold px-8 py-3 rounded-full shadow-md"
                >
                  <Icon icon="mdi:whatsapp" width={20} />
                  Enviar
                </button>
              </div>

            </form>
          </div>

          {/* IMAGEM DIREITA */}
          <div className="relative h-full min-h-96">
            <Image
              src="/group.svg"
              alt="Consultoria"
              fill
              className="object-cover rounded-r-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}