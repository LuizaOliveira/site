import Image from "next/image";
import Link from "next/link";
import imag from "../../../public/bg-test.svg";

interface ArticleCardProps {
  articleId: number;
  articleImg: string;
  articleTitle: string;
}

export function ArticleCard({ articleId, articleImg, articleTitle }: ArticleCardProps) {
  return (
    <Link
      href={`/artigos/${articleId}`}
      className="bg-white rounded-lg shadow-md border ml-3 border-gray-200 shrink-0 w-65 hover:scale-105 transition-transform duration-300 block"
    >
      <Image
        src={articleImg}
        alt="Imagem do artigo"
        content="cover"
        width={400}
        height={250}
        className="object-cover rounded-lg"
      />
      <div className="p-4">
        <h4 className="text-md text-primary font-bold overflow-clip truncate">{articleTitle}</h4>
      </div>
    </Link>
  );
}