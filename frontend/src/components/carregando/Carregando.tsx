import { cn } from "@/lib/utils"

export const Carregando = () => (
  <div className="flex items-center justify-center h-[100%]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60" 
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin text-black")}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  </div>
)