'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { TypingText } from '@/app/nossa-historia/page';
import { Header } from '@/app/components/layout/Header';
import { InteractiveMap } from '@/app/components/InteractiveMap';

export default function EstadoPage() {
    const params = useParams();
    const sigla = (params.sigla as string)?.toUpperCase() || '';
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const estadosInfo = {
        RN: {
            nome: 'Rio Grande do Norte',
            nomeFormatado: 'Rio Grande',
            nomeFormatado2: 'Do Norte',
            subtitulo: 'Público e atuação no estado',
            descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ',
            municipios: 167,
            telefone: '(84) 3333-2378',
            duvidas: [
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores e proteção legal...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores e proteção legal...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores e proteção legal...' },
            ]
        },
        SP: {
            nome: 'São Paulo',
            nomeFormatado: 'São',
            nomeFormatado2: 'Paulo',
            subtitulo: 'Público e atuação no estado',
            descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ',
            municipios: 255,
            telefone: '(11) 9999-9999',
            duvidas: [
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
            ]
        },
        RJ: {
            nome: 'Rio de Janeiro',
            nomeFormatado: 'Rio de',
            nomeFormatado2: 'Janeiro',
            subtitulo: 'Público e atuação no estado',
            descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ',
            municipios: 92,
            telefone: '(21) 9999-9999',
            duvidas: [
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
            ]
        },
        MA: {
            nome: 'Maranhão',
            nomeFormatado: 'Maranhão',
            nomeFormatado2: '',
            subtitulo: 'Público e atuação no estado',
            descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ',
            municipios: 217,
            telefone: '(98) 9999-9999',
            duvidas: [
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
            ]
        },
        PI: {
            nome: 'Piauí',
            nomeFormatado: 'Piauí',
            nomeFormatado2: '',
            subtitulo: 'Público e atuação no estado',
            descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ',
            municipios: 224,
            telefone: '(86) 9999-9999',
            duvidas: [
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
            ]
        },
        PB: {
            nome: 'Paraíba',
            nomeFormatado: 'Para',
            nomeFormatado2: 'iba',
            subtitulo: 'Público e atuação no estado',
            descricao: 'Atuação jurídica especializada na Paraíba...',
            municipios: 223,
            telefone: '(83) 9999-9999',
            duvidas: [
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
                { titulo: 'Direito do professor', conteudo: 'Informações sobre direitos dos professores...' },
            ]
        }
    };

    const info = estadosInfo[sigla as keyof typeof estadosInfo];

    if (!info) {
        return (
            <div className="min-h-screen bg-white px-4 md:px-12 py-10">
                <div className="container mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mb-6">
                        <Icon icon="mdi:arrow-left" className="w-4 h-4" />
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Estado não encontrado</h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="px-4 md:px-8 py-4">
                <div className="container mx-auto">
                    <div className="inline-block border border-[#E0E7FF] px-3 py-1 rounded-full">
                        <span className="text-sm text-gray-600">Estados De Atuação</span>
                    </div>
                </div>
            </div>

            {/* Header Section */}
            <section className="px-4 md:px-12 py-10 md:py-16">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Left Content */}
                        <div>
                            <h3 className="text-xl md:text-3xl  mb-2 font-cabinet">
                                <span className="text-gray-800">{info.nomeFormatado}</span>
                                {info.nomeFormatado2 && (
                                <span className="text-[#E86000] ml-2">{info?.nomeFormatado2}</span>)}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base mb-6">{info.subtitulo}</p>

                            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-8 text-justify">
                                {info.descricao}
                            </p>

                            <button className="inline-flex items-center gap-2 bg-[#E86000] text-white px-6 py-3 rounded-full font-medium hover:bg-[#d35000] transition-colors">
                                Falar conosco
                                <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Right - Map Card */}
                        <div className="flex items-center justify-center">
                            <div className="w-full max-w-lg bg-[#efefef] rounded-xl p-6 lg:p-8">

                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    {/* <div>
                                        <p className="text-gray-800 text-sm font-medium mb-2">Municípios Onde</p>
                                        <div className="inline-block bg-[#E86000] text-white text-xs font-bold px-3 py-1 rounded-md">
                                            Estamos Presentes
                                        </div>
                                    </div> */}
                                    <div>
                                        <h2 className="text-lg lg:text-xl  text-[#0d2340] font-normal">
                                            Municípios Onde
                                        </h2>

                                        <TypingText text="Estamos Presentes" size="text-lg lg:text-md" />
                                    </div>

                                    {/* Phone Icon */}
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#0d2340] rounded-full flex items-center justify-center shrink-0">
                                        <Icon icon="mdi:phone" className="text-[#E86000] w-5 h-5 lg:w-6 lg:h-6" />
                                    </div>
                                </div>

                                {/* Map Container */}
                                <div className="w-full bg-white rounded-lg mb-6 flex flex-col items-start justify-start border border-gray-200 p-3">
                                    <div className="border border-[#E0E7FF] px-3 py-1 rounded-full mb-3">
                                        <span className="text-xs text-gray-600">{info.nome}</span>
                                    </div>
                                    <div className="w-full h-auto flex items-center justify-center">
                                        <InteractiveMap mapName={`mapa-${sigla.toLowerCase()}`} />
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="mb-6">
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Presente Nós {info.municipios} Municípios Do Estado Do {info.nome}
                                    </p>
                                </div>

                                {/* Phone Badge */}
                                <div className="flex items-center justify-center gap-2 bg-[#E86000] text-white px-4 py-2 rounded-lg w-fit">
                                    <Icon icon="mdi:whatsapp" className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{info.telefone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-4 md:px-12 py-16 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Principais Dúvidas acerca de direitos nesse estado</h2>

                    <div className="space-y-3 max-w-3xl">
                        {info.duvidas.map((duvida, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                <button
                                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-left font-medium text-gray-800">{duvida.titulo}</span>
                                    <Icon
                                        icon={openAccordion === index ? "mdi:chevron-up" : "mdi:plus"}
                                        className="w-5 h-5 text-gray-600 shrink-0"
                                    />
                                </button>

                                {openAccordion === index && (
                                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-gray-700 text-sm">
                                        {duvida.conteudo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Link */}
            <div className="px-4 md:px-12 py-10">
                <div className="container mx-auto">
                    <Link href="/#nossa-equipe" className="inline-flex items-center gap-2 text-gray-700 hover:text-[#E86000] transition-colors font-medium">
                        <Icon icon="mdi:arrow-left" className="w-4 h-4" />
                        Voltar para a equipe
                    </Link>
                </div>
            </div>
            </div>
        </>
    );
}
