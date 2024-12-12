import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#192c64] text-white py-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Institucional */}
        <div>
          <h3 className="font-bold text-lg mb-4">INSTITUCIONAL</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://www.mileniolimoeiro.com.br/institucional/colegio" className="hover:underline">Colégio</a>
            </li>
            <li>
              <a href="https://www.mileniolimoeiro.com.br/#blog" className="hover:underline">Blog</a>
            </li>
            <li>
              <a href="https://www.mileniolimoeiro.com.br/institucional/a-cooperativa" className="hover:underline">Cooperativa 3º Milênio</a>
            </li>
            <li>
              <a href="https://www.mileniolimoeiro.com.br/institucional/historia-limoeiro" className="hover:underline">História de Limoeiro</a>
            </li>
            <li>
              <a href="https://www.mileniolimoeiro.com.br/#contato" className="hover:underline">Contato</a>
            </li>
          </ul>
        </div>

        {/* Ensino */}
        <div>
          <h3 className="font-bold text-lg mb-4">ENSINO</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://www.mileniolimoeiro.com.br/ensino/educacao-infantil" className="hover:underline">Educação Infantil</a>
            </li>
            <li>
              <a href="https://www.mileniolimoeiro.com.br/ensino/ensino-fundamental-i" className="hover:underline">Ensino Fundamental (Anos Iniciais)</a>
            </li>
            <li>
              <a href="https://www.mileniolimoeiro.com.br/ensino/ensino-fundamental-ii" className="hover:underline">Ensino Fundamental (Anos Finais)</a>
            </li>
            <li>
              <a href="https://www.mileniolimoeiro.com.br/ensino/ensino-medio" className="hover:underline">Ensino Médio</a>
            </li>
            <li>
              <a href="https://www.mileniolimoeiro.com.br/ensino/turmas-especiais" className="hover:underline">Turmas Especiais</a>
            </li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg mb-4">REDES SOCIAIS</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://www.facebook.com/colegio3milenio" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/colegio3milenio" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://www.youtube.com/MilenioLimoeiro" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-4">
            <Image src="/logo-horizontal.png" alt="Logo Colégio 3º Milênio" width={200} height={100} />
          </div>
        </div>
      </div>
    </footer>
  );
}
