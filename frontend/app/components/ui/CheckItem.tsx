import { Icon } from "@iconify/react";

interface CheckItensProps {
    children?: React.ReactNode;
    title: string;

}

export function CheckItem({ title }: CheckItensProps) {
    return (
        <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-5 h-5 bg-secondary rounded-full justify-center flex items-center shrink-0"><Icon icon="ic:round-check" className='h-4 text-white' /></div>
            <span className="text-ligth-gray text-sm sm:text-base">{title}</span>
        </div>
    )
}
