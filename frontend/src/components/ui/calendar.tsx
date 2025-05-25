import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-white text-white", className)} // fundo branco e texto preto
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-gray-900", // texto escuro para título
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-white p-0 opacity-70 hover:opacity-100 border border-gray-300"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1 border border-gray-300 rounded-md",
        head_row: "flex",
        head_cell:
          "text-gray-600 rounded-md w-8 font-normal text-[0.8rem]", // cabeçalho mais claro
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-white [&:has([aria-selected].day-outside)]:bg-white [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-gray-900"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-white text-black hover:bg-white focus:bg-white focus:text-white hover:border hover:border-black border-black",
        day_today: "bg-white text-black hover:bg-white focus:bg-white focus:text-white hover:border hover:border-black border-black",
        day_outside:
          "day-outside text-gray-400 aria-selected:bg-white aria-selected:text-gray-400 bg-white text-black hover:bg-white focus:bg-white focus:text-white hover:border hover:border-black border-black",
        day_disabled: "text-gray-300 opacity-50",
        day_range_middle:
          "aria-selected:bg-white aria-selected:text-black",
        day_hidden: "bg-white",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4 text-gray-900", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4 text-gray-900", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
